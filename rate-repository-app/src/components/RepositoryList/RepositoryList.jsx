import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useHistory } from "react-router-dom";
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Dropdown = ( {setFilter} ) => {

  return (
      <View>
          <RNPickerSelect
              onValueChange={(value) => setFilter(value)}
              items={[
                  { label: 'Latest repositories', value: 'latest' },
                  { label: 'Highest rated repositories', value: 'highestRated' },
                  { label: 'Lowest rated repositories', value: 'lowestRated' },
              ]}
          />
      </View>
  );
};

export const RepositoryListContainer = ({ repositories, setFilter }) => {
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
      keyExtractor={({ id }) => id}
      // other props
      renderItem={({ item }) => <TouchableOpacity onPress={() => handlePush(item.id)}><RepositoryItem item={item} /></TouchableOpacity>}
      ListHeaderComponent={<Dropdown setFilter={setFilter} />}
    />
  );
};

const RepositoryList = () => {
  const [filter, setFilter] = useState('latest');

  const { repositories } = useRepositories(filter);

  return <RepositoryListContainer repositories={repositories} setFilter={setFilter} />;

};

export default RepositoryList;