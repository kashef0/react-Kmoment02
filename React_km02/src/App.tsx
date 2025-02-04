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
          <Route  path="/DisplayPost" element={<DisplayPost />} />
          <Route  path="/CreateToDo" element={<CreateToDo />} />
        </Routes>
        <Footer Utvecklare={"Mohamed Abokashef"}/>
      </div>
    </>
  );
}

export default App;
