


export function fetchCityFromData(data) {
    const cityKeys = ['city', 'town', 'village', 'municipality', 'location']; 
    for (const key in data) {
      if (typeof data[key] === 'object') {
        const city = fetchCityFromData(data[key]);
        if (city) {
          return city;
        }
      } else {
        const lowerCaseKey = key.toLowerCase();
        if (cityKeys.some((cityKey) => lowerCaseKey.includes(cityKey))) {
          return data[key];
        }
      }
    }
    return null;
  }
  
  