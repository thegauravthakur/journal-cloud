import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ripple from 'react-native-material-ripple';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface AdvancedEventFooterProps {
    setImage: Dispatch<SetStateAction<string>>;
}
export function AdvancedEventFooter({ setImage }: AdvancedEventFooterProps) {
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
                    style={{ padding: 10, alignSelf: 'flex-start' }}
                    rippleContainerBorderRadius={100}
                >
                    <MaterialIcon name={'camera-alt'} size={25} />
                </Ripple>
                <Ripple
                    style={{ padding: 10, alignSelf: 'flex-start' }}
                    rippleContainerBorderRadius={100}
                    onPress={async () => {
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
                    }}
                >
                    <MaterialIcon name={'photo-library'} size={25} />
                </Ripple>
            </View>
            <Ripple
                style={{ padding: 10, alignSelf: 'center' }}
                rippleContainerBorderRadius={100}
            >
                <MaterialIcon name={'delete'} size={25} />
            </Ripple>
        </View>
    );
}
