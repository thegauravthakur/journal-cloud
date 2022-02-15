import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ripple from 'react-native-material-ripple';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StackParams } from '../../App';
import { Events } from '../components/Events';
import { ProfileOptionsModal } from '../components/ProfileOptionsModal';

export interface EventType {
    createdAt: number;
    description: string;
    image: string | null;
    title: string;
}

export type Response = Record<string, EventType>;

export function Timeline() {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    useEffect(() => {
        ReceiveSharingIntent.getReceivedFiles(
            async (files: any) => {
                const { contentUri } = files[0];
                const { path } = await ImagePicker.openCropper({
                    path: contentUri,
                    mediaType: 'photo',
                    freeStyleCropEnabled: true,
                    compressImageQuality: 0.8,
                });
                const eventData: EventType = {
                    image: path,
                    createdAt: Date.now(),
                    title: '',
                    description: '',
                };
                navigation.navigate('AdvancedEvent', { eventData });
            },
            () => {},
            'EverydayJournal'
        );
        return () => {
            ReceiveSharingIntent.clearReceivedFiles();
        };
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ripple
                        rippleCentered
                        rippleContainerBorderRadius={100}
                        style={{ padding: 10, marginRight: 5 }}
                        onPress={() => {
                            setShowCalendarModal(true);
                        }}
                    >
                        <AntDesign
                            style={{ alignSelf: 'center' }}
                            name={'calendar'}
                            size={27}
                        />
                    </Ripple>
                    <TouchableOpacity onPress={() => setShowProfileModal(true)}>
                        <Image
                            source={{ uri: auth().currentUser?.photoURL ?? '' }}
                            style={{ height: 32, width: 32, borderRadius: 100 }}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View style={{ marginLeft: 4, marginRight: 12 }}>
            <Events
                showModal={showCalendarModal}
                setShowModal={setShowCalendarModal}
            />
            <ProfileOptionsModal
                setShowProfileModal={setShowProfileModal}
                showProfileModal={showProfileModal}
            />
        </View>
    );
}
