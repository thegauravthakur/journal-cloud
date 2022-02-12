import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import TimeAgo from 'javascript-time-ago';
import * as React from 'react';
import { Image, Text, View } from 'react-native';

import { CustomTheme } from '../../App';
import { EventItemWrapper } from './EventItemWrapper';

interface EventItemProps {
    title: string;
    description: string;
    createdAt: number;
    isLastItem: boolean;
    id: string;
    image: string;
}

export function EventItem({
    description,
    title,
    createdAt,
    isLastItem,
    id,
    image,
}: EventItemProps) {
    const theme = useTheme() as Theme & { colors: CustomTheme };
    const timeAgo = new TimeAgo('en-in');
    const navigation = useNavigation<any>();
    const onEventItemClick = async () => {
        navigation.navigate('Advanced Event', {
            description,
            title,
            createdAt,
            id,
            storedImage: image,
        });
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
