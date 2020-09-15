import React, { useEffect, useState, useCallback } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBSyd6GPx0oS_7HCg7ie-1nTbl6cQyHpPw",
    appId: "1:1060699242268:web:32f7fcc5e157ae97dc84d9",
    authDomain: "selectors-analyzer.firebaseapp.com",
    databaseURL: "https://selectors-analyzer.firebaseio.com",
    measurementId: "G-VP8THHX4JE",
    messagingSenderId: "1060699242268",
    projectId: "selectors-analyzer",
    storageBucket: "selectors-analyzer.appspot.com",
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
    signInFlow: "popup",
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod:
                firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: "/",
};

const auth = firebase.auth();

const App = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const signOut = useCallback(() => auth.signOut(), []);

    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {
                setUser(user);
                setIsLoading(false);
            });
        return () => {
            unregisterAuthObserver();
        };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {!user ? (
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            ) : (
                <>
                    <div>Hello, {user.displayName}</div>
                    <button onClick={signOut}>Sign out</button>
                </>
            )}
        </>
    );
};

export default App;
