import { useQuery } from '@apollo/client';
import { GET_CONVERSATION } from '@/graphql/queries';

export function UseGetConversation () {
  return useQuery(GET_CONVERSATION);
}
