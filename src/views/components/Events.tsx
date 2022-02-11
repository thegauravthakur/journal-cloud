import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import * as React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';

import { EventItem } from './EventItem';

type Response = Record<string, Record<string, string>>;
export function Events() {
    const [events, setEvents] = useState<Response>({});
    const { isLoading } = useQuery(
        'fetchEvents',
        async () => {
            const { _data } = (await firestore()
                .collection('user')
                .doc('10-02-2022')
                .get()) as unknown as { _data: Response };
            return _data;
        },
        { onSuccess: setEvents }
    );

    if (isLoading) return <Text>loading...</Text>;

    return (
        <View>
            {Object.keys(events).map((id) => (
                <EventItem
                    key={id}
                    title={events[id].title}
                    description={events[id].description}
                    setEvents={setEvents}
                />
            ))}
        </View>
    );
}
