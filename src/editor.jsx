/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import CertificationSection from "./form-sections/CertificationSection";
import EducationSection from "./form-sections/EducationSection";
import InfoSection from "./form-sections/InfoSection";
import LanguageSection from "./form-sections/LanguageSection";
import SkillSection from "./form-sections/SkillSection";
import SummarySection from "./form-sections/SummarySection";
import WorkSection from "./form-sections/WorkSection";
import { Dropdown } from "flowbite-react";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Greg from "./resume-templates/Greg";
import Basic from "./resume-templates/Basic";
import Opinity from "./resume-templates/Opinity";
import AutoTranslate from "./components/LoadingAutoTranslate";
import axios from "axios";
import LoadingAutoTranslate from "./components/LoadingAutoTranslate";

const templates = [
  { name: "Greg", component: Greg },
  { name: "Basic", component: Basic },
  { name: "Shaka", component: Opinity },
  // Add more templates as needed
];

const CVEditor = () => {
  //for the templates selection
  const [selectedTemplate, setSelectedTemplate] = useState(templates[1]);
  const [isLoading, setIsLoading] = useState(false);

  //Personal Info values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [imageSrc, setImageSrc] = useState("");
  //Professional Summaryvalues
  const [summary, setSummary] = useState("");
  // Skills values
  const [skills, setSkills] = useState([]);
  //Languages values
  const [languages, setLanguages] = useState([]);
  // Education Values
  const [educations, setEducations] = useState([]);
  // Work Experience values
  const [works, setWorks] = useState([]);
  // translation
  const [targetLanguage, setTargetLanguage] = useState("");
  const [translations, setTranslations] = useState({});

  const exportComponentAsPDF = () => {
    const input = document.getElementById("myComponent");

    // Get the dimensions of the template
    const width = input.offsetWidth;
    const height = input.offsetHeight;

    // Create a canvas with the dimensions of the template
    const canvas = document.createElement("canvas");
    const scaleFactor = 5; // Adjust the scale factor as needed for resolution
    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;
    const context = canvas.getContext("2d");

    // Draw the template onto the canvas
    html2canvas(input, { scale: scaleFactor }).then((templateCanvas) => {
      context.drawImage(
        templateCanvas,
        0,
        0,
        width * scaleFactor,
        height * scaleFactor
      );

      // Create a PDF document with the dimensions of the template
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "px",
        format: [width, height],
      });

      // Convert canvas to data URL
      const imgData = canvas.toDataURL("image/jpeg", 0.7); // Adjust the image quality as needed

      // Add image to PDF document
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);

      // Compress PDF
      const pdfString = pdf.output("arraybuffer");
      const compressedPdf = new Blob([pdfString], { type: "application/pdf" });
      const compressedPdfUrl = URL.createObjectURL(compressedPdf);

      // Download the compressed PDF
      const a = document.createElement("a");
      a.href = compressedPdfUrl;
      a.download = "download.pdf";
      a.click();
    });
  };

  const exportComponentAsHTML = () => {
    const input = document.getElementById("myComponent");

    // Create a new HTML document
    const htmlDoc = document.implementation.createHTMLDocument("Resume");

    // Clone the component and append it to the body of the new document
    const componentClone = input.cloneNode(true);
    htmlDoc.body.appendChild(componentClone);

    // Get the stylesheets used in the current document
    const stylesheets = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          // Retrieve CSS rules from each stylesheet
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (error) {
          console.warn("Could not access stylesheet:", sheet.href);
          return null;
        }
      })
      .filter((stylesheet) => stylesheet !== null)
      .join("\n");

    // Create a <style> element and add the CSS rules
    const styleElement = htmlDoc.createElement("style");
    styleElement.appendChild(htmlDoc.createTextNode(stylesheets));

    // Append the <style> element to the <head> of the new document
    htmlDoc.head.appendChild(styleElement);

    // Convert the HTML document to a string
    const htmlString = new XMLSerializer().serializeToString(htmlDoc);

    // Create a Blob containing the HTML content
    const blob = new Blob([htmlString], { type: "text/html" });

    // Create a link element
    const a = document.createElement("a");

    // Set the href attribute to a URL created from the Blob
    a.href = URL.createObjectURL(blob);

    // Set the download attribute to specify the filename
    a.download = "resume.html";

    // Append the link element to the body
    document.body.appendChild(a);

    // Programmatically trigger a click event on the link
    a.click();

    // Remove the link element from the body
    document.body.removeChild(a);
  };

  const translateTemplate = (templateContainer, targetLanguage) => {
    for (let i = 0; i < templateContainer.childNodes.length; i++) {
      let node = templateContainer.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        // This is a text node, translate it
        axios
          .post("http://localhost:3000/translate", {
            text: node.textContent,
            targetLanguage: targetLanguage,
          })
          .then((response) => {
            // Store the translation
            setTranslations((prevTranslations) => ({
              ...prevTranslations,
              [node.textContent]: response.data.translatedText,
            }));

            // Replace the text with the translation
            node.textContent = response.data.translatedText;
          })
          .catch((error) => {
            console.error("Error occurred during translation:", error);
          });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // This is an element node, recurse on it
        translateTemplate(node, targetLanguage);
      }
    }
  };

  const applyTranslations = (templateContainer) => {
    for (let i = 0; i < templateContainer.childNodes.length; i++) {
      let node = templateContainer.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        // This is a text node, apply the stored translation if it exists
        if (translations[node.textContent]) {
          node.textContent = translations[node.textContent];
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // This is an element node, recurse on it
        applyTranslations(node);
      }
    }
  };

  const handleTranslateTemplate = () => {
    setIsLoading(true);
    // Get the displayed template
    const templateContainer = document.getElementById("myComponent");

    // Call the translateTemplate function with the template container and selected target language
    translateTemplate(templateContainer, targetLanguage);

    // Apply the stored translations to the new template
    applyTranslations(templateContainer);
    setTimeout(() => setIsLoading(false), 15000);
  };

  function shareViaWhatsApp() {
    const resumeContainer = document.getElementById('myComponent');
    const pdfData = exportComponentAsPDF(resumeContainer);
    const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent('Here is my resume as a PDF:')}&amp;media=${encodeURIComponent(pdfData)}`;
    window.open(whatsappUrl, '_blank');
  }
  
  function shareViaEmail() {
    const subject = encodeURIComponent("Sharing my resume");
    const body = encodeURIComponent("Please find my resume attached. [Download Link Here]");
    const pdfData = exportComponentAsPDF(); // Call the exportComponentAsPDF function to generate the PDF
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const attachment = `resume.pdf`; // You can customize the attachment name
  
    // Create a new mailto link with the attachment
    const mailtoLink = `https://outlook.office.com/mail/?subject=${subject}&body=${body}&attachment=${attachment}&filename=${attachment}`;
  
    // Open the mailto link in a new tab
    window.open(mailtoLink, '_blank');
  }

  return (
    <>
      <div className="bg-gray-200 h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-gray-200 overflow-y-auto">
          <h1 className="text-2xl text-center font-bold text-gray-800 mt-8 mb-4">
            Craft Your Professional Story: Fill in Each Section to Create{" "}
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-800 bg-clip-text">
              Your Resume
            </span>
          </h1>

          <InfoSection
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
            setTitle={setTitle}
            setCity={setCity}
            setAddress={setAddress}
            setImageSrc={setImageSrc}
          />
          <SummarySection
            name={name}
            skills={skills}
            title={title}
            works={works}
            setSummary={setSummary}
          />
          <SkillSection setSkills={setSkills} skills={skills} works={works} title={title}/>
          <EducationSection setEducations={setEducations} />
          <WorkSection setWorks={setWorks} />
          <CertificationSection />
          <LanguageSection setLanguages={setLanguages} />

          <div className="flex flex-col gap-y-4 sm:flex-row justify-evenly items-center mb-7">
            <form className="max-w-sm">
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose a language</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="nl">Netherland</option>
              </select>
            </form>

            {isLoading ? (
              <LoadingAutoTranslate />
            ) : (
              <button
                onClick={handleTranslateTemplate}
                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-sm font-medium text-white transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-110 hover:shadow-2xl"
              >
                Auto Translate
              </button>
            )}
          </div>
        </div>

        {/* Right side for resume display */}
        <div className="w-full lg:h-auto lg:w-1/2 bg-gray-100 overflow-y-auto">
          <h1 className="text-2xl text-center mt-4 font-bold p-4">
            Template Resume - {selectedTemplate ? selectedTemplate.name : ""}
          </h1>

          <div id="myComponent" className="mx-2 bg-gray-100">
            {selectedTemplate && (
              <selectedTemplate.component
                name={name}
                email={email}
                phone={phone}
                imageSrc={imageSrc}
                title={title}
                city={city}
                summary={summary}
                address={address}
                skills={skills}
                works={works}
                educations={educations}
                languages={languages}
              />
            )}
          </div>

          <div className="flex justify-center items-center gap-x-10 gap-y-2 mt-3 mb-10 flex-wrap lg:flex-no-wrap">
            <select
              value={selectedTemplate ? selectedTemplate.name : ""}
              onChange={(e) => {
                const selectedTemplateName = e.target.value;
                const selectedTemplate = templates.find(
                  (template) => template.name === selectedTemplateName
                );
                setSelectedTemplate(selectedTemplate);
              }}
              className="bg-gray-900 border text-white text-sm rounded-lg focus:ring-black focus:border-black block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-black dark:focus:border-black"
            >
              <option value="">Choose a template</option>
              {templates.map((template) => (
                <option key={template.name} value={template.name}>
                  {template.name}
                </option>
              ))}
            </select>

            <button
              onClick={exportComponentAsPDF}
              className="flex gap-x-3 rounded bg-red-600 px-4 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl lg:mb-0"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM6.5 8.5C6.5 9.3 5.8 10 5 10H4V12H2.5V6H5C5.8 6 6.5 6.7 6.5 7.5V8.5ZM11.5 10.5C11.5 11.3 10.8 12 10 12H7.5V6H10C10.8 6 11.5 6.7 11.5 7.5V10.5ZM15.5 7.5H14V8.5H15.5V10H14V12H12.5V6H15.5V7.5ZM9 7.5H10V10.5H9V7.5ZM4 7.5H5V8.5H4V7.5Z" fill="white"/>
</svg>

              PDF Export
            </button>

            <button
              onClick={exportComponentAsHTML}
              className="flex gap-x-3 rounded bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl lg:mb-0"
            >
              <svg width="16" height="20" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99995 14.56L12.0699 13.43L12.6199 7.33H5.37995L5.19995 5.3H12.7999L12.9999 3.31H2.99995L3.55995 9.32H10.4499L10.2199 11.9L7.99995 12.5L5.77995 11.9L5.63995 10.24H3.63995L3.92995 13.43L7.99995 14.56ZM0.0699463 0H15.9299L14.4999 16.2L7.99995 18L1.49995 16.2L0.0699463 0Z" fill="white"/>
</svg>

              Html Export
            </button>
            
            <button
              onClick={shareViaWhatsApp}
              className="flex gap-x-3 rounded bg-green-500 px-4 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl">
              <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4138 0.923763C4.95383 0.923763 0.503828 5.37376 0.503828 10.8338C0.503828 12.5838 0.963828 14.2838 1.82383 15.7838L0.423828 20.9238L5.67383 19.5438C7.12383 20.3338 8.75383 20.7538 10.4138 20.7538C15.8738 20.7538 20.3238 16.3038 20.3238 10.8438C20.3238 8.19376 19.2938 5.70376 17.4238 3.83376C15.5538 1.95376 13.0638 0.923763 10.4138 0.923763ZM10.4238 2.59376C12.6238 2.59376 14.6838 3.45376 16.2438 5.01376C17.7938 6.57376 18.6538 8.64376 18.6538 10.8438C18.6538 15.3838 14.9538 19.0738 10.4138 19.0738C8.93383 19.0738 7.48383 18.6838 6.22383 17.9238L5.92383 17.7538L2.80383 18.5738L3.63383 15.5338L3.43383 15.2138C2.61383 13.9238 2.17383 12.3938 2.17383 10.8338C2.18383 6.29376 5.87383 2.59376 10.4238 2.59376ZM6.90383 6.25376C6.74383 6.25376 6.47383 6.31376 6.24383 6.56376C6.02383 6.81376 5.37383 7.42376 5.37383 8.63376C5.37383 9.85376 6.26383 11.0238 6.37383 11.1938C6.51383 11.3638 8.13383 13.8638 10.6238 14.9238C11.2138 15.1938 11.6738 15.3438 12.0338 15.4538C12.6238 15.6438 13.1638 15.6138 13.5938 15.5538C14.0738 15.4838 15.0538 14.9538 15.2638 14.3738C15.4738 13.7938 15.4738 13.3038 15.4138 13.1938C15.3438 13.0938 15.1838 13.0338 14.9338 12.9238C14.6838 12.7838 13.4638 12.1838 13.2438 12.1038C13.0138 12.0238 12.8738 11.9838 12.6838 12.2238C12.5238 12.4738 12.0438 13.0338 11.9038 13.1938C11.7538 13.3638 11.6138 13.3838 11.3738 13.2638C11.1138 13.1338 10.3138 12.8738 9.37383 12.0338C8.63383 11.3738 8.14383 10.5638 7.99383 10.3138C7.87383 10.0738 7.98383 9.92376 8.10383 9.81376C8.21383 9.70376 8.37383 9.52376 8.47383 9.37376C8.60383 9.23376 8.64383 9.12376 8.72383 8.96376C8.80383 8.79376 8.76383 8.65376 8.70383 8.53376C8.64383 8.42376 8.14383 7.18376 7.93383 6.69376C7.73383 6.21376 7.53383 6.27376 7.37383 6.26376C7.23383 6.26376 7.07383 6.25376 6.90383 6.25376Z" fill="white"/>
</svg>

              share via whatsapp
            </button>

            <button
              onClick={shareViaEmail}
              className="flex gap-x-3 rounded bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl">
              <svg className=" scale-125" width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.96772 12.478C8.96772 12.7313 8.94771 12.9746 8.90771 13.208C8.83438 13.4346 8.73438 13.6413 8.60771 13.828C8.47438 14.008 8.31105 14.1513 8.11771 14.258C7.91771 14.3646 7.68105 14.418 7.40771 14.418C7.12771 14.418 6.89105 14.3613 6.69771 14.248C6.50438 14.1346 6.34438 13.9846 6.21771 13.798C6.09105 13.6113 6.00105 13.4013 5.94771 13.168C5.88771 12.9346 5.85771 12.6946 5.85771 12.448C5.85771 12.208 5.88771 11.968 5.94771 11.728C6.00105 11.4946 6.09105 11.2846 6.21771 11.098C6.34438 10.9113 6.51105 10.7613 6.71771 10.648C6.91771 10.5346 7.15772 10.478 7.43772 10.478C7.72438 10.478 7.96438 10.5346 8.15771 10.648C8.35771 10.768 8.51771 10.9213 8.63771 11.108C8.75771 11.3013 8.84771 11.5146 8.90771 11.748C8.94771 11.988 8.96772 12.2313 8.96772 12.478ZM22.4077 12.448V20.258C22.4077 20.518 22.3177 20.748 22.1377 20.948C21.951 21.1146 21.7277 21.198 21.4677 21.198H8.34771C8.08771 21.198 7.86438 21.1146 7.67771 20.948C7.49771 20.748 7.40771 20.518 7.40771 20.258V17.448H3.23771C3.01771 17.448 2.82105 17.368 2.64771 17.208C2.48771 17.0346 2.40771 16.838 2.40771 16.618V8.27797C2.40771 8.05797 2.48771 7.8613 2.64771 7.68797C2.82105 7.52797 3.01771 7.44797 3.23771 7.44797H8.65771V4.57797C8.65771 4.3313 8.74105 4.1213 8.90771 3.94797C9.08105 3.7813 9.29105 3.69797 9.53771 3.69797H20.2777C20.5244 3.69797 20.7344 3.7813 20.9077 3.94797C21.0744 4.1213 21.1577 4.3313 21.1577 4.57797V11.488L22.1977 12.088H22.2077C22.261 12.128 22.3077 12.1813 22.3477 12.248C22.3877 12.308 22.4077 12.3746 22.4077 12.448ZM17.4077 5.57797V8.07797H19.9077V5.57797M17.4077 9.32797V11.828H19.9077V9.32797M17.4077 13.078V14.598L19.9477 13.078M13.0377 5.57797V8.07797H16.1577V5.57797M13.0377 9.32797V11.828H16.1577V9.32797M13.0377 13.078V14.768L15.0477 16.008L16.1577 15.348V13.078M9.90771 5.57797V7.44797H11.6777C11.7177 7.44797 11.7544 7.4613 11.7877 7.48797V5.56797M7.40771 15.768C7.89438 15.768 8.33438 15.6813 8.72771 15.508C9.11438 15.3346 9.44438 15.098 9.71772 14.798C9.98438 14.498 10.1844 14.1413 10.3177 13.728C10.4577 13.3146 10.531 12.868 10.5377 12.388C10.5377 11.928 10.4677 11.498 10.3277 11.098C10.1944 10.7046 9.99438 10.3613 9.72771 10.068C9.46771 9.77464 9.15105 9.54464 8.77771 9.37797C8.39771 9.2113 7.96771 9.12797 7.48771 9.12797C6.97438 9.12797 6.51771 9.2113 6.11771 9.37797C5.72438 9.54464 5.39105 9.77797 5.11771 10.078C4.84438 10.3846 4.63771 10.7446 4.49771 11.158C4.35771 11.578 4.28771 12.0346 4.28771 12.528C4.28771 12.9946 4.35771 13.428 4.49771 13.828C4.64438 14.2213 4.85105 14.5613 5.11771 14.848C5.38438 15.1346 5.70771 15.3613 6.08771 15.528C6.47438 15.688 6.91438 15.768 7.40771 15.768ZM8.65771 19.948H18.9777L12.4077 15.848V16.618C12.4077 16.838 12.3277 17.0346 12.1677 17.208C11.9944 17.368 11.7977 17.448 11.5777 17.448H8.65771M21.1577 19.838V13.808L16.2377 16.758L21.1577 19.838Z" fill="white"/>
</svg>

              share via email
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CVEditor;
