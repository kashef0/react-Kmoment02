import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateToDo from "./components/CreateToDo/CreateToDo";
import Nav from "./components/NavMenu";
import DisplayPost from "./components/ShowList/DisplayPost";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <div className="container">
        <Nav />

        <Routes >
          <Route  path="/" element={<DisplayPost />} />
          <Route  path="/DisplayPost" element={<DisplayPost />} />
          <Route  path="/CreateToDo" element={<CreateToDo />} />
          <Route  path="*" element={<h1>404 - kunde inte hitta sidan, försök senare....</h1>} />
        </Routes>
        <Footer Utvecklare={"Mohamed Abokashef"}/>
      </div>
    </>
  );
}

export default App;
