import { useQuery } from '@apollo/client';
import { GET_SESSIONS } from '@/graphql/queries';
import { mockUseGetSessions } from '@/graphql/mocks/mockSessions';
const USE_MOCK_DATA = import.meta.env.VITE_APP_USE_MOCK_DATA === 'true';

// types
import { SessionType, PaginatedSessionType } from "@/types";

export function useGetSessions (page?: number, limit?: number) {
   if (USE_MOCK_DATA) {
    return mockUseGetSessions(page, 7);
  }

  const { loading, data: result, refetch } = useQuery(GET_SESSIONS, {
    variables: { page, limit},
  });

  const data: PaginatedSessionType = result?.sessions
  const sessions: SessionType[] = data?.paginated
  const pagination = {
    totalPages: data?.totalPages,
    currentPage: data?.currentPage,
    prevPage: data?.prevPage,
    nextPage: data?.nextPage,
  }

  return { loading, sessions, pagination, refetch }
}
