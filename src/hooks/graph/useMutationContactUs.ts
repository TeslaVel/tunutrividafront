import { useMutation } from "@apollo/client";
import { CONTACT_US_MUTATION } from '@/graphql/queries';

export const useMutationContactUs = () => {
  const [ CreateContactUs, { data, loading, error, reset }] = useMutation(CONTACT_US_MUTATION);

  return { CreateContactUs, data, loading, error, reset };
}