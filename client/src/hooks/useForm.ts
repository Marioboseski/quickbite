import { useState } from "react";
import type { SubmitEvent as ReactFormEvent, ChangeEvent as ReactChangeEvent } from "react";

type FormErrors = Record<string, string>;

export const useForm = <T extends object> (initialValues: T, validate: (values: T) => Record<string, string>, onSubmit: (values: T) => void) => {
  const [ values, setValues ] = useState(initialValues);
  const [ errors, setErrors ] = useState<FormErrors>({});

  const handleChange = (e: ReactChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValues = {...values, [name]: value};
    setErrors(validate(newValues));
    setValues(newValues);
  }

  const handleSubmit = (e: ReactFormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      setValues(initialValues);
    }
  };

  return { errors, values, handleChange, handleSubmit }
}