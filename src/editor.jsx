import CertificationSection from "./form-sections/CertificationSection";
import EducationSection from "./form-sections/EducationSection";
import InfoSection from "./form-sections/InfoSection";
import LanguageSection from "./form-sections/LanguageSection";
import SkillSection from "./form-sections/SkillSection";
import SummarySection from "./form-sections/SummarySection";
import WorkSection from "./form-sections/WorkSection";
import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Greg from "./resume-templates/Greg";
import Basic from "./resume-templates/Basic";
import Opinity from "./resume-templates/Opinity";


const templates = [
  { name: "Greg", component: Greg },
  { name: "Basic", component: Basic },
  { name: "Shaka", component: Opinity },
  // Add more templates as needed
];

const CVEditor = () => {
  //for the templates selection
  const [selectedTemplate, setSelectedTemplate] = useState(templates[1]);

  //Personal Info values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
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
      context.drawImage(templateCanvas, 0, 0, width * scaleFactor, height * scaleFactor);
  
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
            setImageSrc={setImageSrc}
          />
          <SummarySection name={name} skills={skills} title={title} works={works} setSummary={setSummary} />
          <SkillSection setSkills={setSkills} />
          <EducationSection setEducations={setEducations} />
          <WorkSection setWorks={setWorks} />
          <CertificationSection />
          <LanguageSection setLanguages={setLanguages} />
        </div>

        

        {/* Right side for resume display */}
        <div className="w-full h-[700vh] lg:h-auto lg:w-1/2 bg-gray-100 overflow-y-auto">
          <h1 className="text-2xl text-center mt-4 font-bold p-4">
            Template Resume
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
                skills={skills}
                works={works}
                educations={educations}
                languages={languages}
              />
            )}
          </div>

          <div className="flex justify-center items-center gap-x-10 gap-y-2 mt-3 mb-10 flex-wrap lg:flex-no-wrap">
            <Dropdown
              label="Choose Template"
              color="dark"
              dismissOnClick={false}
            >
              {templates.map((template) => (
                <Dropdown.Item key={template.name}>
                  <li onClick={() => setSelectedTemplate(template)}>
                    {template.name}
                  </li>
                </Dropdown.Item>
              ))}
            </Dropdown>

            <button
             onClick={exportComponentAsPDF}
              className="inline-block rounded bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl lg:mb-0">
              PDF Export
            </button>

            <button
          onClick={exportComponentAsHTML}
              className="inline-block rounded bg-orange-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl lg:mb-0">
              Html Export
            </button>
{/* 
            <button
              className="inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl">
              Export to web
            </button> */}

          </div>

        </div>
      </div>
    </>
  );
};

export default CVEditor;

