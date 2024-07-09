import { AppointmentType, PaginatedAppointmentType } from '@/types'

export const AppPaginated = {
  paginated: [
    {
      id: "39",
      title: "(Peter P)",
      createdAt: "2024-07-03 09:09 am",
      timeEnd: "2000-01-01 09:09 am",
      timeStart: "2000-01-01 08:08 am",
      startDate: "2024-07-03 12:00 am",
      appointmentType: "in_person",
      status: 'ocurred',
      dietitian: {
        id: "2",
        firstName: "Dr Mary",
        lastName: "Watson",
        fullName: "Dr Mary Watson",
        initials: "M.W",
        __typename: "User"
      },
      __typename: "Appointment"
    },
    {
      id: "40",
      title: "(Peter P)",
      createdAt: "2024-07-03 09:09 am",
      timeEnd: "2000-01-01 09:09 am",
      timeStart: "2000-01-01 08:08 am",
      startDate: "2024-07-04 12:00 am",
      appointmentType: "in_person",
      status: 'pending',
      dietitian: {
        id: "2",
        firstName: "Dr Mary",
        lastName: "Watson",
        fullName: "Dr Mary Watson",
        initials: "M.W",
        __typename: "User"
      },
      __typename: "Appointment"
    },
    {
      id: "41",
      title: "(Peter P)",
      createdAt: "2024-07-03 09:09 am",
      timeEnd: "2000-01-01 09:09 am",
      timeStart: "2000-01-01 09:09 am",
      startDate: "2024-07-05 12:00 am",
      appointmentType: "in_person",
      status: 'cancelled',
      dietitian: {
        id: "2",
        firstName: "Dr Mary",
        lastName: "Watson",
        fullName: "Dr Mary Watson",
        initials: "M.W",
        __typename: "User"
      },
      __typename: "Appointment"
    },
    {
      id: "43",
      title: "(Juan P)",
      createdAt: "2024-07-07 11:15 am",
      timeEnd: "2000-01-01 15:30 pm",
      timeStart: "2000-01-01 14:30 pm",
      startDate: "2024-07-07 12:00 am",
      appointmentType: "in_person",
      status: 'ocurred',
      dietitian: {
        id: "4",
        firstName: "Dra Sophie",
        lastName: "Heinz",
        fullName: "Dra Sophie Heinz",
        initials: "S.H",
        __typename: "User"
      },
      __typename: "Appointment"
    },
    {
      id: "44",
      title: "(Ana R)",
      createdAt: "2024-07-08 08:45 am",
      timeEnd: "2000-01-01 10:00 am",
      timeStart: "2000-01-01 09:00 am",
      startDate: "2024-07-08 12:00 am",
      appointmentType: "phone_call",
      status: 'pending',
      dietitian: {
        id: "2",
        firstName: "Dr Mary",
        lastName: "Watson",
        fullName: "Dr Mary Watson",
        initials: "M.W",
        __typename: "User"
      },
      __typename: "Appointment"
    },
    {
      id: "45",
      title: "(Pedro S)",
      createdAt: "2024-07-09 13:20 pm",
      timeEnd: "2000-01-01 17:00 pm",
      timeStart: "2000-01-01 16:00 pm",
      startDate: "2024-07-09 12:00 am",
      appointmentType: "in_person",
      status: 'cancelled',
      dietitian: {
        id: "3",
        firstName: "Dr Morgan",
        lastName: "Mendez",
        fullName: "Dr Morgan Freeman",
        initials: "M.F",
        __typename: "User"
      },
      __typename: "Appointment"
    },
    {
      id: "46",
      title: "(Lucia M)",
      createdAt: "2024-07-10 09:30 am",
      timeEnd: "2000-01-01 12:30 pm",
      timeStart: "2000-01-01 11:30 am",
      startDate: "2024-07-10 12:00 am",
      appointmentType: "phone_call",
      status: 'pending',
      dietitian: {
        id: "4",
        firstName: "Dra Sophie",
        lastName: "Heinz",
        fullName: "Dra Sophie Heinz",
        initials: "S.H",
        __typename: "User"
      },
      __typename: "Appointment"
    }
  ],
  __typename: "PaginatedAppointment"
}
export const mockAppointments = {
  data: {
    appointments: AppPaginated
  }
};

export function mockUseGetAppointments(filter?: { status: AppointmentType['status'] }, page: number = 1, limit: number = 7) {
  // Filtrar las citas
  let filteredAppointments: AppointmentType[] = mockAppointments.data.appointments.paginated;

  if (filter && filter.status) {
    filteredAppointments = filteredAppointments.filter(apt => apt.status === filter.status);
  }

  // Calcular la paginación
  const totalItems = filteredAppointments.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAppointments: AppointmentType[] = filteredAppointments.slice(startIndex, endIndex);

  return {
    loading: false,
    appointments: paginatedAppointments,
    pagination: {
      totalPages,
      currentPage: page,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    },
    refetch: () => Promise.resolve({
      data: {
        appointments: {
          paginated: paginatedAppointments,
          page,
          limit,
          nextPage: page < totalPages ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
          totalPages,
          currentPage: page,
          __typename: "PaginatedAppointment"
        }
      }
    })
  };
}