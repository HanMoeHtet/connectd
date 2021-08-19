export const getFormData = (obj: any) => {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => formData.append(key, obj[key as any]));
  return formData;
};
