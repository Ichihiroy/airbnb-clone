const Navigation = () => (
  <nav className="hidden md:flex items-center justify-center space-x-8">
    <div className="flex items-center space-x-2">
      <span className="font-medium">Homes</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="font-medium">Experiences</span>
      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
        NEW
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="font-medium">Services</span>
      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
        NEW
      </span>
    </div>
  </nav>
);
export default Navigation;
