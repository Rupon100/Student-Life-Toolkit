import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.init';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    // register
    const createUser = (email, pass) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    // login user
    const loginUser = (email, pass) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, pass);
    }

    // logout user
    const logout = () => {
        setLoading(false);
        return signOut(auth);
    }

    // get current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            console.log(currentUser);
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [])

    const info = {
        loading,
        user,
        createUser,
        loginUser,
        logout,
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;