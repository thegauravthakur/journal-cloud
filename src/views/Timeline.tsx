import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { StackParams } from '../../App';
import { Events } from '../components/Events';

export interface EventType {
    createdAt: number;
    description: string;
    image: string | null;
    title: string;
}

export type Response = Record<string, EventType>;

export function Timeline() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    useEffect(() => {
        ReceiveSharingIntent.getReceivedFiles(
            (files: any) => {
                const { contentUri } = files[0];
                const eventData: EventType = {
                    image: contentUri,
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
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => auth().signOut()}>
                    <Image
                        source={{ uri: auth().currentUser?.photoURL ?? '' }}
                        style={{ height: 32, width: 32, borderRadius: 100 }}
                    />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <Ripple style={{ padding: 2 }} rippleCentered>
                    <MaterialIcon name={'menu'} size={26} />
                </Ripple>
            ),
        });
    }, [navigation]);

    return (
        <View style={{ marginLeft: 4, marginRight: 12 }}>
            <Events />
        </View>
    );
}
