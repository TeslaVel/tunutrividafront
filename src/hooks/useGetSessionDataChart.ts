import { useQuery } from '@apollo/client';
import { GET_SESSIONS_DATA_CHART } from '@/graphql/queries';
import { mockUseGetSessionDataChart } from '@/graphql/mocks/mockSessionDataChart';
const USE_MOCK_DATA = import.meta.env.VITE_APP_USE_MOCK_DATA === 'true'

export function useGetSessionDataChart () {
	if (USE_MOCK_DATA) {
    return mockUseGetSessionDataChart();
  }

  return useQuery(GET_SESSIONS_DATA_CHART);
}
