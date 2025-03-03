import { useState, useEffect } from "react";

// Componente para migrar datos de clases existentes al nuevo formato de referencias
const MigrateData = () => {
  const [status, setStatus] = useState("idle"); // idle, migrating, success, error
  const [progress, setProgress] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [processedClasses, setProcessedClasses] = useState(0);
  const [logMessages, setLogMessages] = useState([]);

  // Función para generar un ID único para cada emoji
  const generateEmojiId = (content, type) => {
    // Usar solo los primeros 50 caracteres para emojis de tipo imagen (URLs largas)
    const contentKey = type === "image" ? content.substring(0, 50) : content;
    return `${type}_${contentKey}`;
  };

  const addLogMessage = (message) => {
    setLogMessages((prev) => [...prev, message]);
  };

  const migrateData = async () => {
    try {
      setStatus("migrating");
      setProgress(0);
      setLogMessages([]);
      addLogMessage("Iniciando migración de datos...");

      // 1. Recopilar todas las claves del localStorage
      const allKeys = Object.keys(localStorage);

      // 2. Identificar claves de clases (estudiantes)
      const classKeys = allKeys.filter((key) => key.startsWith("students_"));
      setTotalClasses(classKeys.length);
      addLogMessage(`Encontradas ${classKeys.length} clases para migrar.`);

      // 3. Inicializar o cargar el repositorio de referencias de emojis
      let emojiReferences = {};
      try {
        const savedRefs = localStorage.getItem("emojiReferences");
        if (savedRefs) {
          emojiReferences = JSON.parse(savedRefs);
          addLogMessage("Repositorio de emojis existente cargado.");
        }
      } catch (e) {
        addLogMessage("Creando nuevo repositorio de emojis.");
      }

      // 4. Procesar cada clase
      for (let i = 0; i < classKeys.length; i++) {
        const classKey = classKeys[i];
        const classId = classKey.replace("students_", "");
        addLogMessage(
          `Procesando clase ${i + 1}/${classKeys.length}: ${classId}`
        );

        try {
          // Cargar datos de estudiantes
          const studentsData = JSON.parse(localStorage.getItem(classKey));

          // Crear versión migrada de los datos
          const migratedStudents = studentsData.map((student) => {
            // Clonar estudiante para no modificar el original
            const migratedStudent = { ...student };

            // Verificar si tiene emojis
            if (student.droppedEmojis) {
              migratedStudent.droppedEmojis = {};

              // Procesar cada zona de emojis
              Object.keys(student.droppedEmojis).forEach((dropzoneId) => {
                const droppedItems = student.droppedEmojis[dropzoneId] || [];

                // Migrar emojis a referencias
                migratedStudent.droppedEmojis[dropzoneId] = droppedItems.map(
                  (item) => {
                    // Si ya es una referencia, mantenerla
                    if (item.refId) return item;

                    // Crear ID para este emoji
                    const refId = generateEmojiId(item.content, item.type);

                    // Almacenar en repositorio si no existe
                    if (!emojiReferences[refId]) {
                      emojiReferences[refId] = {
                        type: item.type,
                        content: item.content,
                      };
                    }

                    // Devolver referencia
                    return {
                      type: item.type,
                      refId: refId,
                    };
                  }
                );
              });
            }

            return migratedStudent;
          });

          // Guardar estudiantes migrados
          localStorage.setItem(classKey, JSON.stringify(migratedStudents));
          addLogMessage(`✓ Clase ${classId} migrada exitosamente.`);
        } catch (error) {
          addLogMessage(`❌ Error migrando clase ${classId}: ${error.message}`);
        }

        setProcessedClasses(i + 1);
        setProgress(Math.round(((i + 1) / classKeys.length) * 100));
      }

      // 5. Guardar repositorio de emojis
      localStorage.setItem("emojiReferences", JSON.stringify(emojiReferences));
      const uniqueEmojiCount = Object.keys(emojiReferences).length;
      addLogMessage(
        `Repositorio de emojis guardado con ${uniqueEmojiCount} emojis únicos.`
      );

      setStatus("success");
      addLogMessage("¡Migración completada exitosamente!");
    } catch (error) {
      setStatus("error");
      addLogMessage(`Error durante la migración: ${error.message}`);
      console.error("Migration error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Migración de Datos</h1>
        <p className="mb-4">
          Esta herramienta migrará tus datos existentes al nuevo formato de
          almacenamiento más eficiente.
          <strong className="block mt-2 text-red-600">
            IMPORTANTE: Por favor, haz una copia de seguridad antes de
            continuar.
          </strong>
        </p>
      </div>

      {status === "idle" && (
        <div className="text-center mb-8">
          <button
            onClick={migrateData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          >
            Iniciar Migración
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Este proceso puede tomar unos momentos dependiendo de la cantidad de
            datos.
          </p>
        </div>
      )}

      {status === "migrating" && (
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
            <div
              className="bg-blue-600 h-6 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center">
            Migrando datos... {progress}% completado ({processedClasses}/
            {totalClasses} clases)
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="mb-8 text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">¡Éxito!</strong>
            <span className="block sm:inline">
              {" "}
              La migración se ha completado correctamente.
            </span>
          </div>
          <p>
            Ahora puedes usar la aplicación con el nuevo sistema de
            almacenamiento optimizado.
          </p>
          <a
            href="/"
            className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Ir a la aplicación
          </a>
        </div>
      )}

      {status === "error" && (
        <div className="mb-8 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">
              {" "}
              Hubo un problema durante la migración.
            </span>
          </div>
          <button
            onClick={migrateData}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reintentar
          </button>
        </div>
      )}

      <div className="border rounded-lg bg-gray-50 p-4 max-h-96 overflow-y-auto">
        <h2 className="font-bold mb-2">Registro de migración:</h2>
        <div className="text-sm font-mono">
          {logMessages.map((msg, index) => (
            <div key={index} className="mb-1">
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MigrateData;
