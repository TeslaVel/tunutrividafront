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

export const NOTE_MUTATION = gql`
  mutation CreateNote(
    $conversation_id: String!,
    $message: String!
  ) {
    createNote(input: {
       conversationId: $conversation_id,
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

export const CONVERSATION_MUTATION = gql`
  mutation CreateConversation(
    $dietitian_id: String!
    $message: String
  ) {
    createConversation(input: {
       dietitianId: $dietitian_id,
       message: $message
    }) {
      id
    }
  }
`;


export const ENTRY_MUTATION = gql`
  mutation CreateEntry(
    $entry_type: String!,
    $description: String!,
    $image: Upload
  ) {
    createEntry(input: {
      entryType: $entry_type,
      description: $description,
      image: $image
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
      gender
      firstName
      lastName
      dietitianId
      height
      weight
      imc
      age
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation LogoutMuation {
    logout(input: {}) {
      success
    }
  }
`;

// Gets

export const GET_ENTRIES = gql`
  query entries($order: String) {
    entries(order: $order) {
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
export const GET_CONVERSATION = gql`
  query conversation {
    conversation {
      id
      dietitian {
            id
            fullName
            initials
        }
      patient {
            id
            fullName
            initials
        }
      notes {
        id
        message
        createdAt
        conversationId
        user {
          id
          fullName
          initials
        }
      }
    }
  }
`

export const GET_APPOINTMENTS = gql`
  query appointments($filter: FilterInput) {
    appointments(filter: $filter) {
      id
      title
      createdAt
      timeEnd
      timeStart
      startDate
      appointmentType
      status
      dietitian {
          id
          firstName
          lastName
          fullName
          initials
      }
    }
}
`
export const GET_CURRENT_APPOINTMENTS = gql`
  query currentAppointments {
    currentAppointments {
      id
      title
      createdAt
      timeEnd
      timeStart
      startDate
      appointmentType
      status
      dietitian {
          id
          firstName
          lastName
          fullName
          initials
      }
    }
}
`

export const GET_SESSIONS = gql`
  query sessions {
    sessions {
      id
      age
      height
      weight
      waist
      hip
      highAbdomen
      lowAbdomen
      imc
      idealWeight
      bodyGrease
      visceralGrease
      muscleMass
      boneMass
      waterPercentage
      bmr
      metabolicAge
      physicalComplexion
      date
      activityFactor {
          id
          name
          description
      }
    }
  }
`
