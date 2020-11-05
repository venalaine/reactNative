import { GET_REPOSITORIES } from '../graphlql/queries';
import { useQuery } from '@apollo/react-hooks';

const useRepositories = ( filter, search ) => {

  if (filter === 'latest') {

    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: { orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword:search }
      // Other options
    });

    return  { repositories: data ? data.repositories : undefined, loading, error };

  }

  if (filter === 'highestRated') {

    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', searchKeyword:search }
      // Other options
    });

    return  { repositories: data ? data.repositories : undefined, loading, error };

  }

  if (filter === 'lowestRated') {

    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', searchKeyword:search }
      // Other options
    });

    return  { repositories: data ? data.repositories : undefined, loading, error };

  }

  return  null;

};

export default useRepositories;