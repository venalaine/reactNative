import React from 'react';
import { CREATE_USER } from '../graphlql/mutations';
import useSignIn from '../hooks/useSignIn';
import { View, Button, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';

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
    passwordConfirm: '',
};

const SignUpForm = ({ onSubmit }) => {

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <FormikTextInput name="username" placeholder="Username" />
            </View>
            <View style={styles.item}>
                <FormikTextInput secureTextEntry name="password" placeholder="Password" />
            </View>
            <View style={styles.item}>
                <FormikTextInput secureTextEntry name="passwordConfirm" placeholder="Password confirmation" />
            </View>
            <View style={styles.item}>
                <Button title="Sign Up" onPress={onSubmit}></Button>
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
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required('Password confirmation is required')
});

const SignUp = () => {
    const [createUser] = useMutation(CREATE_USER);
    const [signIn] = useSignIn();
    let history = useHistory();

    const onSubmit = async (values) => {

        const { username, password } = values;

        await createUser({ variables: { user: { username, password } } });
        await signIn({ username, password });
        history.push("/");

    };


    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );

};

export default SignUp;