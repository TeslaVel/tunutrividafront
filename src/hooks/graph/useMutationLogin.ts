import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@/graphql/queries';
import { mockCreateAuth } from "@/graphql/mocks/mockCreateAuth";

const USE_MOCK_DATA = import.meta.env.VITE_APP_USE_MOCK_DATA === 'true';

export const useMutationLogin = () => {
  const [login, { data, loading, error, reset }] = useMutation(LOGIN_MUTATION);

  const Login = (variables: any) => {
    if (USE_MOCK_DATA) {
      if (variables.email=== 'user@example.com' && variables.password === 'password') {
        return mockCreateAuth;
      } else {
        throw new Error('Invalid credentials');
      }
    } else {
      return login({ variables });
    }
  };

  return { Login, data, loading, error, reset };
};
