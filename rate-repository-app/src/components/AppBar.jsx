import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { Link } from 'react-router-native';
import SignIn from './SignIn';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarBackGround,
    },
    tabItem: {
        paddingTop: 25,
        paddingLeft: 15,
        paddingBottom: 25,
        flexGrow: 1,
    },
    scrollItem: {
        flexDirection: 'row'
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scrollItem}>
                <View style={styles.tabItem}>
                    <AppBarTab appBarText={'Repositories'} linkUrl={'/'} />
                </View>
                <View style={styles.tabItem}>
                    <AppBarTab appBarText={'Sign in'} linkUrl={'/sign'} />
                </View>
            </ScrollView>
        </View>
    );
};

export default AppBar;