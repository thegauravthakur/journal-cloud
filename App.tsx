import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Timeline } from './src/views/Timeline';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();
export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={'home'} component={Timeline} />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}
