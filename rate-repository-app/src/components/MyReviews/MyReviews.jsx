import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AuthStorageContext from '../../contexts/AuthStorageContext';
import { GET_AUTHORIZED_USER } from '../../graphlql/queries';
import { useQuery } from '@apollo/react-hooks';
import Text from '../Text';
import theme from '../../theme';
import { format } from 'date-fns';

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
    separator: {
        height: 10,
    },
});    

const RenderReviews = ({ review }) => {

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
        </View>
    );
};

const MyReviews = () => {
    const authStorage = useContext(AuthStorageContext);
    const token = authStorage.getAccessToken();

    const { data, loading } = useQuery(GET_AUTHORIZED_USER, {
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
        renderItem={({ item }) => <RenderReviews review={item} />}
        keyExtractor={({ node: { id } }) => id}
    />
    );
};

export default MyReviews;