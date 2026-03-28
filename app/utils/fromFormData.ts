export const fromFormData = <T>(formData: FormData): Record<string, any> => {
  const data: Record<string, any> = {};

  formData.forEach((value, key) => {
    // Handle multiple values for the same key (arrays)
    if (data[key]) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  return data;
};