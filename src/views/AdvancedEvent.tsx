import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, {
    useCallback,
    useContext,
    useLayoutEffect,
    useState,
} from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Bar as ProgressBar } from 'react-native-progress';

import { DateContext, queryClient } from '../../App';
import { AdvancedEventFooter } from '../components/AdvancedEventFooter';
import { ChosenImages } from '../components/ChosenImages';
import { EventType, Response } from './Timeline';

interface Params {
    id: string;
    eventData: EventType;
}

export interface UpdateLocalEventData {
    currentDate: string;
    id: string;
    updatedEvent: EventType;
}
const updateLocalEventData = ({
    currentDate,
    updatedEvent,
    id,
}: UpdateLocalEventData) => {
    queryClient.setQueryData(['fetchEvents', currentDate], (_events) => {
        const copy = {
            ...(_events as Response),
        };
        copy[id] = updatedEvent;
        return copy;
    });
};

export function AdvancedEvent() {
    const route = useRoute();
    const { currentUser } = auth();
    const { currentDate } = useContext(DateContext);
    const navigation = useNavigation<any>();
    const { eventData, id } = route.params as Params;
    const { title, description, image: storedImage } = eventData;
    const [newTitle, setNewTitle] = useState(title ?? '');
    const [newDescription, setNewDescription] = useState(description ?? '');
    const [image, setImage] = useState<string | null>(storedImage);
    const [progress, setProgress] = useState<number>(-1);

    const uploadNewImage = useCallback(
        (file: string) =>
            new Promise<string | null>((resolve) => {
                const ref = storage().ref(
                    `${currentUser!.uid}/${currentDate}/${id}`
                );
                const process = ref.putFile(file);
                process.on(
                    'state_changed',
                    ({ bytesTransferred, totalBytes }) => {
                        const transferProgress = bytesTransferred / totalBytes;
                        setProgress(transferProgress);
                    },
                    () => {
                        resolve(null);
                    },
                    async () => {
                        resolve(ref.getDownloadURL());
                    }
                );
            }),
        [currentDate, currentUser, id]
    );

    const removeImageFromDB = useCallback(
        () =>
            new Promise((resolve) => {
                const ref = storage().ref(
                    `${currentUser!.uid}/${currentDate}/${id}`
                );
                resolve(ref.delete());
            }),
        [currentDate, currentUser, id]
    );
    const updateDocument = useCallback(
        (updatedEvent: EventType) =>
            new Promise((resolve) => {
                resolve(
                    firestore()
                        .collection(currentUser!.uid)
                        .doc(currentDate)
                        .update({ [id]: updatedEvent })
                );
            }),
        [currentDate, currentUser, id]
    );

    const onSubmitClick = useCallback(async () => {
        // on edit click
        const copy = {
            ...eventData,
            title: newTitle,
            description: newDescription,
        };
        if (id) {
            if (!image && storedImage) {
                await removeImageFromDB();
                copy.image = null;
            } else if (
                (image && !storedImage) ||
                (image && storedImage && image !== storedImage)
            ) {
                // user selected a new image
                copy.image = await uploadNewImage(image);
            }
        } else if (image) {
            copy.image = await uploadNewImage(image);
        }
        updateLocalEventData({ updatedEvent: copy, id, currentDate });
        navigation.goBack();
        await updateDocument(copy);
    }, [
        currentDate,
        eventData,
        id,
        image,
        navigation,
        newDescription,
        newTitle,
        removeImageFromDB,
        storedImage,
        updateDocument,
        uploadNewImage,
    ]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ripple
                    style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        flexDirection: 'row',
                    }}
                    onPress={onSubmitClick}
                >
                    <Text>save</Text>
                </Ripple>
            ),
        });
    }, [navigation, onSubmitClick]);

    return (
        <View
            style={{
                marginHorizontal: 10,
                marginTop: 10,
                justifyContent: 'space-between',
                flex: 1,
            }}
        >
            <ScrollView>
                {progress >= 0 && (
                    <ProgressBar
                        indeterminate={progress <= 0}
                        width={null}
                        progress={progress}
                    />
                )}
                <TextInput
                    placeholder='Enter title...'
                    multiline
                    onChangeText={(text) => setNewTitle(text)}
                    defaultValue={title}
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        lineHeight: 25,
                    }}
                />

                <TextInput
                    placeholder='Enter description...'
                    onChangeText={(text) => setNewDescription(text)}
                    multiline
                    defaultValue={description}
                    style={{ fontSize: 16, lineHeight: 25 }}
                />
                {image && <ChosenImages setImage={setImage} images={image} />}
            </ScrollView>
            <AdvancedEventFooter
                hasImage={Boolean(storedImage)}
                id={id}
                setImage={setImage}
            />
        </View>
    );
}
