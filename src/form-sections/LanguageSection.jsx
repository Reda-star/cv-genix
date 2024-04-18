/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion';
import findSpokenLanguages from '../utils/language/spokenUtils';



function LanguageSection({setLanguages}) {


  const [languages, setLanguagesLocal] = useState([]);
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleRemoveLanguage = (languageToRemove) => {
    const newLanguages = languages.filter((lang) => lang.language !== languageToRemove);
    setLanguagesLocal(newLanguages);
    setLanguages(newLanguages); // Update the languages in the parent component
    if (editingLanguage && languageToRemove === editingLanguage.language) {
      setEditingLanguage(null);
    }
  };

  
  const handleAddLanguage = () => {
    if (language || level) {
      const newLanguages = [{ language, level }, ...languages];
      setLanguagesLocal(newLanguages);
      setLanguages(newLanguages); // Update the languages in the parent component
      setLanguage('');
      setLevel('');
      setIsEditing(false);
    }
  };

  const handleEditLanguage = (language) => {
    setLanguage(language.language || '');
    setLevel(language.level || '');
    setEditingLanguage(language);
    setIsEditing(true);
    handleRemoveLanguage(language.language);
  };


  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/parsedresume');
        const { data } = response;
  
        // Extract the spoken languages array
        const spokenLanguages = findSpokenLanguages(data);
  
        // Create an array of objects with language and level properties
        const languagesArray = spokenLanguages.map(language => ({ language, level: '' }));
  
        // Set the languages state
        setLanguagesLocal(languagesArray);
        setLanguages(languagesArray);
      } catch (error) {
        console.error('Error fetching language data:', error);
      }
    }
  
    fetchData();
  }, [setLanguages]);
  

  

  return (
    <>
<div className="p-4">
  <h2 className="text-lg font-bold mb-4 flex gap-x-2">
  <svg className='fill-current text-blue-700 ml-1' width="25" height="25" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3175 12.3719C15.3975 11.7119 15.4575 11.0519 15.4575 10.3719C15.4575 9.69195 15.3975 9.03195 15.3175 8.37195H18.6975C18.8575 9.01195 18.9575 9.68195 18.9575 10.3719C18.9575 11.0619 18.8575 11.7319 18.6975 12.3719M13.5475 17.9319C14.1475 16.8219 14.6075 15.6219 14.9275 14.3719H17.8775C16.9175 16.0219 15.3875 17.3019 13.5475 17.9319ZM13.2975 12.3719H8.61752C8.51752 11.7119 8.45752 11.0519 8.45752 10.3719C8.45752 9.69195 8.51752 9.02195 8.61752 8.37195H13.2975C13.3875 9.02195 13.4575 9.69195 13.4575 10.3719C13.4575 11.0519 13.3875 11.7119 13.2975 12.3719ZM10.9575 18.3319C10.1275 17.1319 9.45752 15.8019 9.04752 14.3719H12.8675C12.4575 15.8019 11.7875 17.1319 10.9575 18.3319ZM6.95752 6.37195H4.03752C4.98752 4.71195 6.52752 3.43195 8.35752 2.81195C7.75752 3.92195 7.30752 5.12195 6.95752 6.37195ZM4.03752 14.3719H6.95752C7.30752 15.6219 7.75752 16.8219 8.35752 17.9319C6.52752 17.3019 4.98752 16.0219 4.03752 14.3719ZM3.21752 12.3719C3.05752 11.7319 2.95752 11.0619 2.95752 10.3719C2.95752 9.68195 3.05752 9.01195 3.21752 8.37195H6.59752C6.51752 9.03195 6.45752 9.69195 6.45752 10.3719C6.45752 11.0519 6.51752 11.7119 6.59752 12.3719M10.9575 2.40195C11.7875 3.60195 12.4575 4.94195 12.8675 6.37195H9.04752C9.45752 4.94195 10.1275 3.60195 10.9575 2.40195ZM17.8775 6.37195H14.9275C14.6075 5.12195 14.1475 3.92195 13.5475 2.81195C15.3875 3.44195 16.9175 4.71195 17.8775 6.37195ZM10.9575 0.371948C5.42752 0.371948 0.95752 4.87195 0.95752 10.3719C0.95752 13.0241 2.01109 15.5677 3.88645 17.443C4.81504 18.3716 5.91743 19.1082 7.13068 19.6107C8.34394 20.1133 9.6443 20.3719 10.9575 20.3719C13.6097 20.3719 16.1532 19.3184 18.0286 17.443C19.904 15.5677 20.9575 13.0241 20.9575 10.3719C20.9575 9.05873 20.6989 7.75837 20.1963 6.54511C19.6938 5.33186 18.9572 4.22947 18.0286 3.30088C17.1 2.37229 15.9976 1.6357 14.7844 1.13315C13.5711 0.630606 12.2707 0.371948 10.9575 0.371948Z"/>
</svg>
  Language
  </h2>

  <div className="grid grid-cols-2 gap-4">
	
        <div>
          <label htmlFor="language" className="block text-sm pl-1 font-medium text-gray-700">Language</label>
          <input
            type="text"
            name="language"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your language"
          />
        </div>
        
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
          <input
            type="text"
            name="level"
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your language level"
          />

        </div>

      </div>

      <div className='flex justify-between items-center'>
        <button
          onClick={handleAddLanguage}
          className="flex gap-x-1 mt-2 bg-gradient-to-r from-teal-400 to-cyan-600 text-white font-semibold py-2 px-4 rounded-3xl hover:scale-105 transition duration-300"
        >
          <svg className="mr-1 pt-1" width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/>
          </svg>
          Add Language
        </button>

      </div>

      <div>
      <AnimatePresence>
  {languages.map((item, index) => (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
      key={index} 
      className="bg-white rounded-lg shadow-md p-4 mt-4 flex justify-between items-center"
    >
      <div className='flex'>
        <p className="text-lg font-semibold text-gray-700"><strong>Language:</strong> {item.language}</p>
        <p className="text-gray-600 text-lg ml-2"><strong>Level:</strong> {item.level}</p>
      </div>

      <div className="flex justify-center items-center">
      {!isEditing ? (
          <button
            onClick={() => handleEditLanguage(item)}
            className="hover:scale-110 text-black font-semibold rounded-full py-3 px-3 transition duration-300"
          >
            <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12.94L11.06 6.88L13.12 8.94L7.06 15H5V12.94ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM14.7 7.35L13.7 8.35L11.65 6.3L12.65 5.3C12.86 5.08 13.21 5.08 13.42 5.3L14.7 6.58C14.92 6.79 14.92 7.14 14.7 7.35ZM10 0C11.3132 0 12.6136 0.258658 13.8268 0.761205C15.0401 1.26375 16.1425 2.00035 17.0711 2.92893C17.9997 3.85752 18.7362 4.95991 19.2388 6.17317C19.7413 7.38642 20 8.68678 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C8.68678 20 7.38642 19.7413 6.17317 19.2388C4.95991 18.7362 3.85752 17.9997 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0Z" fill="#2591BF"/>
        </svg>
          </button>
        ) : null}

      <button
        onClick={() => handleRemoveLanguage(item.language)}
        className="flex bg-red-500 hover:scale-110 text-white font-semibold py-3 px-3 rounded-full transition duration-300"
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

	
   </div>   
   
    </>
  )
}

export default LanguageSection




