import { gql } from '@apollo/client'

// export const GET_PHOTOS = gql`
//   query getPhotos($categoryId: ID) {
//     photos(categoryId: $categoryId) {
//       id
//       categoryId
//       src
//       likes
//       userId
//       liked
//     }
//   }
// `

// MUTATIONS
export const CONTACT_US_MUTATION = gql`
  mutation CreateContactUs(
    $email: String!,
    $first_name: String,
    $last_name: String,
    $message: String!
  ) {
    createContactUs(input: {
       email: $email,
       firstName: $first_name,
       lastName: $last_name,
       message: $message
    }) {
      firstName
      lastName
      email
      message
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Auth(
  $email: String!,
  $password: String!
  ) {
    createAuth(input: {
       email: $email,
       password: $password
    }) {
      token
    }
  }
`;
