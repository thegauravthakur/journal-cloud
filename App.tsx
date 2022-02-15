import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import * as React from 'react';
import { SetStateAction, useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AdvancedEvent } from './src/views/AdvancedEvent';
import { LoginPage } from './src/views/LoginPage';
import { EventType, Timeline } from './src/views/Timeline';

export interface CustomTheme {
    eventTitle: string;
    eventDescription: string;
}

TimeAgo.addLocale(en);
export type StackParams = {
    Login: {};
    Home: undefined;
    AdvancedEvent: { eventData: EventType; id?: string };
};

const Stack = createNativeStackNavigator<StackParams>();
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
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(
        format(new Date(), 'yyyy-MM-dd')
    );

    function onAuthStateChanged(_user: any) {
        setUser(_user);
        setLoading(false);
    }

    useEffect(() => {
        SplashScreen.hide();
    }, []);
    useEffect(() => auth().onAuthStateChanged(onAuthStateChanged), []);

    if (loading) return null;

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
                                    name={'Home'}
                                    component={Timeline}
                                    options={{
                                        title: 'Indexing Life',
                                        headerLeft: () => (
                                            <FontAwesome5Icon
                                                style={{ padding: 10 }}
                                                name={'paint-brush'}
                                                size={20}
                                            />
                                        ),
                                    }}
                                />
                                <Stack.Screen
                                    name={'AdvancedEvent'}
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
