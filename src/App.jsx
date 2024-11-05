import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import GenericClass from "./components/GenericClass";

function App() {
  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/class/:classId" element={<GenericClass />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
