import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import GenericClass from "./components/GenericClass";
import EmojiAdmin from "./components/EmojiAdmin";
import MigrateData from "./components/MigrateData";
import ExportData from "./components/ExportData";
import CleanupStorage from "./components/CleanupStorage";

function App() {
  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/class/:classId" element={<GenericClass />} />
          <Route path="/admin" element={<EmojiAdmin />} />
          <Route path="/migrate" element={<MigrateData />} />
          <Route path="/backup" element={<ExportData />} />
          <Route path="/cleanup" element={<CleanupStorage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
