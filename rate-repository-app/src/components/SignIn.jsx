import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-dom";


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.signInbackGround,
    },
    item: {
        padding: 10,
        borderRadius: 4,
    }
});

const initialValues = {
    username: '',
    password: '',
};

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <FormikTextInput name="username" placeholder="Username" />
            </View>
            <View style={styles.item}>
                <FormikTextInput secureTextEntry name="password" placeholder="Password" />
            </View>
            <View style={styles.item}>
                <Button testID="submit" title="Sign in" onPress={onSubmit}></Button>
            </View>
        </View>
    );
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    let history = useHistory();

    const onSubmit = async (values) => {

        const { username, password } = values;
        await signIn({ username, password });
        history.push("/");
        
    };

    return <SignInContainer onSubmit={onSubmit} />;

};

export default SignIn;