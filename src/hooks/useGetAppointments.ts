import { useQuery } from '@apollo/client';
import { GET_CURRENT_APPOINTMENTS, GET_APPOINTMENTS } from '@/graphql/queries';

// types
import { AppointmentType, PaginatedAppointmentType } from "@/types";

// export function useGetAppointments (filter?: object) {
//   return useQuery(GET_APPOINTMENTS, {
//     variables: { filter },
//   });
// }

export function useGetAppointments (filter?: object, page?: number, limit?: number) {
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

