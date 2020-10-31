import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import BasicInfo from './BasicInfo';
import LanguageTag from './LanguageTag';
import Statistics from './Statistics';
import theme from '../../theme';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../../graphlql/queries';
import * as Linking from 'expo-linking';


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.listItem,
    }
});

const SingleRepoItem = () => {
    const id = useParams().id;

    const { loading, data } = useQuery(GET_REPOSITORY, {
        variables: { id: id },
    });

    if (loading) {
        return null;
    }

    const item = data.repository;

    const handleButtonPress = () => {
        Linking.openURL(item.url);
    };

    return (
        <View style={styles.container}>
            <BasicInfo avatar={item.ownerAvatarUrl} fullName={item.fullName} description={item.description} />
            <LanguageTag language={item.language} />
            <Statistics stars={item.stargazersCount} forks={item.forksCount} reviews={item.reviewCount} rating={item.ratingAverage} />
            <Button title="Open in GitHub" onPress={handleButtonPress}></Button>
        </View>
    );

};

const RepositoryItem = ({ item, singleView }) => {

    if (singleView) {
        return <SingleRepoItem />;
    }

    return (
        <View style={styles.container}>
            <BasicInfo avatar={item.ownerAvatarUrl} fullName={item.fullName} description={item.description} />
            <LanguageTag language={item.language} />
            <Statistics stars={item.stargazersCount} forks={item.forksCount} reviews={item.reviewCount} rating={item.ratingAverage} />
        </View>
    );
};

export default RepositoryItem;