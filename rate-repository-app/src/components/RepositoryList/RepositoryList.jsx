import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useHistory } from "react-router-dom";
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import theme from '../../theme';
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackGround,
  },
});

const Search = ({ setSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query);
    setSearch(searchQuery);
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );

};

const Dropdown = ({ setFilter }) => {

  return (
    <View>
      <RNPickerSelect
        placeholder={{
          label: 'Select an item',
          value: '',
        }}
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

const Header = ({ setFilter, setSearch }) => {

  return (
    <View style={styles.container}>
      <Search setSearch={setSearch} />
      <Dropdown setFilter={setFilter} />
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, setFilter, setSearch, onEndReach }) => {
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
      ListHeaderComponent={
        <Header setFilter={setFilter} setSearch={setSearch} />
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  let orderBy = undefined;
  let orderDirection = undefined; 

  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  
  if (filter === 'latest') {
    orderBy = 'CREATED_AT';
    orderDirection = 'DESC';
  }

  if (filter === 'highestRated') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC';
  }

  if (filter === 'lowestRated') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC';
  }

  const { repositories, fetchMore } = useRepositories({orderBy, orderDirection, searchKeyword: debouncedSearch, first: 10});

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer
    repositories={repositories}
    setFilter={setFilter}
    setSearch={setSearch}
    onEndReach={onEndReach}
  />;

};

export default RepositoryList;