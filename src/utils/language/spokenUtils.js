
const findSpokenLanguages = (data) => {
    // Function to recursively search for the "languages" field
    const searchLanguages = (obj) => {
        for (const key in obj) {
            if (key.toLowerCase().includes('languages') || key.toLowerCase().includes('spoken')) {
                const value = obj[key];
                if (Array.isArray(value)) {
                    return value; // Found an array of languages
                } else if (typeof value === 'object') {
                    return Object.keys(value); // Convert object keys to array of languages
                }
            } else if (typeof obj[key] === 'object') {
                const result = searchLanguages(obj[key]); // Continue searching recursively
                if (result) return result;
            }
        }
        return null; // "languages" field not found
    };

    // Start the search from the top-level data object
    return searchLanguages(data);
};


export default findSpokenLanguages







// const findSpokenLanguages = (data) => {
//     const languageKeys = ['language', 'languages','spoken', 'speak', 'talk']; 
//     for (const key in data) {
//       if (typeof data[key] === 'object') {
//         const language = findSpokenLanguages(data[key]);
//         if (language) {
//           return language;
//         }
//       } else {
//         const lowerCaseKey = key.toLowerCase();
//         if (languageKeys.some((languageKey) => lowerCaseKey.includes(languageKey))) {
//           return data[key];
//         }
//       }
//     }
//     return null;
//   }

// export default findSpokenLanguages;






// const findSpokenLanguages = (data) => {
//     const possibleKeys = ['talk', 'languages', 'spoken'];

//     let spokenLanguages = null;

//     // Iterate through the possible keys array
//     for (let i = 0; i < possibleKeys.length; i++) {
//         const key = possibleKeys[i];
//         if (data.languages && data.languages[key]) {
//             // If the key exists in the data object, assign its value to spokenLanguages
//             spokenLanguages = data.languages[key];
//             break; // Exit the loop once a key is found
//         }
//     }

//     if (spokenLanguages) {
//         if (Array.isArray(spokenLanguages)) {
//             // If spokenLanguages is an array, return it directly
//             return spokenLanguages;
//         } else if (typeof spokenLanguages === 'object') {
//             // If spokenLanguages is an object, extract its keys and return them as an array
//             const spokenKeys = Object.keys(spokenLanguages);
//             return spokenKeys;
//         } else {
//             // Handle other cases if necessary
//             return null;
//         }
//     } else {
//         // Handle the case where no suitable key is found
//         console.error('No suitable key found for spoken languages.');
//         return null;
//     }
// };

// export default findSpokenLanguages;
