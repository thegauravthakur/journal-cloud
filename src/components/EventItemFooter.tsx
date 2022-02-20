import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import TimeAgo from 'javascript-time-ago';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { isToday } from 'react-native-calendars/src/dateutils';
import Ripple from 'react-native-material-ripple';
import RNShare from 'react-native-share';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { DateContext, queryClient } from '../../App';
import { EventType, Response } from '../views/Timeline';

interface EventItemFooterProps {
    createdAt: number;
    isLoved: boolean;
    containerRef: any;
    eventData: EventType;
    id: string;
}
export function EventItemFooter({
    containerRef,
    eventData,
    id,
}: EventItemFooterProps) {
    const { createdAt, isLoved } = eventData;
    const timeAgo = new TimeAgo('en-in');
    const { currentUser } = auth();
    const { currentDate } = useContext(DateContext);

    const onHeartIconPress = async () => {
        const value = { ...eventData, isLoved: !isLoved };
        queryClient.setQueryData(['fetchEvents', currentDate], (_events) => {
            const copy = {
                ...(_events as Response),
            };
            copy[id] = value;
            return copy;
        });
        await firestore()
            .collection(currentUser!.uid)
            .doc(currentDate)
            .set({ [id]: value }, { merge: true });
    };
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Text style={{ fontSize: 14 }}>
                {isToday(new Date(createdAt))
                    ? timeAgo.format(createdAt)
                    : format(new Date(createdAt), 'hh:mm aaa')}
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <Ripple
                    onPress={onHeartIconPress}
                    rippleContainerBorderRadius={100}
                    rippleColor={'#dc2626'}
                    style={{ padding: 10 }}
                >
                    <AntDesign
                        name={isLoved ? 'heart' : 'hearto'}
                        color={isLoved ? '#dc2626' : undefined}
                        size={16}
                    />
                </Ripple>
                <Ripple
                    onPress={() => {
                        setTimeout(async () => {
                            const url = await containerRef.current.capture();
                            await RNShare.open({ url });
                        }, 300);
                    }}
                    rippleContainerBorderRadius={100}
                    style={{ padding: 10 }}
                >
                    <AntDesign name={'sharealt'} size={16} />
                </Ripple>
                <Ripple
                    rippleContainerBorderRadius={100}
                    style={{ padding: 10 }}
                >
                    <FeatherIcon name={'more-vertical'} size={16} />
                </Ripple>
            </View>
        </View>
    );
}
