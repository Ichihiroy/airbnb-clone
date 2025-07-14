import Navigation from "./Navigation";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";

const Header = () => (
  <header className="bg-zinc-100 border-b border-gray-200 sticky top-0 z-50 hidden lg:block">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center">
          <svg width="30" height="32" fill="#FF385C" className="mr-2">
            <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.68-9.46-7.41-14.03l-.01-.01c-1.13-1.9-2.28-3.78-3.64-5.54-.84-1.11-1.74-2.19-2.64-3.24l-.58-.63c-.28-.29-.62-.42-1.03-.42s-.74.13-1.03.42l-.58.63c-.9 1.05-1.8 2.13-2.64 3.24-1.36 1.76-2.51 3.64-3.64 5.54l-.01.01c-2.73 4.57-5.21 9.23-7.41 14.03l-.03.03c-.25.56-.49 1.13-.74 1.67-.16.35-.31.76-.47 1.15C.73 23.65.5 24.61.5 25.42c0 3.25 2.58 5.83 5.83 5.83h16.34c3.25 0 5.83-2.58 5.83-5.83 0-.81-.23-1.77-.26-2.74z" />
          </svg>
          <span className="text-2xl font-bold text-red-500">airbnb</span>
        </div>

        <Navigation />
        <UserMenu />
      </div>
      <div className="pb-4 lg:hidden">
        <SearchBar isMobile={true} />
      </div>
    </div>
    <div className="hidden lg:block max-w-4xl mx-auto px-4 pb-4">
      <SearchBar />
    </div>
  </header>
);
export default Header;
