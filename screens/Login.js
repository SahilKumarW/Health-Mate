import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import images from "../constants/images";
import Input from "../components/Input";
import Button from "../components/Button";
import { signIn, checkUserExists } from "../utils/actions/authActions";
import { useDispatch } from "react-redux";
import { reducer, initialState } from "../utils/reducers/formReducers";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/HomeScreenStates';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState); // Use Recoil state
  const nav = useNavigation();


  const inputChangedHandler = async (id, value) => {
    switch (id) {
      case 'email':
        setEmail(value);

        // Check for email existence as the user types
        try {
          const userExists = await checkUserExists(value);
          setEmailExists(userExists);
        } catch (error) {
          console.error(error);
          // Handle error, e.g., show a generic message or log it for debugging
        }
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const authHandler = async () => {
    // Check for empty fields before proceeding
    if (!email || !password) {
      // Display alert and return
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    console.log('Email before authentication:', email); // Log the email value
    console.log('Password before authentication:', password); // Log the password value

    try {
      const result = await signIn(email, password);
      console.log('Login successful:', result.user);

      // Update Recoil atom with user information
      setUserInfo({ name: result.user.displayName, email: result.user.email });

      setIsLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.code, error.message);
      setIsLoading(false); // Stop loading

      if (error.code === 'auth/user-not-found') {
        // Handle user not found
        Alert.alert('Error', 'User not found. Please create an account.');
      } else if (error.code === 'auth/wrong-password') {
        // Handle wrong password
        Alert.alert('Error', 'Invalid password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        // Handle invalid email
        Alert.alert('Error', 'Invalid email. Please check your email address.');
      } else if (error.code === 'auth/invalid-credential') {
        // Handle invalid credentials
        Alert.alert('Error', 'Invalid email or password. Please try again.');
      } else {
        // Handle other errors
        Alert.alert('Error', 'An error occurred during login. Please try again.');
      }
    }
    };

  useEffect(() => {
    // No dependencies here (empty array) as we only want this to run once on mount
    const initialFormState = reducer(undefined, { type: '@@INIT' }); // Simulate reducer with initial state
    dispatchFormState(initialFormState); // Set the initial state fetched from the reducer
    console.log("formState after useEffect:", formState); // Log state after update
  }, [dispatchFormState]); // Include dispatchFormState in the dependency array

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
            marginLeft: - 22,
            marginBottom: 6
          }}
        />
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Sign In</Text>
        <Text style={{ ...FONTS.body2, color: COLORS.gray }}>
          Sign In Now
        </Text>
        <View style={{ marginVertical: 22 }}>
          <Input
            id="email"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["email"]}
            placeholder="Email Address"
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
          />
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["password"]}
            autoCapitalize="none"
            id="password"
            placeholder="Password"
            placeholderTextColor={COLORS.gray}
            secureTextEntry={true}
          />
          <Button
            title="LOGIN"
            onPress={authHandler}
            isLoading={isLoading}
            style={{
              width: SIZES.width - 32,
              marginVertical: 8,
            }}
          />
          <View
            style={styles.bottomContainer}>
            <Text style={{ ...FONTS.body3, color: COLORS.white }}>
              Don't have an account ? {" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Image source={images.cover} resizeMode="contain" style={styles.cover} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  cover: {
    width: SIZES.width,
    position: "absolute",
    bottom: 0,
  },
});

export default Login;