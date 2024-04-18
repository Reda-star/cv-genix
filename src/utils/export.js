




//exporting Info section
  export const exportInfo = (name, email, phone, title, city) => {
    // Collect data from input fields
    const InfoData = {
      name,
      email,
      phone,
      title,
      city,
      // Add more fields as needed
    };
  
    // Example: Log resume data to console
    console.log('Resume Data:', InfoData);
  };



// summary section
export const exportSummary = (summary) => {
    // Collect data from input fields
    const SummaryData = {
      summary,
      // Add more fields as needed
    };

    // Example: Log resume data to console
    console.log('Summary Data:', SummaryData);
  };




// skills section
 export const exportSkills = (skills, selectedSkill, yearsOfExperience) => {
    // Combine the existing skills with the newly added skills
    const SkillsData = [...skills, { skill: selectedSkill, year: yearsOfExperience }];

    // Example: Log all skills to console
    console.log('All Skills:', SkillsData);
    // You can perform any other actions here, such as saving to a file or sending to an API
};


export const exportWorkExperience = (workExperienceList, companyName, position, startDate, endDate, workDescription) => {
    // Combine fetched work experience data with dynamically added entries
    const WorkExperienceData = [...workExperienceList, { companyName, position, startDate, endDate, workDescription }];
    
    console.log('Work Experience Data:', WorkExperienceData);
};

