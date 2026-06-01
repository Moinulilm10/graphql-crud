import { useEffect, useState } from "react";
import "./App.css";
import UserDetail from "./components/UserDetail";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { useUsers } from "./hooks/useUsers";
import { NewUser } from "./types";

function App() {
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    age: "",
    isMarried: false,
  });
  const [selectedUserId, setSelectedUserId] = useState("1");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { usersQuery, userByIdQuery, createUser, createMeta } =
    useUsers(selectedUserId);

  useEffect(() => {
    if (!notification) return;

    const timer = window.setTimeout(() => setNotification(null), 3500);
    return () => window.clearTimeout(timer);
  }, [notification]);

  const handleFormChange = (field: keyof NewUser, value: string | boolean) => {
    setNewUser((current) => ({ ...current, [field]: value }));
  };

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
          error instanceof Error ? error.message : "Unable to create user.",
      });
    }
  };

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div>
          <span className="eyebrow">GraphQL CRUD</span>
          <h1>Manage users with Apollo and React</h1>
          <p>
            A polished interface for creating users, browsing the directory, and
            inspecting details across devices.
          </p>
        </div>
      </header>

      <main className="content-grid">
        <UserForm
          newUser={newUser}
          loading={createMeta.loading}
          onChange={handleFormChange}
          onSubmit={handleCreateUser}
        />

        <UserDetail
          user={userByIdQuery.data?.getUserById}
          loading={userByIdQuery.loading}
          error={userByIdQuery.error}
        />

        <UserList
          users={usersQuery.data?.getUsers}
          selectedUserId={selectedUserId}
          onSelect={setSelectedUserId}
          loading={usersQuery.loading}
          error={usersQuery.error}
        />
      </main>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default App;
