import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphlql/mutations';

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHORIZE);

    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
       return mutate({ variables: { credentials: { username, password } } });     
    };
    
    return [signIn, result];

};

export default useSignIn;

