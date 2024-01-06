import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";

export const ErrorMsg = ({ success, error }) => {
  return (
    <div className="flex justify-center">
      {success ? (
        <div className="bg-green-500 p-3 fixed top-12 z-20 text-brightWhite font-medium rounded-b-lg flex items-center">
          <IoCheckmarkDoneCircle className="mr-2 text-lg" />
          {success}
        </div>
      ) : (
        " "
      )}
      {error ? (
        <div className="bg-red-500 p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center">
          <FiAlertTriangle className="mr-2 text-lg" />
          {error}
        </div>
      ) : (
        " "
      )}
    </div>
  );
};
