import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import AntDesign from 'react-native-vector-icons/AntDesign';

GoogleSignin.configure({
    webClientId:
        '532046054426-ql71ch7dnavmja3feollrainnjcm0ifr.apps.googleusercontent.com',
});
export function LoginPage() {
    return (
        <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
            <View style={{}}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 32,
                        textAlign: 'center',
                    }}
                >
                    Welcome Back
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        maxWidth: 250,
                        textAlign: 'center',
                        marginTop: 15,
                        marginBottom: 25,
                    }}
                >
                    A clean UI experience is just a minute away
                </Text>
                <Ripple
                    onPress={async () => {
                        const { idToken } = await GoogleSignin.signIn();
                        const googleCredential =
                            auth.GoogleAuthProvider.credential(idToken);
                        const { user } = await auth().signInWithCredential(
                            googleCredential
                        );
                        console.log(user);
                    }}
                    style={{
                        borderWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 5,
                        borderRadius: 8,
                    }}
                >
                    <AntDesign
                        name={'google'}
                        style={{ marginRight: 10 }}
                        size={20}
                    />
                    <Text style={{ fontSize: 16, textTransform: 'uppercase' }}>
                        Sign in with Google
                    </Text>
                </Ripple>
            </View>
        </View>
    );
}
