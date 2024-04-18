import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchWorkExperience } from '../utils/work-experience/fetchWorkUtils';


// eslint-disable-next-line react/prop-types, no-unused-vars
const WorkSection = ({setWorks}) => {

  const [workExperienceList, setWorkExperienceList] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [editingWork, setEditingWork] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  

  const handleAddWorkExperience = () => {
    // Check if any required field is empty
    if (companyName || position || startDate || endDate || workDescription) {
      const newWorkExperience = { companyName, position, startDate, endDate, workDescription };
      setWorkExperienceList([newWorkExperience, ...workExperienceList]);
      setWorks([newWorkExperience, ...workExperienceList]);

      // Clear input fields after adding
      setCompanyName('');
      setPosition('');
      setStartDate('');
      setEndDate('');
      setWorkDescription('');
      setIsEditing(false);
    }
  };


  const handleEditWorkExperience = (exp,index) => {
    setCompanyName(exp.companyName);
    setPosition(exp.position);
    setStartDate(exp.startDate);
    setEndDate(exp.endDate);
    setWorkDescription(exp.workDescription);
    setEditingWork(exp);
    handleRemoveWorkExperience(index);
    setIsEditing(true);
  };


  const handleRemoveWorkExperience = (index) => {
    if (editingWork && index === workExperienceList.indexOf(editingWork)){
      setEditingWork(null);
    }
    setWorkExperienceList(workExperienceList.filter((_, i) => i !== index));
    setWorks(workExperienceList.filter((_, i) => i !== index));
  };

   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/parsedresume');
        const { data } = response;
        const workExperienceData = fetchWorkExperience(data);
        setWorkExperienceList(workExperienceData);
        setWorks(workExperienceData)
      } catch (error) {
        console.error('Error fetching work experience data:', error);
      }
    };

    fetchData();
  }, [setWorks]);


//   const exportWorkExperience = () => {
//     // Combine fetched work experience data with dynamically added entries
//     const allWorkExperienceData = [...workExperienceList, { companyName, position, startDate, endDate, workDescription }];
    
//     // Example: Log combined work experience data to console
//     console.log('Work Experience Data:', allWorkExperienceData);
//     // You can perform any other actions here, such as saving to a file or sending to an API
// };




  return (
    <>
      <div className="p-4">
        <h3 className="text-lg text-gray-700 font-bold mb-2 flex gap-x-2">
        <svg className='fill-current text-blue-700' version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" >
<path  d="M20,12.5L20,12.5c0,0.276,0.224,0.5,0.5,0.5h7c0.276,0,0.5-0.224,0.5-0.5v0c0-0.276-0.224-0.5-0.5-0.5
	h-7C20.224,12,20,12.224,20,12.5z M20.5,15h7c0.276,0,0.5-0.224,0.5-0.5v0c0-0.276-0.224-0.5-0.5-0.5h-7c-0.276,0-0.5,0.224-0.5,0.5
	v0C20,14.776,20.224,15,20.5,15z M20.5,17h7c0.276,0,0.5-0.224,0.5-0.5l0,0c0-0.276-0.224-0.5-0.5-0.5h-7
	c-0.276,0-0.5,0.224-0.5,0.5l0,0C20,16.776,20.224,17,20.5,17z M20.5,19h7c0.276,0,0.5-0.224,0.5-0.5l0,0c0-0.276-0.224-0.5-0.5-0.5
	h-7c-0.276,0-0.5,0.224-0.5,0.5l0,0C20,18.776,20.224,19,20.5,19z M16,18v-6c0-0.552-0.448-1-1-1h-1c-0.552,0-1,0.448-1,1v6h-1v-4
	c0-0.552-0.448-1-1-1h-1c-0.552,0-1,0.448-1,1v4H8v-5c0-0.552-0.448-1-1-1H6c-0.552,0-1,0.448-1,1v5H4.5C4.224,18,4,18.224,4,18.5
	l0,0C4,18.776,4.224,19,4.5,19h12c0.276,0,0.5-0.224,0.5-0.5l0,0c0-0.276-0.224-0.5-0.5-0.5H16z M7,18H6v-5h1V18z M11,18h-1v-4h1V18
	z M15,18h-1v-6h1V18z M29,4H3C1.343,4,0,5.343,0,7v16c0,1.657,1.343,3,3,3h9v3h-1.5c-0.276,0-0.5,0.224-0.5,0.5l0,0
	c0,0.276,0.224,0.5,0.5,0.5h11c0.276,0,0.5-0.224,0.5-0.5l0,0c0-0.276-0.224-0.5-0.5-0.5H20v-3h9c1.657,0,3-1.343,3-3V7
	C32,5.343,30.657,4,29,4z M19,29h-6v-3h6V29z M31,23c0,1.105-0.895,2-2,2H3c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h26
	c1.105,0,2,0.895,2,2V23z"/>
</svg>
          Work Experience
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="text"
              id="startDate"
              name="startDate"
              placeholder="Enter the Start Date"
              min="1990"
              max="2030"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="text"
              id="endDate"
              name="endDate"
              placeholder="Enter the End Date"
              min="1990"
              max="2030"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="workDescription" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="workDescription"
            name="workDescription"
            rows="3"
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className='flex justify-start'>
          <button
            className="flex gap-x-1 mt-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-3xl hover:scale-105 transition duration-300"
            onClick={handleAddWorkExperience}
          >
            <svg className="mr-1 pt-1" width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/>
            </svg>
            Add Work experience
          </button>
        </div>

      <div>
      <AnimatePresence>
      {workExperienceList.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }} 
              key={index} 
              className="mt-4 p-4 bg-white rounded-lg shadow-md"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-lg font-semibold text-gray-700"><strong>Company Name:</strong> {item.companyName}</p>
                  <p className="text-gray-600 text-lg mt-1"><strong>Position:</strong> {item.position}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-gray-600 text-lg"><strong>Start Date:</strong> {item.startDate}</p>
                  <p className="text-gray-600 text-lg mt-1"><strong>End Date:</strong> {item.endDate}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-gray-600 text-lg"><strong>Description:</strong> {item.workDescription}</p>
              </div>

              <div className='flex justify-center items-center'>
              { !isEditing ? (
               <button
                onClick={() =>handleEditWorkExperience(item, index)}
                className="flex mt-4 m-4 hover:scale-110 text-black font-semibold py-2 px-3 rounded-full transition duration-300"
              >
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12.94L11.06 6.88L13.12 8.94L7.06 15H5V12.94ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM14.7 7.35L13.7 8.35L11.65 6.3L12.65 5.3C12.86 5.08 13.21 5.08 13.42 5.3L14.7 6.58C14.92 6.79 14.92 7.14 14.7 7.35ZM10 0C11.3132 0 12.6136 0.258658 13.8268 0.761205C15.0401 1.26375 16.1425 2.00035 17.0711 2.92893C17.9997 3.85752 18.7362 4.95991 19.2388 6.17317C19.7413 7.38642 20 8.68678 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C8.68678 20 7.38642 19.7413 6.17317 19.2388C4.95991 18.7362 3.85752 17.9997 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0Z" fill="#2591BF"/>
</svg>
             </button>
              ): null}
              <button
                onClick={() => handleRemoveWorkExperience(index)}
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
      {/* <div className="flex justify-center items-center mb-3">
        <button className="mb-4 ml-4 bg-gray-900 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Export
        </button>
      </div> */}
      </div>
    </>
  );
};

export default WorkSection;
