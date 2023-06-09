import { useMutation } from "@apollo/client";
import { CONVERSATION_MUTATION } from '@/graphql/queries';

export const useMutationCreateConversation = () => {
  const [ CreateConversation, { data, loading, error, reset }] = useMutation(CONVERSATION_MUTATION);

  return { CreateConversation, data, loading, error, reset };
}