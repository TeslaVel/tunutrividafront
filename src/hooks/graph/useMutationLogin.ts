import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from '@/graphql/queries';

export const useMutationLogin = () => {
  const [ Login, { data, loading, error, reset }] = useMutation(LOGIN_MUTATION);

  return { Login, data, loading, error, reset };
}