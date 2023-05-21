import { useQuery } from '@apollo/client';
import { GET_ENTRIES } from '@/graphql/queries';

export function useGetUserEntries () {
  return useQuery(GET_ENTRIES);
}
