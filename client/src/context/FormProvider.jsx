import { useState, createContext } from "react";

export const formContext = createContext();

const FormProvider = ({ children }) => {
  const [showForm, setForm] = useState(0);
  return (
    <formContext.Provider value={{ showForm, setForm }}>
      {children}
    </formContext.Provider>
  );
};

export default FormProvider;
