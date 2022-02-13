import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';

import { Events } from '../components/Events';

export type Response = Record<string, Record<string, string | number>>;

export function Timeline() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Text onPress={() => auth().signOut()}>Logout</Text>
            ),
        });
    }, [navigation]);

    return (
        <View style={{ marginLeft: 4, marginRight: 12 }}>
            <Events />
        </View>
    );
}
