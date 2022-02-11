import * as React from 'react';
import { ReactNode } from 'react';
import { View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface EventItemWrapperProps {
    onClick: () => void;
    children: ReactNode;
}

export function EventItemWrapper({ children, onClick }: EventItemWrapperProps) {
    return (
        <View
            style={{
                borderLeftWidth: 2,
                marginHorizontal: 15,
                paddingLeft: 18,
                minHeight: 50,
            }}
        >
            <AntDesign
                style={{
                    position: 'absolute',
                    borderRadius: 100,
                    padding: 3,
                    left: -13,
                    backgroundColor: 'pink',
                }}
                name='plus'
                size={20}
                onPress={onClick}
            />
            {children}
        </View>
    );
}
