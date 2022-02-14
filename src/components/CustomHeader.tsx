import * as React from 'react';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { DateContext } from '../../App';

interface CustomHeaderProps {
    showCalendar: boolean;
    setShowCalendar: Dispatch<SetStateAction<boolean>>;
}
export function CustomHeader({
    showCalendar,
    setShowCalendar,
}: CustomHeaderProps) {
    const { currentDate } = useContext(DateContext);
    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    height: 55,
                    paddingHorizontal: 10,
                    backgroundColor: 'white',
                }}
            >
                <Ripple
                    rippleCentered
                    style={{ padding: 10 }}
                    onPress={() => {}}
                >
                    <MaterialIcon name={'menu'} size={26} />
                </Ripple>
                <Ripple
                    onPress={() => setShowCalendar(!showCalendar)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: '100%',
                        paddingHorizontal: 10,
                    }}
                >
                    <Text style={{ fontSize: 17 }}>{currentDate}</Text>
                    <MaterialIcon
                        name={
                            showCalendar ? 'arrow-drop-down' : 'arrow-drop-up'
                        }
                        size={26}
                    />
                </Ripple>
            </View>
        </View>
    );
}
