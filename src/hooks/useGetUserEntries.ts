import { useQuery } from '@apollo/client';
import { GET_ENTRIES } from '@/graphql/queries';

export function useGetUserEntries (order?: string) {
  return useQuery(GET_ENTRIES, {
    variables: { order },
  });
}
