import { Link } from "react-router";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="flex flex-col items-center mt-4 h-[100vh] px-4">
      <div className=" flex-col justify-center items-center gap-5 hidden md:flex">
        <Link to="/wishlist">
          <div className="text-sm rounded-full px-3 py-1  hover:bg-[#FF385C] hover:text-white border border-[#FF385C] text-[#FF385C]">
            My Wishlist
          </div>
        </Link>
      </div>
      <div className="w-full max-w-md flex-col flex items-center justify-center bg-white p-6 rounded-xl ">
        <div className="flex flex-col items-center gap-8">
          <p>
            Logged in as {user.fullname} ({user.email})
          </p>
          <button>
            <Link
              to="/"
              className="bg-[#FF385C] rounded-full text-md px-8 py-3 text-white w-full hover:bg-[#d03d58] transition duration-300"
            >
              Logout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
