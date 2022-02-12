import * as React from 'react';
import { View } from 'react-native';

import { Events } from '../components/Events';

export type Response = Record<string, Record<string, string | number>>;

export function Timeline() {
    return (
        <View style={{ marginLeft: 4, marginRight: 12 }}>
            <Events />
        </View>
    );
}
