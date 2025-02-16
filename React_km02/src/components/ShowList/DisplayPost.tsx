import { useEffect, useState } from 'react'
import ListToDO from '../../Models/DisplayPost';
import UpdateDoList from '../UpdateDoList/UpdateDoList';
import './DisplayPost.css';


const DisplayPost = () => {
  
  // lagra inlägg
  const [posts, setPosts] = useState<ListToDO[] | []>([]);

  // hålla koll på vilken uppgift som ska uppdateras
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // State för felmeddelanden
  const [error, setError] = useState<string | null>(null);

  // indikera om data laddas
  const [isLoading, setIsLoading] = useState(false);

  // trigga en uppdatering när en uppgift har ändrats
  const [isUpdated, setIsUpdated] = useState(false);

  //  hantera uppdateringsstatus
  const handleUpdateSuccess = (success: boolean) => {
    if (success) {
      setIsUpdated((isUpdated) => !isUpdated); // Växlar värdet så att useEffect körs igen
    }
  };

  // hämta uppgifter vid sidladdning och efter uppdatering
  useEffect(() => {
    const getPosts = async () => {
      const apiUrl = import.meta.env.VITE_API_URL; 
      
      try {
        setIsLoading(true); 
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error('Det gick inte att hämta inlägg');
        } else {
          const data = await res.json();
          setPosts(data); // Sparar data i state
        }
        setError(''); // Nollställer eventuella felmeddelanden
      } catch (error) {
        console.error(error);
        setError('Något fel hände vid hämtning av inlägg, försök senare....');
      } finally {
        setIsLoading(false); // Sätter laddningsstatus till false
      }
    };

    getPosts();
  }, [isUpdated]); // Körs om `isUpdated` ändras

  // Funktion för att ta bort en uppgift
  const deleteToDo = async (id: string) => {
    const orginalPosts = [...posts]; // Sparar originaldata om något går fel
    setPosts(posts.filter((doList) => doList._id !== id)); 
    
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const deleteToDo = await fetch(`${apiUrl}delete/${id}`, {
        method: 'DELETE',
      });

      if (!deleteToDo.ok) {
        throw new Error('Misslyckades att ta bort item..');
      }

      setError(''); // Rensar felmeddelande om det lyckas
    } catch (error: unknown) {
      console.error(error);
      setError('Misslyckades att ta bort item..');
      setPosts(orginalPosts); // Återställer listan om borttagningen misslyckas
    }
  };

  // Funktion för att returnera klass baserat på status
  const getStatusClass = (state: string) => {
    if (state === "avklarad") {
      return "state-finished";
    } else if (state === "pågående") {
      return "state-start"; 
    } else if (state === "ej påbörjad") {
      return "state-not-start"; 
    }
    return "";
  };

  return (
    <> 
      {/* Visar laddningsindikator om data hämtas */}
      {isLoading && (
        <div className='loading'>
          <p>Loading...</p>
          <img src="https://media.tenor.com/hVRhFeDFW6oAAAAi/anime-wave.gif" alt="anime-wave" />
        </div>
      )}
      
      {/* Visar felmeddelande om det finns ett fel */}
      {error && <p className='error'>{error}</p>}

      {isLoading && <h1>Att göra</h1>}

      <div className="card">
        {/* Loopa igenom uppgifterna och visa dem */}
        {posts.map((element) => (
          <div className="card-body" key={element._id} aria-disabled={true}>
            <section className='section-container'>
              <h2 className="card-title">Title: <span className='title-span'>{element.title}</span></h2>
              <p className="card-subtitle"><strong>Beskrivning:</strong> {element.description}</p>
              {/* Status med dynamisk färg beroende på status */}
              <p className="card-text">Status: <span className={getStatusClass(element.state)}>{element.state}</span></p>
            </section>
            <div className='btn-container'>
              {/* Knapp för att uppdatera uppgift */}
              <button onClick={() => setSelectedId(element._id)}>Uppdatera</button>
              {/* Knapp för att ta bort uppgift */}
              <button onClick={() => deleteToDo(element._id)}>Radera</button>
            </div>
          </div>
        ))}
      </div>

      {/* Visar uppdateringsformuläret om en uppgift valts */}
      {selectedId && (
        <UpdateDoList 
          onUpdateSuccess={handleUpdateSuccess} 
          id={selectedId} 
          onClose={() => setSelectedId(null)} 
        />
      )}
    </>
  );
}

export default DisplayPost;
