import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../graphlql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/client';


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
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const token = authStorage.getAccessToken();

    const { data, loading } = useQuery(GET_AUTHORIZED_USER, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    });

    const handleLogOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scrollItem}>
                <Link to="/" component={AppBarTab}>Repositories</Link>
                { ((!loading) && data.authorizedUser === null) ? <Link to="/signin" component={AppBarTab}>Sign in</Link> :
                <Link to="/signout" component={AppBarTab} onPress={handleLogOut}>Sign out</Link> }
            </ScrollView>
        </View>
    );
};

export default AppBar;