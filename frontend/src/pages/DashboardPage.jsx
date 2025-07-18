import useAuthStore from "../store/authStore";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>This is your protected dashboard.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
