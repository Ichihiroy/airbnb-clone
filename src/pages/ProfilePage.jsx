const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Your Profile
        </h1>

        <div className="flex flex-col items-center gap-4">
          <img
            src={user.profileImage}
            className="w-24 h-24 rounded-full border-2  border-pink-500 object-cover"
          />
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-gray-900">{user.fullname}</h2>
            <p className="text-sm text-gray-500">@{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
