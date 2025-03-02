import { useState } from "react";
import star from "../assets/star.png";

export default function Header({ classId }) {
  const [editableTexts, setEditableTexts] = useState(() => {
    const storedTexts = localStorage.getItem(`editableTexts_${classId}`);
    return storedTexts
      ? JSON.parse(storedTexts)
      : {
          nivel: "NIVEL 6",
          semana: "SEMANA 3",
          dia: "DIA 3",
          theme: "Presente Simple",
        };
  });

  const [isEditing, setIsEditing] = useState({
    nivel: false,
    semana: false,
    dia: false,
    theme: false,
  });

  const handleEdit = (key) => {
    setIsEditing((prev) => ({ ...prev, [key]: true }));
  };

  const handleSave = (key, value) => {
    // Guardar el valor incluso si está vacío, pero asegurar que el componente sepa que está vacío
    const updatedTexts = { ...editableTexts, [key]: value };
    setEditableTexts(updatedTexts);
    setIsEditing((prev) => ({ ...prev, [key]: false }));
    localStorage.setItem(
      `editableTexts_${classId}`,
      JSON.stringify(updatedTexts)
    );
  };

  const handleKeyDown = (e, key) => {
    if (e.key === "Enter") {
      handleSave(key, e.target.value);
    }
  };

  return (
    <div className="flex w-full py-8 font-semibold">
      <div>
        {Object.entries(editableTexts)
          .slice(0, 3)
          .map(([key, value]) => (
            <div key={key}>
              {isEditing[key] ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setEditableTexts((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => handleKeyDown(e, key)}
                  onBlur={() => handleSave(key, editableTexts[key])}
                  placeholder={key.toUpperCase()}
                  autoFocus
                />
              ) : (
                <h1
                  className="editable-text cursor-pointer min-h-8 min-w-20 px-1 border border-transparent hover:border-gray-200 rounded"
                  data-key={key}
                  onClick={() => handleEdit(key)}
                >
                  {value || (
                    <span className="text-gray-400 italic">Editar {key}</span>
                  )}
                </h1>
              )}
            </div>
          ))}
      </div>
      <div className="ms-auto me-auto flex flex-col gap-5 items-center font-bold">
        <h1>WALL OF FAME</h1>
        <div className="flex items-center gap-5">
          <img className="w-10" src={star} alt="star" />
          <h1>TEMA Y PREGUNTA DE LA SEMANA</h1>
          <img className="w-10" src={star} alt="star" />
        </div>

        {/* Sección para el tema que es editable */}
        {isEditing.theme ? (
          <input
            type="text"
            value={editableTexts.theme}
            onChange={(e) =>
              setEditableTexts((prev) => ({ ...prev, theme: e.target.value }))
            }
            onKeyDown={(e) => handleKeyDown(e, "theme")}
            onBlur={() => handleSave("theme", editableTexts.theme)}
            placeholder="Tema de la semana"
            className="text-center p-1 min-w-40"
            autoFocus
          />
        ) : (
          <h1
            className="editable-text cursor-pointer min-h-8 min-w-40 px-2 py-1 border border-transparent hover:border-gray-200 rounded text-center"
            data-key="theme"
            onClick={() => handleEdit("theme")}
          >
            {editableTexts.theme || (
              <span className="text-gray-400 italic">
                Haz clic para editar el tema
              </span>
            )}
          </h1>
        )}
      </div>
    </div>
  );
}
