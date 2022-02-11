import firestore from '@react-native-firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';

import { Response } from '../views/Timeline';
import { EventItem } from './EventItem';

interface EventsProps {
    events: Response;
    setEvents: Dispatch<SetStateAction<Response>>;
}

export function Events({ events, setEvents }: EventsProps) {
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
            {Object.keys(events).map((id, index) => (
                <EventItem
                    key={id}
                    isLastItem={Object.keys(events).length === index + 1}
                    title={events[id].title as string}
                    description={events[id].description as string}
                    setEvents={setEvents}
                    createdAt={events[id].createdAt as number}
                />
            ))}
        </View>
    );
}
