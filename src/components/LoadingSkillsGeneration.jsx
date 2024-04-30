import { quantum } from 'ldrs'

const LoadingSkillsGeneration = () => {

    quantum.register()
  return (
    <>
      <button className="flex gap-x-2 mt-2 bg-gradient-to-r from-[#4E65FF] to-[#6198a0] text-white font-semibold py-2 px-4 rounded-3xl">
        <l-quantum size="25" speed="1.5" color="white"></l-quantum>
        Generating
      </button>
    </>
  );
};

export default LoadingSkillsGeneration;


