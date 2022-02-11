import * as React from 'react';
import { ReactNode } from 'react';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface EventItemWrapperProps {
    onClick: () => void;
    children: ReactNode;
    showBorderLine?: boolean;
}

export function EventItemWrapper({
    children,
    onClick,
    showBorderLine = true,
}: EventItemWrapperProps) {
    return (
        <View
            style={{
                borderLeftWidth: 2,
                borderLeftColor: showBorderLine ? '#718096' : 'transparent',
                marginLeft: 15,
                paddingLeft: 20,
                paddingBottom: 40,
            }}
        >
            <Ripple
                rippleCentered
                style={{
                    position: 'absolute',
                    borderRadius: 100,
                    padding: 3,
                    left: -13,
                    backgroundColor: '#F7FAFC',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,

                    elevation: 10,
                }}
                onPress={onClick}
            >
                <AntDesign name='plus' size={20} />
            </Ripple>
            {children}
        </View>
    );
}
