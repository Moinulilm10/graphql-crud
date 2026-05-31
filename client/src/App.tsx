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

function App() {
  const { data, error, loading } = useQuery(GET_USERS);

  return (
    <>
      <h1>users</h1>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <ul>
            {data.getUsers.map((user) => (
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
