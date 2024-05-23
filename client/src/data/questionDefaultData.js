import { v4 as uuidv4 } from "uuid";

const generateNewID = () => {
  return uuidv4();
};
export const generateDefaultData = () => {
  return {
    id: generateNewID(),
    title: "",
    choiceType: "Text",
    options: [
      { id: generateNewID(), text: "", url: "" },
      { id: generateNewID(), text: "", url: "" },
    ],
  };
};
