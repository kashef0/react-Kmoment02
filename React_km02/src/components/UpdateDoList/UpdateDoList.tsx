import { useState, useEffect } from "react";
import ListToDO from "../../Models/DisplayPost";
import './UpdateDoList.css';
import validationForm from "../validation/FormValidation";
import ErrorMessage from "../../Models/ValidateError";

interface Props {
    onClose: () => void; // Funktion för att stänga formuläret
    id: string; // ID för den uppgift som ska uppdateras
    onUpdateSuccess: (success: boolean) => void; // meddela om uppdateringen lyckades
}
const selectList = ['ej påbörjad', 'pågående', 'avklarad']
const UpdateDoList = ({ id, onClose, onUpdateSuccess }: Props) => {
  // lagra uppgiften som ska uppdateras
  const [update, setUpdate] = useState<ListToDO | null>(null);

  // indikera om en process pågår 
  const [loading, setLoading] = useState(false);

  //lagra valideringsfel
  const [error, setError] = useState<ErrorMessage>({});

  // hämta den uppgift som ska uppdateras
  useEffect(() => {
    const fetchToDo = async () => {
      if (!id) return; 

      const apiUrl = import.meta.env.VITE_API_URL;
      setLoading(true); // Sätter laddningsstatus till true

      try {
        const res = await fetch(`${apiUrl}${id}`);

        if (!res.ok) {
          throw new Error("Kunde inte hämta data");
        }

        const data = await res.json();
        setUpdate(data); 
      } catch (error) {
        console.error("Fel vid hämtning av data:", error);
        alert("Kunde inte ladda uppgiften"); 
      } finally {
        setLoading(false); // Sätter laddningsstatus till false
      }
    };
    fetchToDo();
  }, [id]); // Körs om id ändras

  // Funktion för att hantera uppdateringsformuläret
  const updateForm = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validering av formulärdata
    const validation = validationForm(update);
    if (Object.keys(validation).length > 0) {
      setError(validation); // Sätter valideringsfel i state
      return; 
    } 

    if (!update) return; // Avbryter om ingen uppgift finns

    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${apiUrl}update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });

      if (!res.ok) {
        throw new Error("Kunde inte spara data");
      }

      const savedData = await res.json();
      onUpdateSuccess(true); // Meddelar att uppdateringen lyckades
      console.log("Data sparad:", savedData);
      alert("Data sparad i databasen"); 
      onClose(); // Stänger formuläret efter uppdatering
    } catch (error) {
      console.error("Fel vid sparande av data:", error);
      onUpdateSuccess(false); // Meddelar att uppdateringen misslyckades
      alert("Något gick fel vid uppdateringen");
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <p>Laddar...</p>;
  

  if (!update) return null;

  return (
    <div className="update-form">
      <h1>Uppdatera To-Do</h1>
      <form onSubmit={updateForm}>
        <div className="form-container">

          {error.title && (<p className="error-message">{error.title}</p>)}
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={update.title}
            onChange={(event) => setUpdate({ ...update, title: event.target.value })}
          />


          {error.description && (<p className="error-message">{error.description}</p>)}
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={update.description}
            onChange={(event) => setUpdate({ ...update, description: event.target.value })}
          />

          {error.state && (<p className="error-message">{error.state}</p>)}
          <label htmlFor="state">Status</label>
          <select
            id="state"
            value={update.state}
            onChange={(event) => setUpdate({ ...update, state: event.target.value })}
          >
            <option value="">--Välj ett val--</option>
            {selectList.map((el) => (
            <option key={el} value={el}>{el}</option>
            ))}
          </select>
        </div>

        {/* Knappar för att uppdatera eller avbryta */}
        <div className="btn-container">
          <button type="submit" disabled={loading}>
            {loading ? "Uppdaterar..." : "Uppdatera"}
          </button>
          <button type="button" onClick={onClose}>
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDoList;
