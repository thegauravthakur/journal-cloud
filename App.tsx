import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AdvancedEvent } from './src/views/AdvancedEvent';
import { Timeline } from './src/views/Timeline';

export interface CustomTheme {
    eventTitle: string;
    eventDescription: string;
}

TimeAgo.addLocale(en);
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f8fafc',
        card: 'white',
        eventTitle: '#B91C1C',
        eventDescription: '#374151',
    },
};
export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator>
                    <Stack.Screen
                        name={'Indexing Life'}
                        component={Timeline}
                        options={{
                            headerTitleAlign: 'center',
                        }}
                    />
                    <Stack.Screen
                        name={'Advanced Event'}
                        component={AdvancedEvent}
                        options={{
                            headerTitleAlign: 'center',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}
