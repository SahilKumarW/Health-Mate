import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useRef, useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import images from "../constants/images";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import Input from "../components/Input";
import Button from "../components/Button";
import { signUp } from "../utils/actions/authActions";
import { useDispatch } from 'react-redux';

const isTestMode = true;

const initialState = {
  inputValues: {
    fullName: isTestMode ? "John Doe" : "",
    email: isTestMode ? "example@gmail.com" : "",
    password: isTestMode ? "**********" : "",
    confirmPassword: ""
  },
  inputValidities: {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  },
  formIsValid: false,
};

const Signup = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      // Cleanup function to set isMounted to false when component unmounts
      isMounted.current = false;
    };
  }, []);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    try {
      const { fullName, email, password, confirmPassword } = formState.inputValues;

      // Check if any field is empty
      if (!fullName || !email || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return; // Exit the function if any field is empty
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match. Please try again.');
        return; // Exit the function if passwords do not match
      }

      // Continue with account creation logic
      dispatch(signUp(fullName, email, password, confirmPassword, setIsLoading, setError));

      if (isMounted.current) {
        // If successful, alert user and navigate to Login screen
        Alert.alert('Success', 'Account successfully created!');
        setError(null);
        setIsLoading(false);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Signup Error:', error);

      if (isMounted.current) {
        setIsLoading(false);
        setError(error.message || 'Something went wrong');
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };
  
  useEffect(() => {
    return () => {
      // Cleanup function to set isMounted to false when component unmounts
      isMounted.current = false;
    };
  }, []);

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
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Sign Up</Text>
        <Text style={{ ...FONTS.body2, color: COLORS.gray }}>
          Sign Up Now
        </Text>
        <View style={{ marginVertical: 22 }}>
          <Input
            id="fullName"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["fullName"]}
            placeholder="Name"
            placeholderTextColor={COLORS.gray}
          />
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
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["confirmPassword"]}
            autoCapitalize="none"
            id="confirmPassword"
            placeholder="Confirm Password"
            placeholderTextColor={COLORS.gray}
            secureTextEntry={true}
          />
          <Button
            title="SIGN UP"
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
              Already have an account ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}> Login</Text>
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

export default Signup;
