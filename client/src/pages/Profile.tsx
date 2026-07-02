import { useUserStore } from "../store/userStore";
import { Link } from "react-router-dom";
import { useState } from "react";

const Profile = () => {

  const { user, logout } = useUserStore();
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    return localStorage.getItem("profileImage");
  });

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 min-h-[80vh]">
        <p className="text-3xl">No user logged in!</p>
        <Link to={"/login"} className="p-1 text-xl border-b ">Login</Link>
        <p>or</p>
        <Link to={"/register"} className="p-1 text-xl border-b">Create account</Link>
      </div>
    )
  }
  const firstLetter = user.name.charAt(0).toUpperCase();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const image = reader.result as string;
      setProfileImage(image);
      localStorage.setItem("profileImage", image);
    }
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3 p-3 min-h-[70vh]">
      <div className="flex justify-around items-center border-2 border-gray-500 rounded-md w-full p-2">
        <label className="flex justify-center items-center text-3xl w-full max-w-24 min-h-24 bg-amber-400 rounded-full cursor-pointer overflow-hidden">
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange} />
          {profileImage ? (
            <img src={profileImage} alt="profileImg" className="min-h-24 min-w-24 object-cover" />
          ) : (
            firstLetter
          )}
        </label>
        <div className="flex flex-col justify-center items-start">
          <p className="text-xl border-b">{user.name}</p>
          <p className="text-xl border-b">{user.email}</p>
          <p className="text-xl border-b">{user.city}</p>
        </div>
      </div>
      <button onClick={logout} className="text-red-400 border-2 border-red-500 rounded-md p-1 w-full max-w-28 hover:bg-red-500 hover:text-white">Logout</button>
    </div>
  );
}

export default Profile;