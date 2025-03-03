import { useState } from "react";
import { Link } from "react-router-dom";

const ExportData = () => {
  const [exported, setExported] = useState(false);
  const [importStatus, setImportStatus] = useState("");
  const [importFile, setImportFile] = useState(null);

  const exportLocalStorage = () => {
    try {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
      }

      // Convertir a JSON y codificar para descargar
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(data));

      // Crear enlace de descarga
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "classroom_data_backup.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();

      setExported(true);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Error al exportar datos: " + error.message);
    }
  };

  const handleFileChange = (e) => {
    setImportFile(e.target.files[0]);
  };

  const importData = () => {
    if (!importFile) {
      setImportStatus("Por favor selecciona un archivo de respaldo");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Confirmar antes de sobrescribir
        if (
          window.confirm(
            "Esto reemplazará todos los datos existentes. ¿Estás seguro?"
          )
        ) {
          // Limpiar localStorage actual
          localStorage.clear();

          // Restaurar datos
          for (const key in data) {
            localStorage.setItem(key, data[key]);
          }

          setImportStatus(
            "¡Datos restaurados exitosamente! Recarga la página para ver los cambios."
          );
        }
      } catch (error) {
        console.error("Error importing data:", error);
        setImportStatus("Error al importar datos: " + error.message);
      }
    };

    reader.readAsText(importFile);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Respaldo de Datos</h1>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver a la aplicación
        </Link>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-bold mb-2">Información importante</h2>
        <p className="mb-2">
          Esta página te permite crear una copia de seguridad de todos tus datos
          y restaurarlos si es necesario.
        </p>
        <p>
          <strong>Recomendación:</strong> Crea respaldos periódicos para evitar
          pérdida de información.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Exportar datos</h2>
        <p className="mb-4">
          Haz clic en el botón para descargar un archivo con todos tus datos
          actuales.
        </p>
        <button
          onClick={exportLocalStorage}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear respaldo
        </button>
        {exported && (
          <p className="mt-2 text-green-600">
            ¡Respaldo creado exitosamente! Revisa tus descargas.
          </p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Importar datos</h2>
        <p className="mb-4">
          Selecciona un archivo de respaldo previamente guardado para restaurar
          tus datos.
        </p>
        <div className="mb-4">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button
          onClick={importData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!importFile}
        >
          Restaurar datos
        </button>
        {importStatus && (
          <p
            className={`mt-2 ${
              importStatus.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {importStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExportData;
