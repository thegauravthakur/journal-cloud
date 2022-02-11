import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Ripple from 'react-native-material-ripple';

export function AdvancedEvent() {
    const route = useRoute();
    const navigation = useNavigation<any>();
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const { title, description, id, createdAt } = route.params;
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
                        navigation.navigate({
                            name: 'Indexing Life',
                            params: {
                                event: {
                                    title: newTitle,
                                    description: newDescription,
                                    id,
                                    createdAt,
                                },
                            },
                            merge: true,
                        });
                    }}
                >
                    <Text>save</Text>
                </Ripple>
            ),
        });
    }, [createdAt, id, navigation, newDescription, newTitle]);

    return (
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
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
    );
}
