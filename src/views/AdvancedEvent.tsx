import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Bar as ProgressBar } from 'react-native-progress';

import { DateContext, queryClient } from '../../App';
import { AdvancedEventFooter } from '../components/AdvancedEventFooter';
import { ChosenImages } from '../components/ChosenImages';
import { Response } from './Timeline';

export function AdvancedEvent() {
    const route = useRoute();
    const { currentUser } = auth();
    const { currentDate } = useContext(DateContext);
    const navigation = useNavigation<any>();
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const { title, description, id, createdAt, storedImage } =
        route.params as any;
    const [image, setImage] = useState<string>(storedImage);
    const [progress, setProgress] = useState<number>(-1);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ripple
                    style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    // todo update this function
                    onPress={async () => {
                        if (image != null && currentUser) {
                            const extension = image.split('.').pop();
                            const reference = storage().ref(
                                `${currentUser.uid}/${currentDate}/${id}black-t-shirt-sm.${extension}`
                            );
                            const target = reference.putFile(image);
                            target.on(
                                'state_changed',
                                (snapshot) => {
                                    const progressPercentage =
                                        snapshot.bytesTransferred /
                                        snapshot.totalBytes;
                                    setProgress(progressPercentage);
                                },
                                () => {
                                    navigation.goBack();
                                },
                                async () => {
                                    const url =
                                        await target.snapshot?.ref.getDownloadURL();
                                    const updatedEvent = {
                                        id,
                                        createdAt,
                                        title: newTitle || title,
                                        description:
                                            newDescription || description,
                                        image: url ?? '',
                                    };
                                    queryClient.setQueryData(
                                        'fetchEvents',
                                        (_events) => {
                                            const copy = {
                                                ...(_events as Response),
                                            };
                                            copy[id] = updatedEvent;
                                            return copy;
                                        }
                                    );
                                    await firestore()
                                        .collection(currentUser.uid)
                                        .doc(currentDate)
                                        .update({ [id]: updatedEvent });
                                    navigation.goBack();
                                }
                            );
                        } else {
                            const updatedEvent = {
                                id,
                                createdAt,
                                title: newTitle || title,
                                description: newDescription || description,
                                image,
                            };
                            queryClient.setQueryData(
                                'fetchEvents',
                                (_events) => {
                                    const copy = { ...(_events as Response) };
                                    copy[id] = updatedEvent;
                                    return copy;
                                }
                            );
                            await firestore()
                                .collection('user')
                                .doc('10-02-2022')
                                .update({ [id]: updatedEvent });
                            navigation.goBack();
                        }
                    }}
                >
                    <Text>save</Text>
                </Ripple>
            ),
        });
    }, [
        createdAt,
        description,
        id,
        image,
        navigation,
        newDescription,
        newTitle,
        title,
    ]);

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
                    onChangeText={(text) => setNewDescription(text)}
                    multiline
                    defaultValue={description}
                    style={{ fontSize: 16, lineHeight: 25 }}
                />
                {image && <ChosenImages images={image} />}
            </ScrollView>
            <AdvancedEventFooter setImage={setImage} />
        </View>
    );
}
