import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
    containerMain: {
        padding: 20,
        paddingBottom: 20,
        flexDirection: 'row'
    },
    itemStatistic: {
        flexDirection: 'column',
        paddingRight: 40,
    }
});

const converter = ( value ) => {
    if (value < 1000) {
        return value;
    }
    return String((value/1000).toFixed(1)+'k');
};

const Statistics = ({ stars, forks, reviews, rating }) => {
    return (
        <View style={styles.containerMain}>
            <View style={styles.itemStatistic}>
                <Text testID="stars" fontWeight={'bold'}>{converter(stars)}</Text>
                <Text color={'textSecondary'}>Stars</Text>
            </View>
            <View style={styles.itemStatistic}>
                <Text testID="forks" fontWeight={'bold'}>{converter(forks)}</Text>
                <Text color={'textSecondary'}>Forks</Text>
            </View>
            <View style={styles.itemStatistic}>
                <Text testID="reviews" fontWeight={'bold'}>{reviews}</Text>
                <Text color={'textSecondary'}>Reviews</Text>
            </View>
            <View style={styles.itemStatistic}>
                <Text testID="rating" fontWeight={'bold'}>{rating}</Text>
                <Text color={'textSecondary'}>Rating</Text>
            </View>
        </View>
    );
};

export default Statistics;