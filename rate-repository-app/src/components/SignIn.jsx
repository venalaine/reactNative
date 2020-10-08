import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
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
                <Button title="Sign in" onPress={onSubmit}></Button>
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

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;