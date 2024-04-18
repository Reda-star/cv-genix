

export function fetchPhoneFromPersonalInfo(personalInfo) {
    const phoneKeys = ['phone', 'telephone', 'mobile', 'cell', 'contact', 'phone_number']; 
    for (const key in personalInfo) {
      if (typeof personalInfo[key] === 'object') {
        const phone = fetchPhoneFromPersonalInfo(personalInfo[key]);
        if (phone) {
          return phone;
        }
      } else {
        const lowerCaseKey = key.toLowerCase();
        if (phoneKeys.some((phoneKey) => lowerCaseKey.includes(phoneKey))) {
          return personalInfo[key];
        }
      }
    }
    return null;
  }
  