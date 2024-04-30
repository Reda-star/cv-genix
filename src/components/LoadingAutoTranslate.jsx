/* eslint-disable react/prop-types */
import { hourglass } from "ldrs";
import { leapfrog } from "ldrs";

const LoadingAutoTranslate = () => {
  hourglass.register();
  leapfrog.register();

  return (
    <>
        <button className="flex gap-x-2 rounded-lg bg-indigo-500 pl-3 w-40 py-3 text-sm font-medium text-white transition duration-300 ease-in-out transform hover:shadow-2xl">
          <l-leapfrog size="25" speed="2" color="white"></l-leapfrog>
          <span className="">Auto Translate</span>
        </button>
    </>
  );
}; 

export default LoadingAutoTranslate;
