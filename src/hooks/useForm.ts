import { useState } from "react";
import { IUseForm } from "../utils/types";

export const useForm = <T extends IUseForm>(inputValues: T) => {
  const [formValues, setFormValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  return { formValues, handleChange, setFormValues };
}