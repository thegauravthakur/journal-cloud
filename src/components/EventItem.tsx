import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { Text, View } from 'react-native';

import { Response } from '../views/Timeline';
import { EventItemWrapper } from './EventItemWrapper';

interface EventItemProps {
    title: string;
    description: string;
    setEvents: Dispatch<SetStateAction<Response>>;
    createdAt: number;
    isLastItem: boolean;
}

export function EventItem({
    description,
    title,
    createdAt,
    isLastItem,
}: EventItemProps) {
    const timeAgo = new TimeAgo('en-in');
    const onEventItemClick = async () => {};

    return (
        <EventItemWrapper
            showBorderLine={!isLastItem}
            onClick={onEventItemClick}
        >
            <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: '700' }}>{title}</Text>
                <Text>{description}</Text>
            </View>
            <Text>{timeAgo.format(createdAt)}</Text>
        </EventItemWrapper>
    );
}
