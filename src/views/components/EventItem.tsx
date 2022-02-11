import firestore from '@react-native-firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { Text } from 'react-native';

import { EventItemWrapper } from './EventItemWrapper';

interface EventItemProps {
    title: string;
    description: string;
    setEvents: Dispatch<SetStateAction<Response>>;
}
type Response = Record<string, Record<string, string>>;
export function EventItem({ description, title, setEvents }: EventItemProps) {
    const onEventItemClick = async () => {
        const date = Date.now();
        const value = { title: 'simbha', description: 'thakur' };

        await firestore()
            .collection('user')
            .doc('10-02-2022')
            .update({ [date]: value });

        setEvents((events) => {
            const copy = { ...events };
            copy[date.toString()] = value;
            return copy;
        });
    };

    return (
        <EventItemWrapper onClick={onEventItemClick}>
            <Text>{title}</Text>
            <Text>{description}</Text>
        </EventItemWrapper>
    );
}
