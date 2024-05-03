export function fetchAddressFromData(data) {
    const addressKeys = ['address', 'local', 'district']; 
    for (const key in data) {
      if (typeof data[key] === 'object') {
        const address = fetchAddressFromData(data[key]);
        if (address) {
          return address;
        }
      } else {
        const lowerCaseKey = key.toLowerCase();
        if (addressKeys.some((addressKey) => lowerCaseKey.includes(addressKey))) {
          return data[key];
        }
      }
    }
    return null;
  }
  