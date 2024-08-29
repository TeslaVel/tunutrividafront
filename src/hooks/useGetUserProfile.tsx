import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '@/graphql/queries';
import { mockUserProfile } from '@/graphql/mocks/mockUserProfile';
const USE_MOCK_DATA = import.meta.env.VITE_APP_USE_MOCK_DATA === 'true'

export function useGetUserProfile () {
	if (USE_MOCK_DATA) {
    return mockUserProfile();
  }

  return useQuery(GET_USER_PROFILE);
}
