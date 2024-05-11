import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header/Header";
import Nav from "./Component/Nav";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Outlet />
      </div>
      <Nav />
    </>
  );
}

export default App;
