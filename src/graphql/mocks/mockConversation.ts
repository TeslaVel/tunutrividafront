export const mockConversation = {
  data: {
    conversation: {
      id: "1",
      dietitian: {
        id: "2",
        fullName: "Dr. Mary Watson",
        initials: "M.W",
        __typename: "User",
      },
      patient: {
        id: "13",
        fullName: "John Doe",
        initials: "J.D",
        __typename: "User",
      },
      notes: [
        {
          id: "10",
          message: "Hello John",
          createdAt: "2024-07-03 10:10 am",
          conversationId: "1",
          user: {
            id: "2",
            fullName: "Dr. Mary Watson",
            initials: "M.W",
            __typename: "User",
          },
          __typename: "Note",
        },
        {
          id: "11",
          message: "Hello Mary",
          createdAt: "2024-07-03 10:10 am",
          conversationId: "1",
          user: {
            id: "13",
            fullName: "John Doe",
            initials: "J.D",
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
