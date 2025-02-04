import React, { useState } from 'react';
import AddToDo from '../../Models/AddToDo';
import ErrorMessage from '../../Models/ValidateError';
import './CreateToDo.css';
import { useNavigate } from "react-router-dom";
import validationForm from '../validation/FormValidation';


const CreateToDo = () => {
  const navigate = useNavigate(); // navigera till en annan sida efter skapande
  const selectList = ['ej påbörjad', 'pågående', 'avklarad']
  // hantera formulärdata
  const [formData, setFormData] = useState<AddToDo>({
    title: "",
    description: "",
    state: ""
  });

  // hantera valideringsfel
  const [error, setError] = useState<ErrorMessage>({});

  // hantera formulärinlämning
  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault(); // Förhindrar att sidan laddas om

    // Validering av formulärdata
    const validation = validationForm(formData);
    if (Object.keys(validation).length > 0) {
      setError(validation); // Sätter valideringsfel
      return; 
    }

    const apiUrl = import.meta.env.VITE_API_URL; 
    try {
      const res = await fetch(`${apiUrl}create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData), // Skickar formulärdata som JSON
      });

      if (!res.ok) {
        throw new Error("Kunde inte spara data");
      }

      // Återställer formuläret efter lyckad skapning
      setFormData({
        title: '',
        description: '',
        state: ''
      });

      setError({}); // Rensar eventuella tidigare felmeddelanden
      navigate('/DisplayPost'); // Navigerar till sidan 
      alert('Data sparad i databasen'); 
    } catch (error) {
      console.error('Fel vid sparande av data:', error);
    }
  };

  return (
    <>
      <form onSubmit={submitForm}>
        {error.title && (<p className="error-message">{error.title}</p>)}
        <label htmlFor="title">Titel</label>
        <input 
          type="text" 
          name="title" 
          id="title" 
          value={formData.title} 
          onChange={(event) => setFormData({ ...formData, title: event.target.value })} 
        />

        {error.description && (<p className="error-message">{error.description}</p>)}
        <label htmlFor="description">Beskrivning</label>
        <input 
          type="text" 
          name="description" 
          id="description" 
          value={formData.description} 
          onChange={(event) => setFormData({ ...formData, description: event.target.value })} 
        />


        {error.state && (<p className="error-message">{error.state}</p>)}
        <label htmlFor="state">Vilken status har den</label>
        <select 
          name="state" 
          id="state" 
          value={formData.state} 
          onChange={(event) => setFormData({ ...formData, state: event.target.value })} 
        >
          <option value="">--Välj ett val--</option>
          {selectList.map((el) => (
            <option value={el}>{el}</option>
          ))}
        </select>
        

        <input type="submit" value="Lägga till"/>
      </form>
    </>
  );
};

export default CreateToDo;
