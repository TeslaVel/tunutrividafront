export const mockActionProfile = {
  data: {
    id: "13",
    firstName: "John",
    lastName: "Doe",
    fullName:	"John Doe",
    initials:	"J.D",
    dietitianId: "2",
    token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxM30.BmexhSjdZLSW06Yj0Z_BPIsKGQ_TNMij9SbgrxNUMEM",
    email: "usxer@example.com",
    gender: "male",
    imageUrl:	"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--348c682038b550243fc05b040a4b443e5b1b733b/2_for_-22-490x350-1547226648867.png",
    height: "1.58",
    weight: "78.0",
    imc: "31.2",
    age: "36",
    __typename: "Profile",
  },
};

export function mockActionUserProfile() {
  return {
    message:	"Profile updated",
    user: mockActionProfile.data,
    status:	"ok"
  };
}