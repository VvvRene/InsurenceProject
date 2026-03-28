/**
 * Converts any flat or shallowly nested object into FormData.
 * Useful for handling file uploads alongside JSON data.
 */
export const toFormData = <T extends Record<string, any>>(data: T): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // 1. Skip null/undefined if you don't want them in the payload
    if (value === null || value === undefined) {
      return;
    }

    // 2. Handle standard JS Dates or Luxon/Dayjs objects
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } 
    // Check for common 'toISO' method in date libraries (Luxon/Dayjs)
    else if (typeof value.toISO === 'function') {
      formData.append(key, value.toISO());
    }
    // 3. Handle Files or Blobs (keep them as-is)
    else if (value instanceof Blob || value instanceof File) {
      formData.append(key, value);
    }
    // 4. Handle Objects/Arrays (must be stringified for FormData)
    else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    }
    // 5. Handle everything else (strings, numbers, booleans)
    else {
      formData.append(key, String(value));
    }
  });

  return formData;
};