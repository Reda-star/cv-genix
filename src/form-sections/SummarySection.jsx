/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchSummaryFromData } from "../utils/summary/proSummaryUtils";
import LoadingAIButton from "../components/LoadingAIButton";

// eslint-disable-next-line react/prop-types
const SummarySection = ({ setSummary, name, title, skills, works }) => {
  const [summaryLocal, setSummaryLocal] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("short");

  let blurTimeout;

  const handleInputChange = (e) => {
    setSummary(e.target.value);
    setSummaryLocal(e.target.value);
    // Show the button when the user starts typing
    setShowButton(true);
  };

  const handleTextAreaFocus = () => {
    // Show the button when the text area is focused

    clearTimeout(blurTimeout);
    // Delay showing the button by one second
    blurTimeout = setTimeout(() => {
      setShowButton(true);
    }, 1000);
  };

  const handleTextAreaBlur = () => {
    // Hide the button when the text area loses focus
    blurTimeout = setTimeout(() => {
      setShowButton(false);
    }, 1000);
  };

  const handleClick = (option) => {
    setSelectedStyle(option);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/parsedresume");
        const { data } = response;

        const fetchedSummary = fetchSummaryFromData(data);
        if (fetchedSummary) {
          setSummaryLocal(fetchedSummary);
          setSummary(fetchedSummary);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [setSummary]);

  
  const generateSummary = async () => {
    setIsLoading(true);
    try {
      const skillsString = skills.map((skillObj) => skillObj.skill).join(", ");

      const worksString = works.map((work) => work.companyName).join(", ");

      const positionString = works.map((work) => work.position).join(", ");

      let prompt = '';
    switch (selectedStyle) {
      case 'short':
        prompt = `In a succinct way, summarize ${name}'s career as a ${title}, highlighting skills in ${skillsString} and experience at ${worksString}. If no skills or name are provided, focus on the job title`;
        break;
      case 'balanced':
        prompt = `Provide a balanced summary of ${name}'s career as a ${title}. Highlight their skills in ${skillsString}, experience at ${worksString}, and their roles as ${positionString}. If no skills or name are provided, focus on the job title and experience.`;
        break;
      case 'creative':
        prompt = `Craft a creative and engaging summary for ${name}, a ${title} wizard, who weaves magic with their skills in ${skillsString}, and has left a mark at ${worksString} in the role of ${positionString}. If no skills or name are provided, create a captivating narrative around the job title.`;
        break;
      default:
        // default case
        break;
    }
      
      console.log(prompt);

      const response = await axios.post("http://localhost:5000/summary", {
        prompt: prompt,
      });
      const { data } = response;

      // Displaying generated summary word by word
      const words = data.summary.split(" ");
      let displayText = "";
      for (let i = 0; i < words.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay as needed
        displayText += words[i] + " ";
        setSummaryLocal(displayText);
        setSummary(displayText);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 flex gap-x-1">
          <svg
            className="fill-current text-blue-700"
            height="30"
            viewBox="0 0 21 21"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(4 3)"
            >
              <path d="m3.5 1.5c-.44119105-.00021714-1.03893772-.0044496-1.99754087-.00501204-.51283429-.00116132-.93645365.3838383-.99544161.88103343l-.00701752.11906336v10.99753785c.00061498.5520447.44795562.9996604 1 1.0006148l10 .0061982c.5128356.0008356.9357441-.3849039.993815-.882204l.006185-.1172316v-11c0-.55228475-.4477152-1-1-1-.8704853-.00042798-1.56475733.00021399-2 0" />
              <path d="m4.5.5h4c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-4c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z" />
              <path d="m2.5 5.5h5" />
              <path d="m2.5 7.5h7" />
              <path d="m2.5 9.5h3" />
              <path d="m2.5 11.5h6" />
            </g>
          </svg>
          Professional Summary
        </h2>

        <textarea
          className="w-full h-24 border border-gray-300 rounded-md resize-y p-2"
          style={{ minHeight: "180px" }}
          value={summaryLocal}
          onFocus={handleTextAreaFocus}
          onBlur={handleTextAreaBlur}
          onChange={handleInputChange}
          placeholder="Enter your professional summary..."
        ></textarea>
        <div className="flex justify-between">
          <div className="flex rounded-2xl border-gray-400 border">
            <button
              type="button"
              className={`font-medium text-sm px-4 py-2 rounded-l-2xl ${
                selectedStyle === "short"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-50 text-black"
              }`}
              onClick={() => handleClick("short")}
            >
              Short
            </button>
            <button
              type="button"
              className={`font-medium text-sm px-4 py-2 ${
                selectedStyle === "balanced"
                  ? "bg-green-500 text-white"
                  : "bg-gray-50 text-black"
              }`}
              onClick={() => handleClick("balanced")}
            >
              Balanced
            </button>
            <button
              type="button"
              className={`font-medium text-sm px-4 py-2 rounded-r-2xl ${
                selectedStyle === "creative"
                  ? "bg-purple-700 text-white"
                  : "bg-gray-50 text-black"
              }`}
              onClick={() => handleClick("creative")}
            >
              Creative
            </button>
          </div>
          {isLoading ? (
            <LoadingAIButton />
          ) : (
            <button
              className={`flex gap-x-1 mt-2 bg-gradient-to-r from-pink-500 to-purple-700 text-white font-semibold py-2 px-4 rounded-3xl hover:scale-105 transition duration-300 ${
                showButton ? "opacity-100" : "opacity-0"
              }`}
              onClick={generateSummary}
            >
              <svg
                className="mr-2"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3L10.5 8.5L16 11L10.5 13.5L8 19L5.5 13.5L0 11L5.5 8.5L8 3ZM8 7.83L7 10L4.83 11L7 12L8 14.17L9 12L11.17 11L9 10L8 7.83ZM18 8L16.74 5.26L14 4L16.74 2.75L18 0L19.25 2.75L22 4L19.25 5.26L18 8ZM18 22L16.74 19.26L14 18L16.74 16.75L18 14L19.25 16.75L22 18L19.25 19.26L18 22Z"
                  fill="white"
                />
              </svg>
              Generate with AI
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SummarySection;
