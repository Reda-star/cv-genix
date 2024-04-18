/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import fetchSkills from "../utils/skills/skillUtils";




// eslint-disable-next-line react/prop-types, no-unused-vars
const SkillSection = ({setSkills}) => {
  const [skills, setSkillsLocal] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [editingSkill, setEditingSkill] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleRemoveSkill = (skillToRemove) => {
    const newSkills = skills.filter((skill) => skill.skill !== skillToRemove);
    setSkillsLocal(newSkills);
    setSkills(newSkills); // Update the skills in the parent component
  };


  const handleAddSkill = () => {
    if (selectedSkill || yearsOfExperience) {
      const newSkills = [{ skill: selectedSkill, year: yearsOfExperience }, ...skills];
      setSkillsLocal(newSkills);
      setSkills(newSkills); // Update the skills in the parent component
      setSelectedSkill('');
      setYearsOfExperience('');
      setIsEditing(false);
    }
  };

  const handleEditSkill = (skill) => {
    setSelectedSkill(skill.skill || '');
    setYearsOfExperience(skill.year || '');
    setEditingSkill(skill);
    setIsEditing(true);
    handleRemoveSkill(skill.skill);
  };

  const handleSkillInputChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleYearsInputChange = (e) => {
    setYearsOfExperience(parseInt(e.target.value));
  };

  




useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/parsedresume');
        const { data } = response;

        
        // Fetch skills using the utility function
        const skillsArray = fetchSkills(data);
          // Set the skills state
          setSkills(skillsArray);
          setSkillsLocal(skillsArray);
      } catch (error) {
        console.error('Error fetching skills data:', error);
      }
    }

    fetchData();
  }, [setSkills]);



  return (
    <>
     <div className="p-4">
  <h2 className="text-lg font-semibold mb-4 flex gap-x-2">
  <svg className='fill-current text-blue-700 ml-1' height="25" width="25" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 232.688 232.688">
<g id="XMLID_350_">
	<g id="XMLID_351_">
		<path id="XMLID_352_" d="M97.688,61.344h120c8.284,0,15-6.716,15-15s-6.716-15-15-15h-120c-8.284,0-15,6.716-15,15
			S89.403,61.344,97.688,61.344z"/>
	</g>
	<g id="XMLID_439_">
		<path id="XMLID_440_" d="M217.688,101.344h-120c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15
			S225.972,101.344,217.688,101.344z"/>
	</g>
	<g id="XMLID_441_">
		<path id="XMLID_443_" d="M217.688,171.344h-120c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h120c8.284,0,15-6.716,15-15
			C232.688,178.06,225.972,171.344,217.688,171.344z"/>
	</g>
	<g id="XMLID_444_">
		<path id="XMLID_445_" d="M48.785,104.408l-9.989-1.452l-4.467-9.052c-1.264-2.56-3.87-4.181-6.726-4.181
			c-2.854,0-5.462,1.621-6.726,4.181l-4.468,9.052l-9.988,1.452c-2.825,0.41-5.173,2.389-6.055,5.104
			c-0.882,2.715-0.146,5.695,1.897,7.688l7.228,7.045l-1.707,9.949c-0.483,2.814,0.674,5.658,2.983,7.336
			c1.307,0.95,2.853,1.433,4.409,1.433c1.193,0,2.392-0.285,3.489-0.861l8.936-4.698l8.936,4.698
			c1.098,0.577,2.296,0.861,3.489,0.861c0.007,0,0.015,0,0.021,0c4.142-0.001,7.499-3.358,7.499-7.5
			c0-0.629-0.077-1.241-0.223-1.825l-1.612-9.393l7.228-7.045c2.045-1.993,2.78-4.973,1.898-7.688
			C53.958,106.797,51.61,104.818,48.785,104.408z"/>
	</g>
	<g id="XMLID_446_">
		<path id="XMLID_447_" d="M48.785,34.408l-9.989-1.452l-4.467-9.052c-1.264-2.56-3.87-4.181-6.726-4.181
			c-2.854,0-5.462,1.621-6.726,4.181l-4.468,9.052l-9.988,1.452c-2.825,0.41-5.173,2.389-6.055,5.104
			c-0.882,2.715-0.146,5.695,1.897,7.688l7.228,7.045l-1.707,9.949c-0.483,2.814,0.674,5.658,2.983,7.336
			c1.307,0.95,2.853,1.433,4.409,1.433c1.193,0,2.392-0.285,3.489-0.861l8.936-4.698l8.936,4.698
			c1.098,0.577,2.296,0.861,3.489,0.861c0.007,0,0.015,0,0.021,0c4.142,0,7.499-3.358,7.499-7.5c0-0.629-0.077-1.241-0.223-1.825
			l-1.612-9.393l7.228-7.045c2.045-1.993,2.78-4.973,1.898-7.688C53.958,36.797,51.61,34.818,48.785,34.408z"/>
	</g>
	<g id="XMLID_448_">
		<path id="XMLID_449_" d="M48.785,174.408l-9.989-1.452l-4.467-9.052c-1.264-2.56-3.87-4.181-6.726-4.181
			c-2.854,0-5.462,1.621-6.726,4.181l-4.468,9.052l-9.988,1.452c-2.825,0.41-5.173,2.389-6.055,5.104
			c-0.882,2.715-0.146,5.695,1.897,7.688l7.228,7.045l-1.707,9.949c-0.483,2.814,0.674,5.658,2.983,7.336
			c1.307,0.95,2.853,1.433,4.409,1.433c1.193,0,2.392-0.285,3.489-0.861l8.936-4.698l8.936,4.698
			c1.098,0.577,2.296,0.861,3.489,0.861c0.007,0,0.015,0,0.021,0c4.142-0.001,7.499-3.358,7.499-7.5
			c0-0.629-0.077-1.241-0.223-1.825l-1.612-9.393l7.228-7.045c2.045-1.993,2.78-4.973,1.898-7.688
			C53.958,176.797,51.61,174.818,48.785,174.408z"/>
	</g>
</g>
</svg>Skills</h2>

<div className="grid grid-cols-2 gap-4">
	
        <div>
          <label htmlFor="skill" className="block text-sm font-medium text-gray-700">Skill</label>
          <input
            type="text"
            name="skill"
            id="skill"
            value={selectedSkill}
            onChange={handleSkillInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your skill"
          />
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            value={yearsOfExperience}
            onChange={handleYearsInputChange}
            min="0"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Years with the skill"
          />
        </div>
      </div>
	<div className='flex justify-start'>
  
        <button
          onClick={handleAddSkill}
          className="flex gap-x-1 mt-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-3xl hover:scale-105 transition duration-300"
        >
          <svg className="mr-1 pt-1" width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/>
          </svg>
          Add skill
        </button>

      </div>
	
      {/* Display added skills */}
      <div>
		<AnimatePresence>
  {skills.map((item) => (
	<motion.div initial={{ opacity: 0, y: -10 }}
	animate={{ opacity: 1, y: 0 }}
	exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }} key={item.skill} className="mt-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex ">
          <p className="text-lg font-semibold text-gray-700"><strong>Skill:</strong> {item.skill}</p>
          <p className="text-gray-600 text-lg ml-3"><strong>Year:</strong> {item.year}</p>
        </div>
        <div className="flex justify-center items-center">
          
        {!isEditing ? (
          <button
            onClick={() => handleEditSkill(item)}
            className="hover:scale-110 text-black font-semibold rounded-full py-3 px-3 transition duration-300"
          >
            <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12.94L11.06 6.88L13.12 8.94L7.06 15H5V12.94ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM14.7 7.35L13.7 8.35L11.65 6.3L12.65 5.3C12.86 5.08 13.21 5.08 13.42 5.3L14.7 6.58C14.92 6.79 14.92 7.14 14.7 7.35ZM10 0C11.3132 0 12.6136 0.258658 13.8268 0.761205C15.0401 1.26375 16.1425 2.00035 17.0711 2.92893C17.9997 3.85752 18.7362 4.95991 19.2388 6.17317C19.7413 7.38642 20 8.68678 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C8.68678 20 7.38642 19.7413 6.17317 19.2388C4.95991 18.7362 3.85752 17.9997 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0Z" fill="#2591BF"/>
        </svg>
          </button>
        ) : null}
                    
        <button
          onClick={() => handleRemoveSkill(item.skill)}
          className="bg-red-500 hover:scale-110 text-white font-semibold py-3 px-3 rounded-full transition duration-300">
            
          <svg className="h-5 w-5" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.7394 3.43362L13.8294 0.523621L8.73938 5.61362L3.64938 0.523621L0.73938 3.43362L5.82938 8.52362L0.73938 13.6136L3.64938 16.5236L8.73938 11.4336L13.8294 16.5236L16.7394 13.6136L11.6494 8.52362L16.7394 3.43362Z" fill="white"/>
          </svg>
        </button>
        
            </div>
      </div>
      </motion.div>
    ))}
    </AnimatePresence>
  </div>
  
</div>   
   
    </>
  );
}

export default SkillSection;
