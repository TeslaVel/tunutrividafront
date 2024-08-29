import { useQuery } from '@apollo/client';
import { GET_CURRENT_APPOINTMENTS, GET_APPOINTMENTS } from '@/graphql/queries';
import { mockUseGetAppointments } from '@/graphql/mocks/mockAppointments';
const USE_MOCK_DATA = import.meta.env.VITE_APP_USE_MOCK_DATA === 'true'

// types
import { AppointmentType, PaginatedAppointmentType } from "@/types";

export function useGetAppointments (filter: { status: AppointmentType['status']  }, page?: number, limit?: number) {
  if (USE_MOCK_DATA) {
    return mockUseGetAppointments(filter, page, 4);
  }

  const { loading, data: result, refetch } = useQuery(GET_APPOINTMENTS, {
    variables: { filter, page, limit},
  });

  const data: PaginatedAppointmentType = result?.appointments
  const appointments: AppointmentType[] = data?.paginated
  const pagination = {
    totalPages: data?.totalPages,
    currentPage: data?.currentPage,
    prevPage: data?.prevPage,
    nextPage: data?.nextPage,
  }

  return { loading, appointments, pagination, refetch }
}

export function useGetCurrentAppointments () {
  return useQuery(GET_CURRENT_APPOINTMENTS);
}

