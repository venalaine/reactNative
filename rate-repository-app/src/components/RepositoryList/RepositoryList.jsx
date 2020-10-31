import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useHistory } from "react-router-dom";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories }) => {
  let history = useHistory();

  // Get the nodes from the edges array
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  const handlePush = (id) => {
    history.push(`/repositories/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({ item }) => <TouchableOpacity onPress={() => handlePush(item.id)}><RepositoryItem item={item} /></TouchableOpacity>}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;

};

export default RepositoryList;