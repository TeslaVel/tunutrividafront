import { useQuery } from '@apollo/client';
import { GET_SESSIONS } from '@/graphql/queries';

export function useGetSessions () {
  return useQuery(GET_SESSIONS);
}
