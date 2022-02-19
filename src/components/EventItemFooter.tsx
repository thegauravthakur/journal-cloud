import TimeAgo from 'javascript-time-ago';
import React from 'react';
import { Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import RNShare from 'react-native-share';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface EventItemFooterProps {
    createdAt: number;
    containerRef: any;
}
export function EventItemFooter({
    createdAt,
    containerRef,
}: EventItemFooterProps) {
    const timeAgo = new TimeAgo('en-in');

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Text style={{ fontSize: 14 }}>{timeAgo.format(createdAt)}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Ripple
                    rippleContainerBorderRadius={100}
                    style={{ padding: 10 }}
                >
                    <AntDesign name={'hearto'} size={16} style={{}} />
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
