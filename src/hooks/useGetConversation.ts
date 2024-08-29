import { useQuery } from '@apollo/client';
import { GET_CONVERSATION } from '@/graphql/queries';
import { mockUseGetConversation } from '@/graphql/mocks/mockConversation';
const USE_MOCK_DATA = import.meta.env.VITE_APP_USE_MOCK_DATA === 'true'

export function useGetConversation () {
	if (USE_MOCK_DATA) {
    return mockUseGetConversation();
  }

  return useQuery(GET_CONVERSATION);
}
