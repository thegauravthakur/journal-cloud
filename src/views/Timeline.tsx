import { format } from 'date-fns';
import * as React from 'react';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { Events } from '../components/Events';
import { TextInputField } from '../components/TextInputField';

export type Response = Record<string, Record<string, string | number>>;

export function Timeline() {
    const [events, setEvents] = useState<Response>({});

    return (
        <ScrollView
            style={{ marginLeft: 4, marginRight: 12 }}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
        >
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    marginHorizontal: 10,
                    marginVertical: 20,
                }}
            >
                {format(new Date(), 'EEEE do, yyyy')}
            </Text>
            <TextInputField setEvents={setEvents} />
            <Events events={events} setEvents={setEvents} />
        </ScrollView>
    );
}
