import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList/RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import { Route, Switch, Redirect } from 'react-router-native';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.mainBackGround,
    },
});

const Main = () => {

    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;