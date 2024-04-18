

export function fetchNameFromPersonalInfo(personalInfo) {
    const nameKeys = ['name', 'firstName', 'first_name']; // Add other possible key names here
    for (const key in personalInfo) {
      if (typeof personalInfo[key] === 'object') {
        const name = fetchNameFromPersonalInfo(personalInfo[key]);
        if (name) {
          return name;
        }
      } else {
        const lowerCaseKey = key.toLowerCase();
        if (nameKeys.some((nameKey) => lowerCaseKey.includes(nameKey))) {
          return personalInfo[key];
        }
      }
    }
    return null;
  }
  