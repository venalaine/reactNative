import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasicInfo from './BasicInfo';
import LanguageTag from './LanguageTag';
import Statistics from './Statistics';
import theme from '../../theme';

const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.listItem,
    },
});

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <BasicInfo avatar={item.ownerAvatarUrl} fullName={item.fullName} description={item.description} />
            <LanguageTag language={item.language} />
            <Statistics stars={item.stargazersCount} forks={item.forksCount} reviews={item.reviewCount} rating={item.ratingAverage} />
        </View>
    );
};

export default RepositoryItem;