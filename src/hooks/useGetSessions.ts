import { useQuery } from '@apollo/client';
import { GET_SESSIONS } from '@/graphql/queries';

// types
import { SessionType, PaginatedSessionType } from "@/types";

export function useGetSessions (page?: number, limit?: number) {
  // return useQuery(GET_SESSIONS, {
  //   variables: { page, limit},
  // });

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
