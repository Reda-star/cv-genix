import Navbar from "./components/Navbar";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import Botassistant from "/src/assets/botassistant.jpg";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import LoadingPage from "./components/LoadingPage";


const Landing = () => {

  const { isLoading, user, isAuthenticated } = useKindeAuth();

  if (isLoading) {
		return <LoadingPage/>;
	}
  return (
    <>
      <Navbar />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt="sparky"
                src={Botassistant}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24 ">
            {isAuthenticated ? (
                  <>
                    <h1 className="text-3xl font-bold sm:text-4xl mb-3">Hi, {user.family_name}</h1> 
              <h2 className="text-2xl font-bold sm:text-2xl">
                <Typewriter
                  options={{
                    strings: [
                      "Create a Stunning CV with Ease",
                      "Transform your Career with AI",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h2>
                  </>
                ) : (
                  <>
              <h2 className="text-3xl font-bold sm:text-3xl">
                <Typewriter
                  options={{
                    strings: [
                      "Create a Stunning CV with Ease",
                      "Transform your Career with AI",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h2>
                  </>
                )}

              <p className="mt-4 text-gray-600 ">
                CVGenix is the ultimate tool for effortlessly creating a
                polished and professional CV. With our intuitive interface and
                customizable templates, you can showcase your skills and
                experience in just a few simple steps.
              </p>

              <Link to="/parser">
                <button
                  className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 "
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Landing;
