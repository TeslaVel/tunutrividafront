import { useQuery } from '@apollo/client';
import { GET_ENTRIES } from '@/graphql/queries';
import { mockUseGetUserEntries } from '@/graphql/mocks/mockEntries';
const USE_MOCK_DATA = import.meta.env.VITE_APP_USE_MOCK_DATA === 'true'

export function useGetUserEntries (order?: string) {
	if (USE_MOCK_DATA) {
    return mockUseGetUserEntries(order);
  }

  return useQuery(GET_ENTRIES, {
    variables: { order },
  });
}
