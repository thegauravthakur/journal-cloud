import auth from '@react-native-firebase/auth';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { ToastAndroid, View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { ProfileOptionsModalItem } from './ProfileOptionsModalItem';

interface ProfileOptionsModalProps {
    showProfileModal: boolean;
    setShowProfileModal: Dispatch<SetStateAction<boolean>>;
}

export function showToastMessage(message: string) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}

export function ProfileOptionsModal({
    showProfileModal,
    setShowProfileModal,
}: ProfileOptionsModalProps) {
    const closeModal = () => {
        setShowProfileModal(false);
    };
    return (
        <Modal
            isVisible={showProfileModal}
            onBackButtonPress={closeModal}
            onBackdropPress={closeModal}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    paddingVertical: 10,
                }}
            >
                <ProfileOptionsModalItem
                    onPress={async () => {
                        await auth().signOut();
                        showToastMessage('Logged out successfully!');
                    }}
                    Icon={() => (
                        <MaterialIcon
                            name={'logout'}
                            size={25}
                            style={{ marginRight: 10 }}
                        />
                    )}
                    text={'Logout'}
                />
                <ProfileOptionsModalItem
                    onPress={async () => {
                        await ImageCropPicker.clean();
                        showToastMessage('Storage Cleared');
                    }}
                    Icon={() => (
                        <FontAwesome5Icon
                            name={'broom'}
                            size={18}
                            style={{ marginRight: 10 }}
                        />
                    )}
                    text={'Free space'}
                />
            </View>
        </Modal>
    );
}
