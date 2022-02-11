import * as React from 'react';
import { useRef, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { EventItemWrapper } from './components/EventItemWrapper';
import { Events } from './components/Events';

export function Timeline() {
    const [isTitleFocused, setTitleFocus] = useState(false);
    const [isDescriptionFocused, setDescriptionFocus] = useState(false);
    const titleRef = useRef<any>();
    const descriptionRef = useRef<any>();
    return (
        <ScrollView keyboardShouldPersistTaps={'never'}>
            <EventItemWrapper
                onClick={() => {
                    console.log(titleRef.current);
                }}
            >
                <View style={{ borderWidth: 1 }}>
                    {(isTitleFocused || isDescriptionFocused) && (
                        <TextInput
                            ref={titleRef}
                            onFocus={() => {
                                setTitleFocus(true);
                            }}
                            onBlur={() => setTitleFocus(false)}
                            placeholder={'title'}
                            multiline={true}
                            style={{ borderWidth: 1, paddingVertical: 0 }}
                        />
                    )}
                    <TextInput
                        ref={descriptionRef}
                        onFocus={() => setDescriptionFocus(true)}
                        onBlur={() => {
                            setTimeout(() => setDescriptionFocus(false), 10);
                        }}
                        placeholder='description'
                        multiline={true}
                        style={{ borderWidth: 1, paddingVertical: 0 }}
                    />
                </View>
            </EventItemWrapper>
            <Events />
        </ScrollView>
    );
}
