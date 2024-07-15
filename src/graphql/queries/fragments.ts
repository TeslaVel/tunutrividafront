import { gql } from '@apollo/client';


export const SHORT_USER_FIELDS = gql`
  fragment ShortUserFields on User {
    id
    firstName
    lastName
    fullName
    initials
  }
`;

export const DIETITIAN_FIELDS = gql`
  fragment DietitianFields on Dietitian {
    id
    firstName
    lastName
    fullName
    initials
  }
`;

export const AUTH_USER_FIELDS = gql`
  fragment AuthUserFields on Auth {
    id
    email
    token
    firstName
    lastName
    fullName
    initials
    imageUrl
    dietitianId
    height
    weight
    imc
    age
    gender
  }
`;

export const PROFILE_FIELDS = gql`
  fragment ProfileFields on Profile {
    id
    firstName
    lastName
    fullName
    initials
    dietitianId
    email
    gender
    imageUrl
    height
    weight
    imc
    age
  }
`;



export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    id
    message
    createdAt
    user {
      ...ShortUserFields
    }
  }
  ${SHORT_USER_FIELDS}
`;

export const ENTRY_FIELDS = gql`
  fragment EntryFields on EntryType {
    id
    description
    createdAt
    user {
      ...ShortUserFields
    }
  }
  ${SHORT_USER_FIELDS}
`;

