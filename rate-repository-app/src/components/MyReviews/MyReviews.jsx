import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AuthStorageContext from '../../contexts/AuthStorageContext';
import { GET_AUTHORIZED_USER } from '../../graphlql/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Text from '../Text';
import theme from '../../theme';
import { format } from 'date-fns';
import { useHistory } from "react-router-dom";
import { DELETE_REVIEW } from '../../graphlql/mutations';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.listItem,
        paddingBottom: 10,
    },
    containerMain: {
        padding: 20,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    containerButtons: {
        padding: 20,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    separator: {
        height: 10,
    },
});

const RenderReviews = ({ review, refetch }) => {
    let history = useHistory();
    const [mutate] = useMutation(DELETE_REVIEW);

    const id = review.node.repository.id;

    const handleView = () => {
        history.push(`/repositories/${id}`);
    };

    const doDelete = async () => {

        await mutate({ variables: { id: review.node.id } });

        refetch();
    };

    const handleDelete = () => {

        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: () => doDelete() }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View>
                    <Text color={'colorTextRating'}>{review.node.rating}</Text>
                </View>
                <View style={styles.containerRevies}>
                    <Text fontWeight={'bold'}>{review.node.user.username}</Text>
                    <Text style={styles.reviewTextObject}>{format(new Date(review.node.createdAt), 'MM.dd.yyyy')}</Text>
                    <Text style={styles.reviewTextObject}>{review.node.text}</Text>
                </View>
            </View>
            <View style={styles.containerButtons}>
                <View style={{ padding: 10 }}>
                    <Button title="View repository" onPress={handleView}></Button>
                </View>
                <View style={{padding: 10}}>
                    <Button title="Delete review" color="#ff0000" onPress={handleDelete}></Button>
                </View>
            </View>
        </View>
    );
};

const MyReviews = () => {
    const authStorage = useContext(AuthStorageContext);
    const token = authStorage.getAccessToken();

    const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
        variables: { includeReviews: true }
    });

    if (loading) {
        return null;
    }

    const reviews = data.authorizedUser.reviews.edges;

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RenderReviews review={item} refetch={refetch} />}
            keyExtractor={({ node: { id } }) => id}
        />
    );
};

export default MyReviews;