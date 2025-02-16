import AddToDo from "../../Models/AddToDo";
import ListToDO from "../../Models/DisplayPost";
import ErrorMessage from "../../Models/ValidateError";

 const validationForm = (data: AddToDo | ListToDO | null) => {
      const validationErrors: ErrorMessage = {};
  
      if (!data?.title) {
        validationErrors.title = "Fyll i title fält";
      } else if (data?.title.length < 3) {
        validationErrors.title = "Titel måste vara minst 3 tecken lång..";
      }
      if (!data?.description) {
        validationErrors.description = "Fyll i description fält";
      } else if(data?.description.length > 200) {
        validationErrors.description = "Beskrivning är valfri men får max vara 200 tecken";
      }

      if (!data?.state) {
        validationErrors.state = "välj ett val av state fält";
      }
  
      return validationErrors;
}

export default validationForm;