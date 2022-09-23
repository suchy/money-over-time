export const getFormDataObjectWithStringValues = (formData: FormData) => {
  const formDataEntries = Array.from(formData.entries());

  const initialFormDataObjectWithStringValues: Record<string, string> = {};

  const formDataObjectWithStringValues = formDataEntries.reduce(
    (formDataObjectWithStringValues, [key, value]) => {
      const newValue = typeof value === 'string' ? value : '';

      return { ...formDataObjectWithStringValues, [key]: newValue };
    },
    initialFormDataObjectWithStringValues
  );

  return formDataObjectWithStringValues;
};
