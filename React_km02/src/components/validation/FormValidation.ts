import AddToDo from "../../Models/AddToDo";
import ListToDO from "../../Models/DisplayPost";
import ErrorMessage from "../../Models/ValidateError";

 const validationForm = (data: AddToDo | ListToDO | null) => {
      const validationErrors: ErrorMessage = {};
  
      if (!data?.title) {
        validationErrors.title = "Fyll i title fält";
      }
      if (!data?.description) {
        validationErrors.description = "Fyll i description fält";
      }
      if (!data?.state) {
        validationErrors.state = "välj ett val av state fält";
      }
  
      return validationErrors;
}

export default validationForm;