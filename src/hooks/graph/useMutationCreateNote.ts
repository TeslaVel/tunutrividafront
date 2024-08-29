import { useMutation } from "@apollo/client";
import { NOTE_MUTATION } from '@/graphql/queries';

export const useMutationCreateNote = () => {
  const [ CreateNote, { data, loading, error, reset }] = useMutation(NOTE_MUTATION);

  return { CreateNote, data, loading, error, reset };
}