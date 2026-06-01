import { User } from "../types";

interface UserListProps {
  users?: User[];
  selectedUserId: string;
  onSelect: (id: string) => void;
  loading: boolean;
  error?: Error;
}

export default function UserList({
  users,
  selectedUserId,
  onSelect,
  loading,
  error,
}: UserListProps) {
  return (
    <section className="panel list-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-label">User directory</p>
          <h2>All users</h2>
        </div>
      </div>

      {loading && <p className="status-line">Loading users…</p>}
      {error && <p className="status-error">{error.message}</p>}

      <div className="user-list">
        {users?.map((user) => (
          <button
            key={user.id}
            className={`user-card ${user.id === selectedUserId ? "selected" : ""}`}
            onClick={() => onSelect(user.id)}
          >
            <div>
              <strong>{user.name}</strong>
              <span>{user.age} years old</span>
            </div>
            <span className="user-status">
              {user.isMarried ? "Married" : "Single"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
