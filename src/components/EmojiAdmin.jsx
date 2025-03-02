import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EmojiAdmin = () => {
  // Get emojis from localStorage or use default values
  const [emojiGroups, setEmojiGroups] = useState(() => {
    const savedEmojis = localStorage.getItem("customEmojis");
    if (savedEmojis) {
      return JSON.parse(savedEmojis);
    } else {
      // Default structure with initial groups
      return {
        participationImages: [],
        generalEmojis: [
          { type: "emoji", content: "&#9200;", description: "Entró a tiempo" },
          {
            type: "emoji",
            content: "&#128248;",
            description: "Mantuvo la cámara encendida",
          },
        ],
        dragonEmojis: [],
        automaticFluency: [
          {
            type: "emoji",
            content: "&#128150;",
            description: "Ya casi, sigue practicando",
          },
        ],
        weeklyEvaluation: [],
      };
    }
  });

  const [newEmoji, setNewEmoji] = useState({
    type: "emoji",
    content: "",
    description: "",
  });
  const [selectedGroup, setSelectedGroup] = useState("participationImages");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragItem, setDragItem] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Save to localStorage whenever emojiGroups changes
  useEffect(() => {
    localStorage.setItem("customEmojis", JSON.stringify(emojiGroups));
  }, [emojiGroups]);

  const handleInputChange = (e) => {
    setNewEmoji({
      ...newEmoji,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEmoji({
          ...newEmoji,
          type: "image",
          content: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addEmoji = () => {
    if (
      (newEmoji.type === "emoji" && newEmoji.content) ||
      (newEmoji.type === "image" && newEmoji.content)
    ) {
      setEmojiGroups((prev) => ({
        ...prev,
        [selectedGroup]: [...prev[selectedGroup], { ...newEmoji }],
      }));
      setNewEmoji({ type: "emoji", content: "", description: "" });
      setSelectedFile(null);
      setShowUploadForm(false);
    }
  };

  const removeEmoji = (index) => {
    setEmojiGroups((prev) => ({
      ...prev,
      [selectedGroup]: prev[selectedGroup].filter((_, i) => i !== index),
    }));
  };

  const handleDragStart = (e, index) => {
    setDragItem(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragItem === null) return;

    const newItems = [...emojiGroups[selectedGroup]];
    const draggedItem = newItems[dragItem];

    // Remove the dragged item
    newItems.splice(dragItem, 1);
    // Insert at the new position
    newItems.splice(dropIndex, 0, draggedItem);

    setEmojiGroups((prev) => ({
      ...prev,
      [selectedGroup]: newItems,
    }));

    setDragItem(null);
  };

  const renderEmoji = (item) => {
    if (item.type === "emoji") {
      return (
        <span
          className="text-3xl"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      );
    } else {
      return (
        <img
          src={item.content}
          alt={item.description || "Emoji"}
          className="w-10 h-10 object-contain"
        />
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administrador de Emojis</h1>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver a la aplicación
        </Link>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">
          Selecciona grupo de emojis:
        </label>
        <select
          className="border border-gray-300 rounded px-4 py-2 w-full"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="participationImages">Participación 1</option>
          <option value="generalEmojis">Emojis Entrada y Cámara</option>
          <option value="dragonEmojis">
            Emojis de Preguntas y participación
          </option>
          <option value="automaticFluency">
            Participación en Automatic Fluency
          </option>
          <option value="weeklyEvaluation">
            Participación evaluación viernes
          </option>
        </select>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="font-bold text-xl mb-4">
          Emojis Actuales en {selectedGroup}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {emojiGroups[selectedGroup] &&
            emojiGroups[selectedGroup].map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-white rounded-lg shadow cursor-move"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="flex items-center flex-1">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {renderEmoji(item)}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium">{item.description}</p>
                    <p className="text-xs text-gray-500">
                      {item.type === "emoji" ? "Emoji" : "Imagen"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeEmoji(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
        </div>

        {emojiGroups[selectedGroup]?.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No hay emojis en este grupo. Agrega algunos abajo.
          </p>
        )}
      </div>

      {!showUploadForm ? (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setNewEmoji({ type: "emoji", content: "", description: "" });
              setShowUploadForm(true);
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar Emoji
          </button>
          <button
            onClick={() => {
              setNewEmoji({ type: "image", content: "", description: "" });
              setShowUploadForm(true);
            }}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar Imagen
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="font-bold text-lg mb-4">
            {newEmoji.type === "emoji"
              ? "Agregar Nuevo Emoji"
              : "Agregar Nueva Imagen"}
          </h3>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Descripción:
            </label>
            <input
              type="text"
              name="description"
              value={newEmoji.description}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              placeholder="Ej: Participación excelente"
            />
          </div>

          {newEmoji.type === "emoji" ? (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Emoji (código HTML):
              </label>
              <input
                type="text"
                name="content"
                value={newEmoji.content}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Ej: &#128079;"
              />
              <p className="text-sm text-gray-500 mt-1">
                Puedes copiar y pegar emojis directamente o usar códigos HTML
                como &#38;#128079;
              </p>
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Imagen:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
              {newEmoji.content && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Vista previa:</p>
                  <img
                    src={newEmoji.content}
                    alt="Preview"
                    className="w-16 h-16 object-contain border border-gray-300 rounded"
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={addEmoji}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setNewEmoji({ type: "emoji", content: "", description: "" });
                setSelectedFile(null);
                setShowUploadForm(false);
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Instrucciones:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Selecciona el grupo donde quieres agregar o editar emojis.</li>
          <li>
            Para reorganizar los emojis, arrástralos y suéltalos en la posición
            deseada.
          </li>
          <li>Para eliminar un emoji, haz clic en la "✕" a su derecha.</li>
          <li>
            Para agregar un nuevo emoji, haz clic en "Agregar Emoji" o "Agregar
            Imagen".
          </li>
          <li>Los cambios se guardan automáticamente.</li>
        </ol>
      </div>
    </div>
  );
};

export default EmojiAdmin;
