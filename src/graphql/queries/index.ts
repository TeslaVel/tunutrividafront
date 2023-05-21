import { gql } from '@apollo/client'

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
      id
    }
  }
`;

export const COMMENT_MUTATION = gql`
  mutation CreateComment(
    $entry_id: String!,
    $message: String!
  ) {
    createComment(input: {
       entryId: $entry_id,
       message: $message
    }) {
      id
      message
      createdAt
      user {
        id
        fullName
        initials
      }
    }
  }
`;

export const ENTRY_MUTATION = gql`
  mutation CreateEntry(
    $entry_type: String!,
    $description: String!
  ) {
    createEntry(input: {
       entryType: $entry_type,
       description: $description
    }) {
      id
      description
      createdAt
      user {
        id
        fullName
        initials
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation AuthMutation(
  $email: String!,
  $password: String!
  ) {
    createAuth(input: {
       email: $email,
       password: $password
    }) {
      id
      token
      email
      firstName
      lastName
      dietitianId
    }
  }
`;

// Gets

export const GET_ENTRIES = gql`
  query entries {
    entries {
      id
      description
      entryType
      imageUrl
      createdAt
      user {
        id
        fullName
        initials
      }
      comments {
        id
        message
        createdAt
        user {
        id
        fullName
        initials
        }
      }
    }
  }
`