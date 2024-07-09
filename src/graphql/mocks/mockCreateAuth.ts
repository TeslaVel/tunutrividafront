export const mockCreateAuth = {
  data: {
    createAuth: {
      id: "13",
      token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxM30.BmexhSjdZLSW06Yj0Z_BPIsKGQ_TNMij9SbgrxNUMEM",
      email: "user@example.com",
      gender: "male",
      firstName: "John",
      lastName: "Doe",
      dietitianId: "2",
      height: "1.58",
      weight: "78.0",
      imc: "31.2",
      age: "36",
      __typename: "Auth",
    },
  },
};

export const mockNullResponse = {
  data: {
    createAuth: {
      id: null,
      token: null,
      email: null,
      gender: null,
      firstName: null,
      lastName: null,
      dietitianId: null,
      height: null,
      weight: null,
      imc: null,
      age: null,
      __typename: "Auth",
    },
  },
};
