import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList/RepositoryList';
import RepositoryItem from './RepositoryItem/RepositoryItem';
import AppBar from './AppBar';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import AddReview from './AddReview/AddReview';
import MyReviews from './MyReviews/MyReviews';
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
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/repositories/:id">
                    <RepositoryItem singleView={true} />
                </Route>
                <Route path="/review">
                    <AddReview />
                </Route>
                <Route path="/myreviews">
                    <MyReviews />
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