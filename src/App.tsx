import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import QuickToast from "./components/QuickToast";

function App() {
  return (
    <div className="max-w-[80%] m-auto">
      <QuickToast />
      <Header />
      <main className="py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
