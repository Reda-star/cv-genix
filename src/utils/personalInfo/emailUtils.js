


export function fetchEmailFromData(data) {
    const emailKeys = ['email', "email_address", 'mail', 'e-mail', 'e_mail', 'e mail']; 
    for (const key in data) {
      if (typeof data[key] === 'object') {
        const email = fetchEmailFromData(data[key]);
        if (email) {
          return email;
        }
      } else {
        const lowerCaseKey = key.toLowerCase();
        if (emailKeys.some((emailKey) => lowerCaseKey.includes(emailKey))) {
          return data[key];
        }
      }
    }
    return null;
  }
  
  