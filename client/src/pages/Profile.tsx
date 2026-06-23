import { useUser } from "../context/UserContext";

const Profile = () => {

  const { user, logout } = useUser();

  if (!user) {
    return <p>No user logged in</p>
  }

  return (
    <div>
      <p>Profile</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Location: {user?.city}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;