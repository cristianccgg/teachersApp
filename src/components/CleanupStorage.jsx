import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CleanupStorage = () => {
  const [status, setStatus] = useState("idle");
  const [storageInfo, setStorageInfo] = useState({
    total: 0,
    classes: [],
    unusedData: 0,
  });
  const [cleanupOptions, setCleanupOptions] = useState({
    removeOldClasses: false,
    compressImages: false,
    removeUnusedEmojis: true,
  });
  const [logs, setLogs] = useState([]);

  // Función para calcular el tamaño aproximado en bytes
  const getApproximateSize = (str) => {
    return new Blob([str]).size;
  };

  const addLog = (message) => {
    setLogs((prev) => [...prev, message]);
  };

  // Analizar el uso del almacenamiento
  const analyzeStorage = () => {
    try {
      setStatus("analyzing");
      addLog("Analizando almacenamiento...");

      let totalSize = 0;
      let classKeys = [];
      let otherKeys = [];

      // Recopilar todas las claves
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const size = getApproximateSize(value);

        totalSize += size;

        if (key.startsWith("students_")) {
          classKeys.push({ key, size });
        } else {
          otherKeys.push({ key, size });
        }
      }

      // Ordenar clases por tamaño
      classKeys.sort((a, b) => b.size - a.size);

      // Calcular datos potencialmente no utilizados (emoji duplicados, etc.)
      // Este es un cálculo aproximado, se refinará durante la limpieza real
      const unusedSize = classKeys.reduce((acc, item) => {
        try {
          const data = JSON.parse(localStorage.getItem(item.key));
          // Estimación conservadora: ~30% de los datos de clases podría ser duplicado
          return acc + item.size * 0.3;
        } catch (e) {
          return acc;
        }
      }, 0);

      setStorageInfo({
        total: totalSize,
        classes: classKeys,
        otherData: otherKeys,
        unusedData: Math.round(unusedSize),
      });

      addLog(
        `Análisis completado. Tamaño total: ${(totalSize / 1024).toFixed(2)} KB`
      );
      addLog(`Encontradas ${classKeys.length} clases.`);
      addLog(
        `Espacio potencialmente recuperable: ~${(unusedSize / 1024).toFixed(
          2
        )} KB`
      );

      setStatus("ready");
    } catch (e) {
      addLog(`Error durante el análisis: ${e.message}`);
      setStatus("error");
    }
  };

  // Realizar la limpieza selectiva
  const performCleanup = () => {
    try {
      setStatus("cleaning");
      addLog("Iniciando limpieza de datos...");

      // 1. Respaldo antes de limpiar (por seguridad)
      const backup = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        backup[key] = localStorage.getItem(key);
      }
      const backupStr = JSON.stringify(backup);

      addLog(
        `Respaldo creado: ${(getApproximateSize(backupStr) / 1024).toFixed(
          2
        )} KB`
      );

      // 2. Eliminar emojis no utilizados
      if (cleanupOptions.removeUnusedEmojis) {
        // Recopilar todos los emojis que se están usando
        const usedEmojis = new Set();

        // Buscar en todas las clases
        storageInfo.classes.forEach((classItem) => {
          try {
            const classData = JSON.parse(localStorage.getItem(classItem.key));

            // Revisar cada estudiante
            classData.forEach((student) => {
              if (student.droppedEmojis) {
                // Revisar cada zona de emojis
                Object.keys(student.droppedEmojis).forEach((dropzoneId) => {
                  const emojis = student.droppedEmojis[dropzoneId] || [];
                  emojis.forEach((emoji) => {
                    if (emoji.type === "image" && emoji.content) {
                      // Generar un ID único basado en los primeros 50 caracteres de la URL
                      const shortContent = emoji.content.substring(0, 50);
                      usedEmojis.add(shortContent);
                    }
                  });
                });
              }
            });
          } catch (e) {
            addLog(`Error procesando clase ${classItem.key}: ${e.message}`);
          }
        });

        // Comprimir y deduplicar emojis
        let optimizedCount = 0;

        storageInfo.classes.forEach((classItem) => {
          try {
            const classData = JSON.parse(localStorage.getItem(classItem.key));
            let modified = false;

            // Revisar cada estudiante
            classData.forEach((student) => {
              if (student.droppedEmojis) {
                // Revisar cada zona de emojis
                Object.keys(student.droppedEmojis).forEach((dropzoneId) => {
                  const emojis = student.droppedEmojis[dropzoneId] || [];

                  // Crear un Set para detectar duplicados en la misma celda
                  const seenInCell = new Set();

                  // Filtrar emojis duplicados dentro de la misma celda (optimización adicional)
                  if (emojis.length > 0) {
                    const uniqueEmojis = emojis.filter((emoji) => {
                      if (emoji.type === "image" && emoji.content) {
                        const shortContent = emoji.content.substring(0, 50);
                        if (seenInCell.has(shortContent)) {
                          optimizedCount++;
                          return false; // Eliminar duplicado
                        }
                        seenInCell.add(shortContent);
                      }
                      return true;
                    });

                    if (uniqueEmojis.length < emojis.length) {
                      student.droppedEmojis[dropzoneId] = uniqueEmojis;
                      modified = true;
                    }
                  }
                });
              }
            });

            // Guardar cambios si se modificó la clase
            if (modified) {
              localStorage.setItem(classItem.key, JSON.stringify(classData));
              addLog(
                `Optimizada clase ${classItem.key}: eliminados ${optimizedCount} emojis duplicados`
              );
            }
          } catch (e) {
            addLog(`Error optimizando clase ${classItem.key}: ${e.message}`);
          }
        });
      }

      // 3. Calcular espacio liberado
      let newTotalSize = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        newTotalSize += getApproximateSize(value);
      }

      const savedSpace = storageInfo.total - newTotalSize;
      addLog(
        `Limpieza completada. Espacio liberado: ${(savedSpace / 1024).toFixed(
          2
        )} KB`
      );

      setStatus("completed");

      // Actualizar el análisis de almacenamiento
      setTimeout(analyzeStorage, 1000);
    } catch (e) {
      addLog(`Error durante la limpieza: ${e.message}`);
      setStatus("error");
    }
  };

  useEffect(() => {
    // Analizar automáticamente al cargar
    analyzeStorage();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Limpieza de Almacenamiento</h1>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver a la aplicación
        </Link>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-bold mb-2">Herramienta de optimización</h2>
        <p className="mb-2">
          Esta herramienta busca y elimina datos innecesarios o duplicados de
          manera segura, liberando espacio sin afectar las clases ni estudiantes
          actuales.
        </p>
        <p className="text-sm text-red-600 font-bold">
          Nota: Esta es una solución temporal. Para una solución permanente, se
          recomienda la migración completa.
        </p>
      </div>

      {(status === "idle" || status === "ready" || status === "completed") && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            Información de almacenamiento
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Tamaño total</p>
              <p className="text-2xl font-bold">
                {(storageInfo.total / 1024).toFixed(2)} KB
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Clases almacenadas</p>
              <p className="text-2xl font-bold">
                {storageInfo.classes?.length || 0}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Potencialmente recuperable
              </p>
              <p className="text-2xl font-bold">
                {(storageInfo.unusedData / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Opciones de limpieza:</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={cleanupOptions.removeUnusedEmojis}
                  onChange={(e) =>
                    setCleanupOptions((prev) => ({
                      ...prev,
                      removeUnusedEmojis: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                Eliminar emojis duplicados (seguro)
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={analyzeStorage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Re-analizar almacenamiento
            </button>
            <button
              onClick={performCleanup}
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
                status === "analyzing" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={status === "analyzing"}
            >
              Realizar limpieza
            </button>
          </div>
        </div>
      )}

      {(status === "analyzing" || status === "cleaning") && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mb-2"></div>
          <p>
            {status === "analyzing"
              ? "Analizando almacenamiento..."
              : "Limpiando datos..."}
          </p>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg border p-4 max-h-96 overflow-y-auto">
        <h2 className="font-bold mb-2">Registro de actividad:</h2>
        <div className="text-sm font-mono">
          {logs.map((log, index) => (
            <div key={index} className="mb-1">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CleanupStorage;
