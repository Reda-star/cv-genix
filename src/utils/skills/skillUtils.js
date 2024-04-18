

export const fetchSkills = (data) => {
  if (!data) return [];

  if (Array.isArray(data)) {
    // If data is an array, assume it's an array of strings or objects
    if (data.length === 0) return [];

    // Check if the first element is a string or an object
    const firstElement = data[0];
    if (typeof firstElement === 'string') {
      // If the array contains strings, convert them to skill objects
      return data.map((skill) => ({ skill, year: null }));
    } else if (typeof firstElement === 'object' && firstElement !== null) {
      // If the array contains objects, assume they are skill objects already
      return data.filter(skillObj => typeof skillObj === 'object' && Object.prototype.hasOwnProperty.call(skillObj, 'skill'));
    }
  } else if (typeof data === 'object') {
    // If data is an object, assume it contains skills directly
    if (Object.prototype.hasOwnProperty.call(data, 'skills')) {
      const skillsData = data.skills;

      if (typeof skillsData === 'object' && !Array.isArray(skillsData)) {
        // If skillsData is an object, convert it to an array of skill objects
        return Object.entries(skillsData).map(([skill, year]) => ({ skill, year }));
      } else if (Array.isArray(skillsData)) {
        // If skillsData is an array, handle it separately
        return fetchSkills(skillsData);
      }
    }
  }

  return [];
};

export default fetchSkills