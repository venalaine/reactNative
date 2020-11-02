import React from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import Text from '../Text';
import BasicInfo from './BasicInfo';
import LanguageTag from './LanguageTag';
import Statistics from './Statistics';
import theme from '../../theme';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY, GET_REVIEWS } from '../../graphlql/queries';
import * as Linking from 'expo-linking';
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
    repositorySeparator: {
        height: 10,
        backgroundColor: theme.colors.mainBackGround, 
    },
    containerRevies: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 20,
        flex: 1
    },
    reviewTextObject: {
        paddingBottom: 5,
    },
});

const RenderRepository = ({ repository }) => {

    const handleButtonPress = () => {
        Linking.openURL(repository.url);
    };

    return (
        <View style={styles.container}>
            <BasicInfo avatar={repository.ownerAvatarUrl} fullName={repository.fullName} description={repository.description} />
            <LanguageTag language={repository.language} />
            <Statistics stars={repository.stargazersCount} forks={repository.forksCount} reviews={repository.reviewCount} rating={repository.ratingAverage} />
            <View style={{ padding: 20 }}>
                <Button title="Open in GitHub" onPress={handleButtonPress}></Button>
            </View>
            <View style={styles.repositorySeparator}/>
        </View>
    );
};

const RenderReviews = ({ review }) => {

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View>
                    <Text color={'colorTextRating'}>{review.node.rating}</Text>
                </View>
                <View style={styles.containerRevies}>
                    <Text style={styles.reviewTextObject} fontWeight={'bold'}>{review.node.user.username}</Text>
                    <Text style={styles.reviewTextObject}>{format(new Date(review.node.createdAt), 'MM.dd.yyyy')}</Text>
                    <Text style={styles.reviewTextObject}>{review.node.text}</Text>
                </View>
            </View>
        </View>
    );
};

const SingleRepoItem = () => {
    const id = useParams().id;

    const { loading: repoLoading, data: repoData } = useQuery(GET_REPOSITORY, {
        variables: { id: id },
    });

    const { loading: reviewLoading, data: reviewData } = useQuery(GET_REVIEWS, {
        variables: { id: id },
    });

    if (repoLoading || reviewLoading) {
        return null;
    }

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
        <FlatList
            data={reviewData.repository.reviews.edges}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RenderReviews review={item} />}
            keyExtractor={({ node: { id } }) => id}
            ListHeaderComponent={() => <RenderRepository repository={repoData.repository} />}
        />
    );

};

const RepositoryItem = ({ item, singleView }) => {

    if (singleView) {
        return <SingleRepoItem />;
    }

    return (
        <View style={styles.container}>
            <BasicInfo avatar={item.ownerAvatarUrl} fullName={item.fullName} description={item.description} />
            <LanguageTag language={item.language} />
            <Statistics stars={item.stargazersCount} forks={item.forksCount} reviews={item.reviewCount} rating={item.ratingAverage} />
        </View>
    );
};

export default RepositoryItem;