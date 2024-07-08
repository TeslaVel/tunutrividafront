export const mockConversation = {
  data: {
    conversation: {
      id: "1",
      dietitian: {
        id: "2",
        fullName: "Lic Laura Berrios",
        initials: "L.B",
        __typename: "User",
      },
      patient: {
        id: "13",
        fullName: "Francis Berrios",
        initials: "F.B",
        __typename: "User",
      },
      notes: [
        {
          id: "10",
          message: "hola francis",
          createdAt: "2024-07-03 10:10 am",
          conversationId: "1",
          user: {
            id: "2",
            fullName: "Lic Laura Berrios",
            initials: "L.B",
            __typename: "User",
          },
          __typename: "Note",
        },
        {
          id: "11",
          message: "hola Licen",
          createdAt: "2024-07-03 10:10 am",
          conversationId: "1",
          user: {
            id: "13",
            fullName: "Francis Berrios",
            initials: "F.B",
            __typename: "User",
          },
          __typename: "Note",
        },
      ],
      __typename: "Conversation",
    },
  },
};

export function mockUseGetConversation() {
  return {
    loading: false,
    data: mockConversation.data,
    refetch: () => Promise.resolve({ data: mockConversation.data }),
  };
}
