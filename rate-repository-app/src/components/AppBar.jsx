import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarBack,
    },
    flexItemA: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingBottom: 20,
        flexGrow: 1,
    },
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.flexItemA}>
                <AppBarTab appBarText={'Repositories'} />
            </View>
        </View>
    );
};

export default AppBar;