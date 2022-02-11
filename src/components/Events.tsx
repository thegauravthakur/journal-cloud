import firestore from '@react-native-firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';

import { Response } from '../views/Timeline';
import { EventItem } from './EventItem';
import { EventsSkeleton } from './EventsSkeleton';

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
    const sortedKeys = Object.keys(events).sort(
        (key1: string, key2: string) =>
            (events[key2].createdAt as number) -
            (events[key1].createdAt as number)
    );

    return (
        <View>
            {!isLoading ? (
                sortedKeys.map((id, index) => (
                    <EventItem
                        key={id}
                        isLastItem={Object.keys(events).length === index + 1}
                        title={events[id].title as string}
                        description={events[id].description as string}
                        setEvents={setEvents}
                        id={id}
                        createdAt={events[id].createdAt as number}
                    />
                ))
            ) : (
                <EventsSkeleton />
            )}
        </View>
    );
}
