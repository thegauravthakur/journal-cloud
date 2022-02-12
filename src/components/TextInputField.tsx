import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { useContext, useState } from 'react';
import { TextInput, View } from 'react-native';
import { v4 as uuid } from 'uuid';

import { DateContext, queryClient } from '../../App';
import { Response } from '../views/Timeline';
import { EventItemWrapper } from './EventItemWrapper';

interface TextInputFieldProps {
    isLoading: boolean;
}
export function TextInputField({ isLoading }: TextInputFieldProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isTitleFocused, setTitleFocus] = useState(false);
    const [isDescriptionFocused, setDescriptionFocus] = useState(false);
    const { currentDate } = useContext(DateContext);
    const { currentUser } = auth();
    const events =
        (queryClient.getQueryData(['fetchEvents', currentDate]) as Response) ??
        {};
    const showBorder = Object.keys(events).length > 0;

    const onEventSubmit = async () => {
        if ((title || description) && currentUser) {
            const id = uuid();
            const value = {
                title,
                description,
                createdAt: Date.now(),
                image: '',
            };

            queryClient.setQueryData(
                ['fetchEvents', currentDate],
                (_events) => {
                    const copy = { ...(_events as Response) };
                    copy[id] = value;
                    return copy;
                }
            );

            await firestore()
                .collection(currentUser.uid)
                .doc(currentDate)
                .set({ [id]: value }, { merge: true });
        }
    };

    return (
        <EventItemWrapper
            showBorderLine={showBorder || isLoading}
            iconName='plus'
            onClick={onEventSubmit}
        >
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 6,
                }}
            >
                {(isTitleFocused || isDescriptionFocused) && (
                    <TextInput
                        onBlur={() =>
                            setTimeout(() => setTitleFocus(false), 10)
                        }
                        onFocus={() => {
                            setTitleFocus(true);
                        }}
                        onChangeText={(text) => setTitle(text)}
                        placeholder={'title'}
                        multiline={true}
                        style={{
                            paddingVertical: 0,
                            fontSize: 18,
                            marginBottom: 4,
                            fontWeight: '500',
                            lineHeight: 25,
                        }}
                    />
                )}
                <TextInput
                    onFocus={() => setDescriptionFocus(true)}
                    onBlur={() => {
                        setTimeout(() => setDescriptionFocus(false), 10);
                    }}
                    placeholder='Add a memory...'
                    multiline={true}
                    onChangeText={(text) => setDescription(text)}
                    style={{ paddingVertical: 0, fontSize: 16, lineHeight: 25 }}
                />
            </View>
        </EventItemWrapper>
    );
}
