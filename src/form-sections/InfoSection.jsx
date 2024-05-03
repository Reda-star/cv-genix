import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchNameFromPersonalInfo } from '../utils/personalInfo/nameUtils';
import { fetchTitleFromData } from '../utils/personalInfo/jobTitleUtils';
import { fetchEmailFromData } from '../utils/personalInfo/emailUtils';
import { fetchPhoneFromPersonalInfo } from '../utils/personalInfo/phoneUtils';
import { fetchCityFromData } from '../utils/personalInfo/cityUtils';
import { fetchAddressFromData } from '../utils/personalInfo/addressUtils';




// eslint-disable-next-line react/prop-types, no-unused-vars
const InfoSection = ({ setName, setEmail, setPhone, setTitle, setCity, setAddress, setImageSrc }) => {
 

const [nameInput, setNameInput] = useState('');
const [emailInput, setEmailInput] = useState('');
const [phoneInput, setPhoneInput] = useState('');
const [titleInput, setTitleInput] = useState('');
const [cityInput, setCityInput] = useState('');
const [addressInput, setAddressInput] = useState('');

// eslint-disable-next-line no-unused-vars
const [imageSrc, setImageFile] = useState(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  setImageFile(file);

  const reader = new FileReader();
  reader.onloadend = () => {
    setImageSrc(reader.result);
  };
  reader.readAsDataURL(file);
};
  

 

useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:4000/parsedresume');
      const { data } = response;
      setName(fetchNameFromPersonalInfo(data) || ''); // Set fetched name to state
      setNameInput(fetchNameFromPersonalInfo(data) || ''); // Set fetched name to input value
      setEmail(fetchEmailFromData(data) || ''); // Set fetched email to state
      setEmailInput(fetchEmailFromData(data) || ''); // Set fetched email to input value
      setPhone(fetchPhoneFromPersonalInfo(data) || ''); // Set fetched phone to state
      setPhoneInput(fetchPhoneFromPersonalInfo(data) || ''); // Set fetched phone to input value
      setTitle(fetchTitleFromData(data) || ''); // Set fetched title to state
      setTitleInput(fetchTitleFromData(data) || ''); // Set fetched title to input value
      setCity(fetchCityFromData(data) || ''); // Set fetched city to state
      setCityInput(fetchCityFromData(data) || ''); // Set fetched city to input value
      setAddress(fetchAddressFromData(data) || '');
      setAddressInput(fetchAddressFromData(data) || '');

      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();
}, [setName, setEmail, setPhone, setTitle, setCity, setAddress]);


const handleNameChange = (e) => {
  const newName = e.target.value;
  setName(newName);
  setNameInput(newName);
};

const handleEmailChange = (e) => {
  const newEmail = e.target.value;
  setEmail(newEmail);
  setEmailInput(newEmail);
};

const handlePhoneChange = (e) => {
  const newPhone = e.target.value;
  setPhone(newPhone);
  setPhoneInput(newPhone);
};

const handleTitleChange = (e) => {
  const newTitle = e.target.value;
  setTitle(newTitle);
  setTitleInput(newTitle);
};

const handleCityChange = (e) => {
  const newCity = e.target.value;
  setCity(newCity);
  setCityInput(newCity);
};

const handleAddressChange = (e) => {
  const newAddress = e.target.value;
  setAddress(newAddress);
  setAddressInput(newAddress)
};


  return (
    <>
      <h2 className="text-lg font-bold mt-4 ml-4 flex gap-x-1">
<svg className='fill-current text-blue-700' height="30" viewBox="0 0 21 21" width="30" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m14.5 13.5c-.6615287-2.2735217-3.1995581-3.0251263-6-3.0251263-2.72749327 0-5.27073171.8688092-6 3.0251263"/><path d="m8.5 2.5c1.6568542 0 3 1.34314575 3 3v2c0 1.65685425-1.3431458 3-3 3-1.65685425 0-3-1.34314575-3-3v-2c0-1.65685425 1.34314575-3 3-3z"/></g></svg>
  Personal Information</h2>

<div className="grid grid-cols-2 gap-4 m-4">
<div>
    <label htmlFor="name"  className="block text-sm font-medium text-gray-700">Full Name</label>
    <input type="text"  id="name" name="name" htmlFor="name"  value={nameInput}
            onChange={handleNameChange}
              className="mt-1 p-2 border border-gray-300 rounded-xl w-full " placeholder='Enter your name' />
  </div>
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Profile Pic</label>
    
    <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-5 h-5 mt-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-bold">Click to upload</span> or drag and drop</p>
            </div>
        <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
    </label>
    
    </div>
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Job Position</label>
    <input type="text" id="job" name="job" value={titleInput}
            onChange={handleTitleChange} className="mt-1 p-2 border border-gray-300 rounded-xl w-full" placeholder='Enter your job title'/>
  </div>
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input type="email"  id="email" name="email" value={emailInput}
            onChange={handleEmailChange} placeholder='Enter your email' className="mt-1 p-2 border border-gray-300 rounded-xl w-full" />
  </div>
  <div>
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
    <input type="tel" id="phone" name="phone" value={phoneInput}
            onChange={handlePhoneChange} placeholder='Enter your Phone Number' className="mt-1 p-2 border border-gray-300 rounded-xl w-full" />
  </div>
  <div>
    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
    <input type="text" id="address" name="address" value={addressInput} onChange={handleAddressChange} placeholder='Enter your Address' className="mt-1 p-2 border border-gray-300 rounded-xl w-full" />
  </div>
  <div>
    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
    <input type="text" id="city" name="city" value={cityInput}
            onChange={handleCityChange}  placeholder='Enter your City' className="mt-1 p-2 border border-gray-300 rounded-xl w-full" />
  </div>
  <div>
    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
    <input type="text"  id="country"  name="country" placeholder='Enter your Country' className="mt-1 p-2 border border-gray-300 rounded-xl w-full" />
  </div>
</div>
<div className="flex justify-center items-center mb-3">
        
      </div>
    </>
  )
}

export default InfoSection;







