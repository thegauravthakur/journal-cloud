import React from 'react';
import { Dimensions, View } from 'react-native';
import Image from 'react-native-scalable-image';

interface ChosenImagesProps {
    images: string;
}
export function ChosenImages({ images }: ChosenImagesProps) {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                width={Dimensions.get('window').width - 40}
                style={{ borderRadius: 15, marginTop: 10 }}
                source={{ uri: images }}
            />
        </View>
    );
}
