import CameraRoll, {
    PhotoIdentifier,
} from '@react-native-community/cameraroll';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
    Image,
    PermissionsAndroid,
    ScrollView,
    TouchableHighlight,
    View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

interface QuickImagePickerProps {
    setImage: Dispatch<SetStateAction<string | null>>;
}
export function QuickImagePicker({ setImage }: QuickImagePickerProps) {
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);

    useEffect(() => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ).then((granted) => {
            if (granted) {
                CameraRoll.getPhotos({
                    first: 20,
                    assetType: 'Photos',
                }).then((data) => {
                    setPhotos(data.edges);
                });
            }
        });
    }, []);

    return (
        <View>
            <ScrollView horizontal={true}>
                {photos.map((p, i) => (
                    <TouchableHighlight
                        key={p.node.image.uri}
                        style={{
                            width: 100,
                            height: 100,
                            margin: 5,
                            borderRadius: 10,
                        }}
                        onPress={async () => {
                            const editedImage = await ImagePicker.openCropper({
                                path: p.node.image.uri,
                                mediaType: 'photo',
                                freeStyleCropEnabled: true,
                                compressImageQuality: 0.8,
                            });
                            setImage(editedImage.path);
                        }}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                            }}
                            key={i}
                            source={{ uri: p.node.image.uri }}
                        />
                    </TouchableHighlight>
                ))}
            </ScrollView>
        </View>
    );
}
