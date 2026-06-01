import { NewUser } from "../types";

interface UserFormProps {
  newUser: NewUser;
  loading: boolean;
  onChange: (field: keyof NewUser, value: string | boolean) => void;
  onSubmit: () => void;
}

export default function UserForm({
  newUser,
  loading,
  onChange,
  onSubmit,
}: UserFormProps) {
  return (
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
            onChange={(event) => onChange("name", event.target.value)}
          />
        </label>

        <label>
          Age
          <input
            value={newUser.age}
            type="number"
            min="0"
            placeholder="28"
            onChange={(event) => onChange("age", event.target.value)}
          />
        </label>
      </div>

      <label className="checkbox-field">
        <input
          type="checkbox"
          checked={newUser.isMarried}
          onChange={(event) => onChange("isMarried", event.target.checked)}
        />
        <span>Married</span>
      </label>

      <button className="primary-button" onClick={onSubmit} disabled={loading}>
        {loading ? "Saving…" : "Create user"}
      </button>
    </section>
  );
}
