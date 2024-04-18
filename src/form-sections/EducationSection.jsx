import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import EducationData from "../utils/education/parseEducationUtils";
// import parseEducationData from "../utils/education/educationUtils";


// eslint-disable-next-line react/prop-types, no-unused-vars
const EducationSection = ({setEducations}) => {


  const [institution, setInstitution] = useState('');
  const [degreeTitle, setDegreeTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [editingEducation, setEditingEducation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  const handleAddEducation = () => {
    if (institution || degreeTitle || startDate || endDate || description) {
      const newEducation = { institution, degreeTitle, startDate, endDate, description };
      setEducationList([...educationList, newEducation]);
      // Clear input fields after adding
      setInstitution('');
      setDegreeTitle('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      setEducations([...educationList, newEducation]);
      setIsEditing(false);
    }
  };
  
  

  const handleEditEducation = (education, index) => {
    setInstitution(education.institution || '');
    setDegreeTitle(education.degreeTitle || '');
    setStartDate(education.startDate || '');
    setEndDate(education.endDate || '');
    setDescription(education.description || '');
    setEditingEducation(education);
    handleRemoveEducation(index);
    setIsEditing(true);
  };

  const handleRemoveEducation = (indexToRemove) => {
    if (editingEducation && indexToRemove === educationList.indexOf(editingEducation)) {
      setEditingEducation(null);
    }
    setEducationList(prevList => prevList.filter((_, index) => index !== indexToRemove));
    setEducations(prevList => prevList.filter((_, index) => index !== indexToRemove));
  };
  



useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:4000/parsedresume');
      const { data } = response;

      // Parse the education data using the utility function
      const parsedEducation = EducationData(data);
      setEducationList(parsedEducation);
      setEducations(parsedEducation)
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  }

  fetchData();
}, [setEducations]);


// const exportEducation = () => {
//   // Combine fetched education data with dynamically added entries
//   const EducationData = [...educationList,{ institution, degreeTitle, startDate, endDate, description }];
  
//   // Example: Log combined education data to console
//   console.log('Education Data:', EducationData);
//   // You can perform any other actions here, such as saving to a file or sending to an API
// };



  return (
    <>
      <div className="p-4">
  <h2 className="text-lg font-bold mb-4 flex gap-x-2">
  <svg className='fill-current text-blue-700' width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.673 5.606a3326.02 3326.02 0 0 1-5.671-2.674L.138 8.524l2.03.98L2 9.531V20h1v-9.626l.72-.124.28.135v5.288c0 .914 5.206 3.533 6.249 4.049a3.89 3.89 0 0 0 3.48-.026C20 16.486 20 15.895 20 15.673v-5.288l3.854-1.857s-3.8-1.801-6.181-2.922zM19 15.504a51.526 51.526 0 0 1-5.726 3.302 2.884 2.884 0 0 1-2.582.02A40.184 40.184 0 0 1 5 15.521v-4.655l7 3.373 7-3.373zm-7-2.373L5.416 9.958l6.469-1.115-.17-.987-7.85 1.354-1.403-.676 9.537-4.495c.825.393 8.523 4.014 9.542 4.494z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
    Education Background</h2>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution/University</label>
      <input type="text" id="institution" name="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Enter your institution" className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div>
      <label htmlFor="degreeTitle" className="block text-sm font-medium text-gray-700">Degree Title</label>
      <input type="text" id="degreeTitle" name="degreeTitle" value={degreeTitle} onChange={(e) => setDegreeTitle(e.target.value)} placeholder="Enter your Degree" className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div>
      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
      <input type="number" id="startDate" name="startDate" min="1990" max="2030" value={startDate} onChange={(e) => setStartDate(e.target.value)}  placeholder="Enter the Start Date" className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div>
      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
      <input type="number" id="endDate" name="endDate" min="1990" max="2030" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="Enter the End Date" className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div className="col-span-2">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
      <textarea id="description" name="description" rows="4" placeholder="Enter a description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
    </div>
  </div>
  <div className='flex justify-start'>
  <button
  onClick={handleAddEducation}
        className="flex gap-x-1 mt-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-2 px-4 rounded-3xl hover:scale-105 transition duration-300">
         <svg className="mr-1 pt-1" width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/>
</svg>
        Add Education
      </button>
      </div>

<div>
<AnimatePresence>
  {educationList.map((item, index) => (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }} 
      key={index} 
      className="mt-4 p-4 bg-white rounded-lg shadow-md"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-semibold text-gray-700"><strong>Institution/School:</strong> {item.institution}</p>
          <p className="text-gray-600 text-lg mt-1"><strong>Degree Title:</strong> {item.degreeTitle}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-gray-600 text-lg"><strong>Start Date:</strong> {item.startDate}</p>
          <p className="text-gray-600 text-lg mt-1"><strong>End Date:</strong> {item.endDate}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-600 text-lg"><strong>Description:</strong> {item.description}</p>
      </div>
      <div className="flex justify-center items-center">
      { !isEditing ? (
        <button
      onClick={() => handleEditEducation(item, index)}
        className="flex mt-4 m-4  hover:scale-110 text-white font-semibold py-2 px-3 rounded-full transition duration-300"
      >
            <svg width="38" height="38" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12.94L11.06 6.88L13.12 8.94L7.06 15H5V12.94ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM14.7 7.35L13.7 8.35L11.65 6.3L12.65 5.3C12.86 5.08 13.21 5.08 13.42 5.3L14.7 6.58C14.92 6.79 14.92 7.14 14.7 7.35ZM10 0C11.3132 0 12.6136 0.258658 13.8268 0.761205C15.0401 1.26375 16.1425 2.00035 17.0711 2.92893C17.9997 3.85752 18.7362 4.95991 19.2388 6.17317C19.7413 7.38642 20 8.68678 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C8.68678 20 7.38642 19.7413 6.17317 19.2388C4.95991 18.7362 3.85752 17.9997 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0Z" fill="#2591BF"/>
    </svg>
      
      </button>
      ): null}
      <button
        onClick={() => handleRemoveEducation(index)}
        className="flex mt-4 m-4 bg-red-500 hover:scale-110 text-white font-semibold py-2 px-3 rounded-full transition duration-300"
      >
        <svg className="h-5 w-5" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.7394 3.43362L13.8294 0.523621L8.73938 5.61362L3.64938 0.523621L0.73938 3.43362L5.82938 8.52362L0.73938 13.6136L3.64938 16.5236L8.73938 11.4336L13.8294 16.5236L16.7394 13.6136L11.6494 8.52362L16.7394 3.43362Z" fill="white"/>
        </svg>
      </button>
      </div>
     
    </motion.div>
  ))}
</AnimatePresence>


</div>
{/* 
<div className="flex justify-center items-center mb-3">
<button className="mb-4 ml-4 bg-gray-900 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
  Export
</button>
</div> */}
</div>
    </>
  )
}

export default EducationSection
