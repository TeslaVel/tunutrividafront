import { useMutation } from "@apollo/client";
import { COMMENT_MUTATION } from '@/graphql/queries';

export const useMutationCreateComment = () => {
  const [ CreateComment, { data, loading, error, reset }] = useMutation(COMMENT_MUTATION);

  return { CreateComment, data, loading, error, reset };
}