import { useMutation } from "@apollo/client";
import { ENTRY_MUTATION } from '@/graphql/queries';

export const useMutationCreateEntry = () => {
  const [ CreateEntry, { data, loading, error, reset }] = useMutation(ENTRY_MUTATION);

  return { CreateEntry, data, loading, error, reset };
}