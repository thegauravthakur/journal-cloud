import {
    DefaultTheme,
    NavigationContainer,
    Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Timeline } from './src/views/Timeline';

TimeAgo.addLocale(en);
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f8fafc',
        card: '#f1f5f9',
    },
};
export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator>
                    <Stack.Screen name={'home'} component={Timeline} />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}
