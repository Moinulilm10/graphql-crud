import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
import { GET_USER_BY_ID, GET_USERS } from "../graphql/queries";

export function useUsers(selectedUserId: string) {
  const usersQuery = useQuery(GET_USERS);

  const userByIdQuery = useQuery(GET_USER_BY_ID, {
    variables: { id: selectedUserId },
    skip: !selectedUserId,
  });

  const [createUser, createMeta] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    awaitRefetchQueries: true,
  });

  return {
    usersQuery,
    userByIdQuery,
    createUser,
    createMeta,
  };
}
