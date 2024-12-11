import { CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 shadow mt-4 mb-14 mx-4 sticky top-0 rounded-full flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
      <div className="">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <CheckSquare className="w-12 h-12 text-indigo-600" />
            <h1 className="ml-2 text-3xl font-bold text-white">
              Tick<span className="text-indigo-500">r</span>
            </h1>
          </Link>
        </div>
      </div>
      <Link to="/settings" className="text-white">
        Settings
      </Link>
    </header>
  );
};

export default Header;
