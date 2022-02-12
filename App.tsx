import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import * as React from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AdvancedEvent } from './src/views/AdvancedEvent';
import { LoginPage } from './src/views/LoginPage';
import { Timeline } from './src/views/Timeline';

export interface CustomTheme {
    eventTitle: string;
    eventDescription: string;
}

TimeAgo.addLocale(en);
const Stack = createNativeStackNavigator();
export const queryClient = new QueryClient();

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

interface DateContextType {
    currentDate: string;
    // eslint-disable-next-line no-unused-vars
    setCurrentDate: (arg1: SetStateAction<string>) => void;
}
export const DateContext = React.createContext<DateContextType>({
    currentDate: format(new Date(), 'yyyy-MM-dd'),
    setCurrentDate: () => {},
});

export function App() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [currentDate, setCurrentDate] = useState(
        format(new Date(), 'yyyy-MM-dd')
    );
    const [isLoading, setLoading] = useState(true);

    function onAuthStateChanged(_user: any) {
        setUser(_user);
        setLoading(false);
    }

    useEffect(() => auth().onAuthStateChanged(onAuthStateChanged), []);
    if (isLoading) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <DateContext.Provider value={{ currentDate, setCurrentDate }}>
                <NavigationContainer theme={theme}>
                    <Stack.Navigator>
                        {!user ? (
                            <Stack.Screen
                                name={'Login'}
                                component={LoginPage}
                                options={{
                                    headerTitleAlign: 'center',
                                    title: 'Welcome Back',
                                }}
                            />
                        ) : (
                            <>
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
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </DateContext.Provider>
        </QueryClientProvider>
    );
}