


const EducationData = (data) => {

  const possibleEducationKeys = ['education', 'learning', 'studies', 'education_background'];
  // Define possible field names for each education data point
  const institutionField = ['university', 'school', 'institution','college'];
  const degreeTitleField = ['degree', 'title', 'course'];
  const startDateField = ['startDate', 'start', 'year', 'begin','graduation_year', 'dates_attended','dates','duration'];
  
    let education = null;
  
    // Iterate through possible keys to find the education data
    for (const key of possibleEducationKeys) {
      if (data[key]) {
        education = data[key];
        break;
      }
    }
  
    if (education) {
      // Map the education data with dynamically determined field names
      const mappedEducation = education.map(edu => ({
        institution: findField(edu, institutionField) || '',
        degreeTitle: findField(edu, degreeTitleField) || '',
        startDate: findField(edu, startDateField) || '',
      }));
  
      return mappedEducation;
    } else {
      console.error('No education data found.');
      return [];
    }
  };
  
  // Function to find the field in the data object based on possible field names
  const findField = (data, possibleFieldNames) => {
    for (const fieldName of possibleFieldNames) {
      if (data[fieldName]) {
        return data[fieldName];
      }
    }
    return null; // Field not found
  };
  
  
  export default EducationData;

