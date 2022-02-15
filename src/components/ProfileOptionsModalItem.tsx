import React from 'react';
import { Text } from 'react-native';
import Ripple from 'react-native-material-ripple';

interface ProfileOptionsModalItemProps {
    Icon: React.FC;
    text: string;
    onPress: () => void;
}

export function ProfileOptionsModalItem({
    Icon,
    text,
    onPress,
}: ProfileOptionsModalItemProps) {
    return (
        <Ripple
            rippleCentered
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
            }}
            onPress={onPress}
        >
            <Icon />
            <Text>{text}</Text>
        </Ripple>
    );
}
