import { GET_REPOSITORIES } from '../graphlql/queries';
import { useQuery } from '@apollo/react-hooks';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });

  return  { repositories: data ? data.repositories : undefined, loading, error };

};

export default useRepositories;