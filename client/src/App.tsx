import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./App.css";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const GET_USERS_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

function App() {
  const {
    loading: getUsersLoading,
    error: getUsersError,
    data: getUsersData,
  } = useQuery(GET_USERS);
  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USERS_BY_ID, {
    variables: { id: "1" },
  });

  return (
    <>
      <div>
        <h1>Chosen User: </h1>
        {getUserByIdLoading && <p>Loading...</p>}
        {getUserByIdError && <p>Error: {getUserByIdError.message}</p>}
        {getUserByIdData && (
          <div>
            <p>Name: {getUserByIdData.getUserById.name}</p>
            <p>Age: {getUserByIdData.getUserById.age}</p>
            <p>
              Is Married: {getUserByIdData.getUserById.isMarried ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>

      <div>
        <h1>users</h1>
        {getUsersLoading && <p>Loading...</p>}
        {getUsersError && <p>Error: {error.message}</p>}
        {getUsersData && (
          <ul>
            {getUsersData.getUsers.map((user) => (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <p>Is Married: {user.isMarried ? "Yes" : "No"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
