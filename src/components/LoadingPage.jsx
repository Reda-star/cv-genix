import "ldrs/tailChase";


const LoadingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <l-tail-chase size="50" speed="1.9" color="navy"></l-tail-chase>
      </div> 
    </>
  );
};

export default LoadingPage;
