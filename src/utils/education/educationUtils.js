


const parseEducationData = (data) => {
  const possibleEducationKeys = ['education', 'learning', 'studies', 'education_background'];
  const institutionFieldNames = ['university', 'school', 'institution', 'college'];
  // eslint-disable-next-line no-unused-vars
  const degreeTitleFieldNames = ['degree', 'title', 'course'];
  const startDateFieldNames = ['startDate', 'start', 'year', 'begin', 'duration'];

  let educationData = null;

  for (const key of possibleEducationKeys) {
    if (data[key]) {
      educationData = data[key];
      break;
    }
  }

  if (educationData) {
    const mappedEducation = Object.entries(educationData).map(([degreeTitle, edu]) => ({
      institution: findField(edu, institutionFieldNames) || '',
      degreeTitle,
      startDate: findField(edu, startDateFieldNames) || '',
    }));

    return mappedEducation;
  } else {
    console.error('No education data found.');
    return [];
  }
};

const findField = (data, possibleFieldNames) => {
  for (const fieldName of possibleFieldNames) {
    if (data[fieldName]) {
      return data[fieldName];
    }
  }
  return null;
};

export default parseEducationData;