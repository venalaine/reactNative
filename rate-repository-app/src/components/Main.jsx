import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList/RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.mainBackGround,
    },
});

const Main = () => {
    return (
        <View>
            <View style={styles.container}>
                <AppBar />
                <RepositoryList />
            </View>
        </View>
    );
};

export default Main;