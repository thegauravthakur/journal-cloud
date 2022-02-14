import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useLayoutEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { Events } from '../components/Events';

export interface EventType {
    createdAt: number;
    description: string;
    image: string | null;
    title: string;
}

export type Response = Record<string, EventType>;

export function Timeline() {
    const navigation = useNavigation();

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
