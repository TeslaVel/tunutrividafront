import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from '@/graphql/queries';

export const useMutationLogout = () => {
  const [ Logout, { data, loading, error, reset }] = useMutation(LOGOUT_MUTATION);

  return { Logout, data, loading, error, reset };
}