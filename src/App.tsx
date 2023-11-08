import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="max-w-[80%] m-auto">
      <Header />
      <main className="py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
