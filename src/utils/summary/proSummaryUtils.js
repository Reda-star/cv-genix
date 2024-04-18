  

export function fetchSummaryFromData(data) {
    const summaryKeys = ['description', 'summary', 'professional_summary','professional summary', 'overview', 'profile']; // Add other possible key names here
    for (const key in data) {
      const value = data[key];
      if (typeof value === 'object') {
        const summary = fetchSummaryFromData(value);
        if (summary) {
          return summary;
        }
      } else {
        const lowerCaseKey = key.toLowerCase();
        if (summaryKeys.some((summaryKey) => lowerCaseKey.includes(summaryKey))) {
          return value;
        }
      }
    }
    return null;
  }

