import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphlql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const [mutate, result] = useMutation(AUTHORIZE);

    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
       
    //  return mutate({ variables: { credentials: { username, password } } });     
        const data = await mutate({ variables: { credentials: { username, password } } });

        await authStorage.setAccessToken(data.authorize);
        apolloClient.resetStore();
        
        return data;
    };
    
    return [signIn, result];

};

export default useSignIn;

