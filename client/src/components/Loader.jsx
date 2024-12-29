
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex flex-col items-center space-y-6">
        <FaSpinner className="text-white text-6xl animate-spin" />
        <h1 className="text-white text-2xl font-semibold">
          Loading, please wait...
        </h1>
      </div>
    </div>
  );
};

export default Loader;
