import { useQuery } from '@apollo/client';
import { GET_CURRENT_APPOINTMENTS, GET_APPOINTMENTS } from '@/graphql/queries';

export function useGetAppointments (filter?: object) {
  return useQuery(GET_APPOINTMENTS, {
    variables: { filter },
  });
}

export function useGetCurrentAppointments () {
  return useQuery(GET_CURRENT_APPOINTMENTS);
}

