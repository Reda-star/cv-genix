

export function fetchTitleFromData(data) {
    const titleKeys = ['title', 'position', 'job', 'role']; 
    for (const key in data) {
      if (typeof data[key] === 'object') {
        const title = fetchTitleFromData(data[key]);
        if (title) {
          return title;
        }
      } else {
        const lowerCaseKey = key.toLowerCase();
        if (titleKeys.some((titleKey) => lowerCaseKey.includes(titleKey))) {
          return data[key];
        }
      }
    }
    return null;
  }
  
  