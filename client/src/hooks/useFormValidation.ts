import { useState, useEffect } from 'react';

type FormData = {
  name: string;
  exitFromProcess: string;
  VDlink: string;
  status: 'main' | 'supporting' | 'administering';
  processOwnerId?: string | number;
  analystId?: string | number;
}

export const useFormValidation = (initialFormData: FormData) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    setIsNameValid(formData.name.trim() !== '');
  }, [formData.name])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'name') {
      setIsNameValid(value.trim() !== '');
    }
  };

  const handleChangeProcessStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      status: value as 'main' | 'supporting' | 'administering',
    }));
  };

  const isChecked = (value: string) => formData.status === value;

  const isValid = () => {
    return isNameValid;
  };

  return {
    formData,
    handleChange,
    handleChangeProcessStatus,
    isChecked,
    isValid,
    setFormData,
  };
};
