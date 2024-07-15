import { gql } from '@apollo/client'
import { PROFILE_FIELDS, SHORT_USER_FIELDS, AUTH_USER_FIELDS, DIETITIAN_FIELDS } from './fragments';

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
       lastNamae: $last_name,
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
        ...ShortUserFields
      }
    }
  }
  ${SHORT_USER_FIELDS}
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
        ...ShortUserFields
      }
    }
  }
  ${SHORT_USER_FIELDS}
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
      createdAt
      dietitian {
        ...DietitianFields
      }
      patient {
        ...ShortUserFields
      }
    }
  }
  ${SHORT_USER_FIELDS}
  ${DIETITIAN_FIELDS}
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
        ...ShortUserFields
      }
    }
  }
  ${SHORT_USER_FIELDS}
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
      ...AuthUserFields
    }
  }
  ${AUTH_USER_FIELDS}
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
        ...ShortUserFields
      }
      comments {
        id
        message
        createdAt
        user {
          ...ShortUserFields
        }
      }
    }
  }
  ${SHORT_USER_FIELDS}
`

export const GET_CONVERSATION = gql`
  query conversation {
    conversation {
      id
      dietitian {
        ...DietitianFields
      }
      patient {
        ...ShortUserFields
      }
      notes {
        id
        message
        createdAt
        conversationId
        user {
          ...ShortUserFields
        }
      }
    }
  }
  ${SHORT_USER_FIELDS}
  ${DIETITIAN_FIELDS}
`

export const GET_USER_PROFILE = gql`
  query profile {
    profile {
      ...ProfileFields
    }
  }
  ${PROFILE_FIELDS}
`;

export const GET_APPOINTMENTS = gql`
  query appointments($filter: FilterInput, $page: Int, $limit: Int) {
    appointments(filter: $filter, page: $page, limit: $limit) {
      paginated {
        id
        title
        createdAt
        timeEnd
        timeStart
        startDate
        appointmentType
        status
        dietitian {
          ...DietitianFields
        }
      }
      page
      limit
      nextPage
      prevPage
      totalPages
      currentPage
    }
}
${DIETITIAN_FIELDS}
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
        ...DietitianFields
      }
    }
}
${DIETITIAN_FIELDS}
`

export const GET_SESSIONS = gql`
  query getSessions($page: Int, $limit: Int) {
    sessions(page: $page, limit: $limit) {
      paginated {
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
          diet {
            id
            name
            description
            dietMealWeeks {
              id
              dietId
              dayOfWeek
              createdAt

              dietMealTimes {
                id
                dietMealWeekId
                mealTime
                createdAt

                dietIngredient {
                  id
                  dietMealTimeId
                  mealId
                  instructions
                  createdAt

                  meal {
                    id
                    name
                  }
                }
              }
            }
          }
      }
      page
      limit
      nextPage
      prevPage
      totalPages
      currentPage
    }
  }
`

export const GET_SESSIONS_DATA_CHART = gql`
  query sessionDataChart {
    sessionDataChart {
      days
      imc
      weight
      bodyGrease
      muscleMass
    }
  }
`
