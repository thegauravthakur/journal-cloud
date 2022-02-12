import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { queryClient } from '../../App';
import { Response } from './Timeline';

export function AdvancedEvent() {
    const route = useRoute();
    const navigation = useNavigation<any>();
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const { title, description, id, createdAt } = route.params as any;
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ripple
                    style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    onPress={() => {
                        if (newTitle || newDescription) {
                            const updatedEvent = {
                                id,
                                createdAt,
                                title: newTitle || title,
                                description: newDescription || description,
                            };
                            queryClient.setQueryData(
                                'fetchEvents',
                                (_events) => {
                                    const copy = { ...(_events as Response) };
                                    copy[id] = updatedEvent;
                                    return copy;
                                }
                            );
                            firestore()
                                .collection('user')
                                .doc('10-02-2022')
                                .update({ [id]: updatedEvent });
                        }
                        navigation.goBack();
                    }}
                >
                    <Text>save</Text>
                </Ripple>
            ),
        });
    }, [
        createdAt,
        description,
        id,
        navigation,
        newDescription,
        newTitle,
        title,
    ]);

    return (
        <View
            style={{
                marginHorizontal: 10,
                marginTop: 10,
                justifyContent: 'space-between',
                flex: 1,
            }}
        >
            <View>
                <TextInput
                    multiline
                    onChangeText={(text) => setNewTitle(text)}
                    defaultValue={title}
                    style={{ fontSize: 18, fontWeight: '700', lineHeight: 25 }}
                />

                <TextInput
                    onChangeText={(text) => setNewDescription(text)}
                    multiline
                    defaultValue={description}
                    style={{ fontSize: 16, lineHeight: 25 }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        borderRightWidth: 1,
                        flex: 1,
                        flexDirection: 'row',
                        marginRight: 10,
                        marginBottom: 10,
                    }}
                >
                    <Ripple
                        style={{ padding: 10, alignSelf: 'flex-start' }}
                        rippleContainerBorderRadius={100}
                    >
                        <MaterialIcon name={'camera-alt'} size={25} />
                    </Ripple>
                    <Ripple
                        style={{ padding: 10, alignSelf: 'flex-start' }}
                        rippleContainerBorderRadius={100}
                    >
                        <MaterialIcon name={'photo-library'} size={25} />
                    </Ripple>
                </View>
                <Ripple
                    style={{ padding: 10 }}
                    rippleContainerBorderRadius={100}
                >
                    <MaterialIcon name={'delete'} size={25} />
                </Ripple>
            </View>
        </View>
    );
}
