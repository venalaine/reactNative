import React from 'React';
import { View, Button, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphlql/mutations';
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
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
};

const ReviewForm = ({ onSubmit }) => {

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            </View>
            <View style={styles.item}>
                <FormikTextInput name="repositoryName" placeholder="Repository name" />
            </View>
            <View style={styles.item}>
                <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            </View>
            <View style={styles.item}>
                <FormikTextInput multiline name="text" placeholder="Review" />
            </View>
            <View style={styles.item}>
                <Button title="Create a review" onPress={onSubmit}></Button>
            </View>
        </View>
    );
};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .required('Rating is reguired')
        .min(0, 'Minimum value is 0')
        .max(100, 'Maximum value is 100'),
    text: yup
        .string(),
});

const AddReview = () => {
    const [createReview] = useMutation(CREATE_REVIEW);
    let history = useHistory();

    const onSubmit = async (values) => {
        let { repositoryName, ownerName, rating, text } = values;
        rating = parseInt(rating);

        await createReview({ variables: { review: { repositoryName, ownerName, rating, text } } });

        history.push("/");
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );


};

export default AddReview;