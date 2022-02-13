import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import { PermissionsAndroid, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ripple from 'react-native-material-ripple';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { DateContext, queryClient } from '../../App';
import { Response } from '../views/Timeline';

interface AdvancedEventFooterProps {
    setImage: Dispatch<SetStateAction<string | null>>;
    id: string;
    hasImage: boolean;
}

export interface DeleteLocalEventData {
    currentDate: string;
    id: string;
}
const deleteLocalEventData = ({ currentDate, id }: DeleteLocalEventData) => {
    queryClient.setQueryData(['fetchEvents', currentDate], (_events) => {
        const copy = {
            ...(_events as Response),
        };
        delete copy[id];
        return copy;
    });
};

const checkAndAskCameraPermission = () =>
    new Promise((resolve) => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(
            (result) => {
                if (result === PermissionsAndroid.RESULTS.GRANTED) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        );
    });

export function AdvancedEventFooter({
    setImage,
    id,
    hasImage,
}: AdvancedEventFooterProps) {
    const navigation = useNavigation();
    const { currentDate } = useContext(DateContext);
    const { uid } = auth().currentUser!;

    const deleteImage = () =>
        new Promise((resolve) => {
            if (hasImage) {
                const ref = storage().ref(`${uid}/${currentDate}/${id}`);
                resolve(ref.delete());
            } else resolve(true);
        });
    const deleteDocument = () =>
        new Promise((resolve) => {
            resolve(
                firestore()
                    .collection(uid)
                    .doc(currentDate)
                    .update({ [id]: firestore.FieldValue.delete() })
            );
        });

    const onDeleteIconClick = async () => {
        deleteLocalEventData({ currentDate, id });
        navigation.goBack();
        await deleteImage();
        await deleteDocument();
    };
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{
                    borderRightWidth: 1,
                    flex: 1,
                    flexDirection: 'row',
                    marginRight: 10,
                    marginVertical: 10,
                }}
            >
                <Ripple
                    rippleCentered={true}
                    style={{ padding: 10, alignSelf: 'flex-start' }}
                    rippleContainerBorderRadius={100}
                    onPress={async () => {
                        try {
                            const result = await checkAndAskCameraPermission();
                            if (result) {
                                const pickedImage =
                                    await ImagePicker.openCamera({
                                        mediaType: 'photo',
                                        multiple: false,
                                    });
                                const editedImage =
                                    await ImagePicker.openCropper({
                                        path: pickedImage.path,
                                        mediaType: 'photo',
                                        freeStyleCropEnabled: true,
                                        compressImageQuality: 0.8,
                                    });
                                setImage(editedImage.path);
                            }
                        } catch (e) {
                            setImage(null);
                        }
                    }}
                >
                    <MaterialIcon name={'camera-alt'} size={25} />
                </Ripple>
                <Ripple
                    rippleCentered={true}
                    style={{ padding: 10, alignSelf: 'flex-start' }}
                    rippleContainerBorderRadius={100}
                    onPress={async () => {
                        try {
                            const pickedImage = await ImagePicker.openPicker({
                                mediaType: 'photo',
                                multiple: false,
                            });
                            const editedImage = await ImagePicker.openCropper({
                                path: pickedImage.path,
                                mediaType: 'photo',
                                freeStyleCropEnabled: true,
                                compressImageQuality: 0.8,
                            });
                            setImage(editedImage.path);
                        } catch (e) {
                            setImage(null);
                        }
                    }}
                >
                    <MaterialIcon name={'photo-library'} size={25} />
                </Ripple>
            </View>
            <Ripple
                rippleCentered={true}
                style={{ padding: 10, alignSelf: 'center' }}
                rippleContainerBorderRadius={100}
                onPress={onDeleteIconClick}
            >
                <MaterialIcon name={'delete'} size={25} />
            </Ripple>
        </View>
    );
}
