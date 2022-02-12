import { format } from 'date-fns';
import * as React from 'react';
import { useContext } from 'react';
import { Text } from 'react-native';

import { DateContext } from '../../App';
import { TextInputField } from './TextInputField';

interface TimelineHeaderProps {
    isLoading: boolean;
}
export function TimelineHeader({ isLoading }: TimelineHeaderProps) {
    const { currentDate } = useContext(DateContext);
    return (
        <>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    marginHorizontal: 10,
                    marginVertical: 20,
                }}
            >
                {format(new Date(currentDate), 'EEEE do, yyyy')}
            </Text>
            <TextInputField isLoading={isLoading} />
        </>
    );
}
