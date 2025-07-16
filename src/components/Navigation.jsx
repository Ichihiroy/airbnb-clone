const Navigation = () => (
  <nav className="flex items-center justify-center gap-10 lg:ms-16">
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 border-b-3 py-2  border-gray-800 ">
      <span className="text-3xl">🏠</span>
      <span className="font-medium md:text-md">Homes</span>
    </div>
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <span className="text-3xl">🎈</span>
      <span className="font-medium  md:text-md">Experiences</span>
      {/* <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-xl">
        NEW
      </span> */}
    </div>
    <div className="flex items-center gap-2 flex-col sm:flex-row">
      <span className="text-3xl">🔔</span>
      <span className="font-medium  md:text-md">Services</span>
      {/* <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-xl">
        NEW
      </span> */}
    </div>
  </nav>
);
export default Navigation;
