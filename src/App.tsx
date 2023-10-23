import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="py-8">
        <Outlet />
      </main>
    </>
  );
}

export default App;
