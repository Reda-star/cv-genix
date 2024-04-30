import "ldrs/bouncy";

const LoadingAIButton = () => {
  return (
    <>
      <button className="flex gap-x-2 mt-2 bg-gradient-to-r from-pink-500 to-purple-700 text-white font-semibold py-2 px-4 rounded-3xl ">
        <l-bouncy size="30" speed="1.75" color="white"></l-bouncy>
        Generating
      </button>
    </>
  );
};

export default LoadingAIButton;


