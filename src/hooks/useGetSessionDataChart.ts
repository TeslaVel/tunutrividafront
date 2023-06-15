import { useQuery } from '@apollo/client';
import { GET_SESSIONS_DATA_CHART } from '@/graphql/queries';

export function useGetSessionDataChart () {
  return useQuery(GET_SESSIONS_DATA_CHART);
}
