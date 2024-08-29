// mockEntries.js

export const mockEntries = {
  data: {
    entries: [
      {
        id: "3",
        description: "Hola esta es una prueba",
        entryType: "WorkoutEntry",
        imageUrl: null,
        createdAt: "2024-07-03 10:10 am",
        user: {
          id: "13",
          fullName: "John Doe",
          initials: "J.D",
          __typename: "User"
        },
        comments: [],
        __typename: "Entry"
      },
      {
        id: "1",
        description: "Comiendo sano ahora yay!",
        entryType: "FoodEntry",
        imageUrl: null,
        createdAt: "2024-06-18 09:09 am",
        user: {
          id: "13",
          fullName: "John Doe",
          initials: "J.D",
          __typename: "User"
        },
        comments: [
          {
            id: "1",
            message: "🎉",
            createdAt: "Jun 19 at 09:09 am",
            user: {
              id: "2",
              fullName: "Dr Mary Watson",
              initials: "M.W",
              __typename: "User"
            },
            __typename: "Comment"
          }
        ],
        __typename: "Entry"
      }
    ]
  }
};

export function mockUseGetUserEntries(order?: string) {
  // Aquí puedes implementar la lógica de ordenamiento si es necesario
  let orderedEntries = [...mockEntries.data.entries];
  if (order === 'DESC') {
    orderedEntries.reverse();
  }

  return {
    loading: false,
    error: null,
    data: { entries: orderedEntries },
    refetch: () => Promise.resolve({ data: { entries: orderedEntries } })
  };
}