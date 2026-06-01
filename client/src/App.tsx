import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
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

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    isMarried: false,
  });
  const [selectedUserId, setSelectedUserId] = useState("1");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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
    variables: { id: selectedUserId },
    skip: !selectedUserId,
  });

  const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  useEffect(() => {
    const timer = setTimeout(() => setNotification(null), 3500);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.age) {
      setNotification({
        type: "error",
        message: "Please enter a valid name and age.",
      });
      return;
    }

    try {
      await createUser({
        variables: {
          name: newUser.name.trim(),
          age: Number(newUser.age),
          isMarried: newUser.isMarried,
        },
      });

      setNotification({
        type: "success",
        message: "User created successfully.",
      });
      setNewUser({ name: "", age: "", isMarried: false });
    } catch (error) {
      setNotification({
        type: "error",
        message:
          error instanceof Error ? error.message : "Could not create user.",
      });
    }
  };

  const selectedUser = getUserByIdData?.getUserById;

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div>
          <span className="eyebrow">GraphQL CRUD</span>
          <h1>Manage users with Apollo and React</h1>
          <p>
            A lightweight dashboard for adding users, browsing the directory,
            and inspecting user details in one responsive interface.
          </p>
        </div>
      </header>

      <main className="content-grid">
        <section className="panel form-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">Create Profile</p>
              <h2>Add a new user</h2>
            </div>
            <span className="panel-badge">Fast</span>
          </div>

          <div className="form-row">
            <label>
              Name
              <input
                value={newUser.name}
                type="text"
                placeholder="Jane Doe"
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </label>

            <label>
              Age
              <input
                value={newUser.age}
                type="number"
                min="0"
                placeholder="28"
                onChange={(e) =>
                  setNewUser({ ...newUser, age: e.target.value })
                }
              />
            </label>
          </div>

          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={newUser.isMarried}
              onChange={(e) =>
                setNewUser({ ...newUser, isMarried: e.target.checked })
              }
            />
            <span>Married</span>
          </label>

          <button
            className="primary-button"
            onClick={handleCreateUser}
            disabled={creatingUser}
          >
            {creatingUser ? "Saving…" : "Create user"}
          </button>

          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
        </section>

        <section className="panel profile-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">Selected user</p>
              <h2>{selectedUser ? selectedUser.name : "Pick a user"}</h2>
            </div>
          </div>

          {getUserByIdLoading && (
            <p className="status-line">Loading selected profile…</p>
          )}
          {getUserByIdError && (
            <p className="status-error">{getUserByIdError.message}</p>
          )}

          {selectedUser ? (
            <div className="profile-card">
              <div className="profile-value">
                <span>Age</span>
                <strong>{selectedUser.age}</strong>
              </div>
              <div className="profile-value">
                <span>Marital status</span>
                <strong>{selectedUser.isMarried ? "Married" : "Single"}</strong>
              </div>
              <div className="profile-meta">
                <span>User ID</span>
                <strong>{selectedUser.id}</strong>
              </div>
            </div>
          ) : (
            <p className="status-line">
              Select a user from the list to see details here.
            </p>
          )}
        </section>

        <section className="panel list-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">User directory</p>
              <h2>All users</h2>
            </div>
          </div>

          {getUsersLoading && <p className="status-line">Loading users…</p>}
          {getUsersError && (
            <p className="status-error">{getUsersError.message}</p>
          )}

          <div className="user-list">
            {getUsersData?.getUsers?.map((user) => {
              const isSelected = user.id === selectedUserId;
              return (
                <button
                  key={user.id}
                  className={`user-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <div>
                    <strong>{user.name}</strong>
                    <span>{user.age} years old</span>
                  </div>
                  <span className="user-status">
                    {user.isMarried ? "Married" : "Single"}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
