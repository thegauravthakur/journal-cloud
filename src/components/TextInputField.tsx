import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { queryClient } from '../../App';
import { Response } from '../views/Timeline';
import { EventItemWrapper } from './EventItemWrapper';

export function TextInputField() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isTitleFocused, setTitleFocus] = useState(false);
    const [isDescriptionFocused, setDescriptionFocus] = useState(false);

    const onEventSubmit = async () => {
        if (title || description) {
            const date = Date.now();
            const value = { title, description, createdAt: Date.now() };

            queryClient.setQueryData('fetchEvents', (events) => {
                const copy = { ...(events as Response) };
                copy[date.toString()] = value;
                return copy;
            });

            await firestore()
                .collection('user')
                .doc('10-02-2022')
                .update({ [date]: value });
        }
    };

    return (
        <EventItemWrapper iconName='plus' onClick={onEventSubmit}>
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
