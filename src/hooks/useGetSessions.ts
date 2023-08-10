import { useQuery } from '@apollo/client';
import { GET_SESSIONS } from '@/graphql/queries';

export function useGetSessions (page?: number, limit?: number) {
  return useQuery(GET_SESSIONS, {
    variables: { page, limit},
  });
}
