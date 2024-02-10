import { getFirebaseApp } from '../firebaseHelper';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { authenticate } from '../../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export const signUp = (fullName, email, password, confirmPassword, setIsLoading, setError) => {
    return async (dispatch) => {
        const app = getFirebaseApp();
        const auth = getAuth(app);
        const firestore = getFirestore(app);

        try {
            // Check if passwords match
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            setIsLoading(true);

            // Create user with email and password
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;
            const expiryDate = new Date(expirationTime);

            // Set display name
            await updateProfile(result.user, { displayName: fullName });

            // Save user data to Firestore
            const userDocRef = doc(firestore, 'users', uid);
            await setDoc(userDocRef, {
                fullName,
                email,
            });

            // Dispatch authentication action
            dispatch(authenticate({ token: accessToken, userData: { fullName, email } }));

            // Save user data to AsyncStorage
            saveUserDataToStorage(dispatch, accessToken, uid, expiryDate);

            setIsLoading(false);
        } catch (error) {
            console.error('Signup Error:', error);

            setIsLoading(false);
            setError(error.message || 'Something went wrong');

            let errorMessage = 'Something went wrong';

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use';
            } else if (error.message === 'Passwords do not match') {
                errorMessage = 'Passwords do not match';
            }

            dispatch({ type: 'SET_ERROR_MESSAGE', payload: errorMessage });
            throw new Error(errorMessage);
        }
    };
};

const signIn = async (email, password) => {
    const auth = getAuth();

    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Fetch additional user information
        const { displayName } = user;

        // Return an object containing user information
        return { user: { email, displayName } };
    } catch (error) {
        console.error('Login Error:', error.code, error.message);
        throw error;
    }
};

const checkUserExists = async (email) => {
    const auth = getAuth();

    try {
        // Use a dummy password to check user existence
        await signInWithEmailAndPassword(auth, email, 'dummyPasswordForCheck');
        return true; // User exists
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            return false; // User does not exist
        }
        // Handle other errors if needed
        throw error;
    }
};

const createUser = async (fullName, email, userId) => {
    const firestore = getFirestore(getFirebaseApp());

    const userDocRef = doc(firestore, 'users', userId);

    try {
        await setDoc(userDocRef, {
            fullName,
            email,
            userId,
            signUpDate: new Date().toISOString(),
        });

        return {
            fullName,
            email,
            userId,
            signUpDate: new Date().toISOString(),
        };
    } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
    }
};

const saveUserDataToStorage = async (token, userId, expiryDate) => {
    try {
        let userData = {
            token,
            userId,
        };

        // Check if expiryDate is defined and valid before adding it to userData
        if (expiryDate instanceof Date && !isNaN(expiryDate.getTime())) {
            userData.expiryDate = expiryDate.toISOString();
        }

        await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
        console.error('Error saving user data to storage:', error);
    }
};

export { signIn, checkUserExists, createUser, saveUserDataToStorage };