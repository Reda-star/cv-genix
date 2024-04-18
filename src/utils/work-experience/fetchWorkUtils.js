export const fetchWorkExperience = (data) => {
  // Define possible names for the main object containing work experience data
  const possibleObjectNames = ['work_experience', 'workExperience','Works', 'work', 'experience','workExperienceData','work_experience_data'];
  
  // Iterate over possible object names to find the correct one
  let workExperienceData = null;
  for (const objectName of possibleObjectNames) {
      if (data && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, objectName)) {
          workExperienceData = data[objectName];
          break;
      }
  }

  // If no work experience data is found, return an empty array
  if (!workExperienceData) {
      return [];
  }

  // Define possible field names for each attribute
  const possibleTitleKeys = ['title', 'position', 'responsibility', 'perfection','job_title'];
  const possibleCompanyKeys = ['company', 'companyName', 'organization'];
  const possibleYearKeys = ['year', 'years', 'startYear','years_worked', 'endYear', 'start_date','start_year', 'endDate', 'beginYear', 'finishYear','date'];
  const possibleDescriptionKeys = ['description', 'overview', 'showcase','responsibilities'];

  // Add more possible field names as needed

  // Map each work experience object with dynamically determined field names
  const mappedWorkExperience = workExperienceData.map(work => ({
      position: findField(work, possibleTitleKeys) || '',
      companyName: findField(work, possibleCompanyKeys) || '',
      startDate: findField(work, possibleYearKeys) || '',
      workDescription: findField(work, possibleDescriptionKeys) || '' // Add more attributes as needed
  }));

  return mappedWorkExperience;
};

// Function to find the field in the work object based on possible field names
const findField = (work, possibleFieldNames) => {
  for (const fieldName of possibleFieldNames) {
      if (work[fieldName]) {
          return work[fieldName];
      }
  }
  return null; // Field not found
};
