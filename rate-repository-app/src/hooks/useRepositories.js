import { GET_REPOSITORIES } from '../graphlql/queries';
import { useQuery } from '@apollo/react-hooks';

const useRepositories = (variables) => {

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables
  });

  return { repositories: data ? data.repositories : undefined, fetchMore: handleFetchMore, loading, error, ...result };

};

export default useRepositories;