import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import TimeAgo from 'javascript-time-ago';
import * as React from 'react';
import { Image, Text, View } from 'react-native';

import { CustomTheme } from '../../App';
import { EventType } from '../views/Timeline';
import { EventItemWrapper } from './EventItemWrapper';

interface EventItemProps {
    eventData: EventType;
    isLastItem: boolean;
    id: string;
}

export function EventItem({ isLastItem, id, eventData }: EventItemProps) {
    const theme = useTheme() as Theme & { colors: CustomTheme };
    const { title, description, image, createdAt } = eventData;
    const timeAgo = new TimeAgo('en-in');
    const navigation = useNavigation<any>();
    const onEventItemClick = async () => {
        navigation.navigate('Advanced Event', { id, eventData });
    };

    return (
        <EventItemWrapper
            iconName='edit'
            showBorderLine={!isLastItem}
            onClick={onEventItemClick}
        >
            <View style={{ marginBottom: 10 }}>
                {title.length > 0 && (
                    <Text
                        style={{
                            fontWeight: '700',
                            fontSize: 18,
                            color: theme.colors.eventTitle,
                        }}
                    >
                        {title}
                    </Text>
                )}
                {description.length > 0 && (
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
                )}
            </View>
            {(image ?? '').length > 0 && (
                <Image
                    source={{
                        uri: image,
                    }}
                    resizeMode='cover'
                    style={{
                        height: 180,
                        borderRadius: 15,
                        marginBottom: 10,
                    }}
                />
            )}
            <Text style={{ fontSize: 14 }}>{timeAgo.format(createdAt)}</Text>
        </EventItemWrapper>
    );
}
