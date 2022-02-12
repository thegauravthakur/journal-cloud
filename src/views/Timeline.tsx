import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';

import { Events } from '../components/Events';
import { TextInputField } from '../components/TextInputField';

export type Response = Record<string, Record<string, string | number>>;

export function Timeline() {
    const route = useRoute();
    // useEffect(() => {
    //     if (route.params?.event) {
    //         const { description, title, id } = route.params.event;
    //         const updatedEvent = {
    //             ...events[id],
    //             title: title || events[id].title,
    //             description: description || events[id].description,
    //         };
    //         if (
    //             updatedEvent.title !== events[id].title ||
    //             updatedEvent.description !== events[id].description
    //         ) {
    //             setEvents((_events) => {
    //                 const copy = { ..._events };
    //                 copy[id] = updatedEvent;
    //                 return copy;
    //             });
    //             firestore()
    //                 .collection('user')
    //                 .doc('10-02-2022')
    //                 .update({ [id]: updatedEvent });
    //         }
    //     }
    // }, [events, route.params?.event]);

    return (
        <ScrollView
            style={{ marginLeft: 4, marginRight: 12 }}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
        >
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    marginHorizontal: 10,
                    marginVertical: 20,
                }}
            >
                {format(new Date(), 'EEEE do, yyyy')}
            </Text>
            <TextInputField />
            <Events />
        </ScrollView>
    );
}
