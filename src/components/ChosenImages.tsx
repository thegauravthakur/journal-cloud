import React, { Dispatch, SetStateAction } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Image from 'react-native-scalable-image';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ChosenImagesProps {
    images: string;
    setImage: Dispatch<SetStateAction<string>>;
}
export function ChosenImages({ images, setImage }: ChosenImagesProps) {
    return (
        <View style={{ alignItems: 'center', position: 'relative' }}>
            <TouchableOpacity
                onPress={async () => {
                    const editedImage = await ImagePicker.openCropper({
                        path: images,
                        mediaType: 'photo',
                        freeStyleCropEnabled: true,
                    });
                    setImage(editedImage.path);
                }}
            >
                <Image
                    width={Dimensions.get('window').width - 40}
                    style={{ borderRadius: 15, marginTop: 10 }}
                    source={{ uri: images }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setImage('');
                }}
                style={{
                    backgroundColor: '#111827',
                    padding: 4,
                    borderRadius: 100,
                    right: 30,
                    top: 30,
                    position: 'absolute',
                }}
            >
                <AntDesign name={'close'} size={20} color={'white'} />
            </TouchableOpacity>
        </View>
    );
}
