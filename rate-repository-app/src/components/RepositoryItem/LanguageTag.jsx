import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 0,
        paddingLeft: 80,
    },
});

const LanguageTag = ({ language }) => {
    return (
        <View style={styles.container}>
            <Text testID="language" color={'colorTextLanguageTag'}>{language}</Text>
        </View>
    );
};

export default LanguageTag;