import { Theme, useTheme } from '@react-navigation/native';
import TimeAgo from 'javascript-time-ago';
import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import { Text, View } from 'react-native';

import { CustomTheme } from '../../App';
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
    const theme = useTheme() as Theme & { colors: CustomTheme };
    const timeAgo = new TimeAgo('en-in');
    const onEventItemClick = async () => {};

    return (
        <EventItemWrapper
            iconName='edit'
            showBorderLine={!isLastItem}
            onClick={onEventItemClick}
        >
            <View style={{ marginBottom: 10 }}>
                <Text
                    style={{
                        fontWeight: '700',
                        fontSize: 18,
                        color: theme.colors.eventTitle,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'segoeui',
                        lineHeight: 25,
                        color: theme.colors.eventDescription,
                    }}
                >
                    {description}
                </Text>
            </View>
            <Text style={{ fontSize: 14 }}>{timeAgo.format(createdAt)}</Text>
        </EventItemWrapper>
    );
}
