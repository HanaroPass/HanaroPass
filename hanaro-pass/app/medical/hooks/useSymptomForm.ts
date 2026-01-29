'use client'

import { useState } from "react";

export default function useSymptomForm(){
  
  const [formValues, setFormValues] = useState({
    selectedSymptom: '',
    description: '',
  });

  const handleChange = (key: 'selectedSymptom' | 'description', value: string) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  };

  const isFilled =
    formValues.selectedSymptom.trim() !== '' &&
    formValues.description.trim() !== '';

  return {isFilled};
}