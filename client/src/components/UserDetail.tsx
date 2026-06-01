import { User } from "../types";

interface UserDetailProps {
  user?: User;
  loading: boolean;
  error?: Error;
}

export default function UserDetail({ user, loading, error }: UserDetailProps) {
  return (
    <section className="panel profile-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-label">Selected user</p>
          <h2>{user ? user.name : "Pick a user"}</h2>
        </div>
      </div>

      {loading && <p className="status-line">Loading selected profile…</p>}
      {error && <p className="status-error">{error.message}</p>}

      {user ? (
        <div className="profile-card">
          <div className="profile-value">
            <span>Age</span>
            <strong>{user.age}</strong>
          </div>
          <div className="profile-value">
            <span>Marital status</span>
            <strong>{user.isMarried ? "Married" : "Single"}</strong>
          </div>
          <div className="profile-meta">
            <span>User ID</span>
            <strong>{user.id}</strong>
          </div>
        </div>
      ) : (
        <p className="status-line">
          Select a user from the list to see details here.
        </p>
      )}
    </section>
  );
}
