export function Profile({ user }) {
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, undefined, "  ")}</pre>
    </div>
  );
}
