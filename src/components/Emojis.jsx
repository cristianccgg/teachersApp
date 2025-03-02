import { useState, useEffect } from "react";

const Emojis = () => {
  // Get emojis from localStorage or use original defaults
  const [emojiGroups, setEmojiGroups] = useState(() => {
    const savedEmojis = localStorage.getItem("customEmojis");
    if (savedEmojis) {
      return JSON.parse(savedEmojis);
    } else {
      // Default structure with initial images (same as in original component)
      return {
        participationImages: [
          {
            type: "image",
            content: "/src/assets/7.jpeg",
            description: "Participación 1",
          },
          {
            type: "image",
            content: "/src/assets/8.jpeg",
            description: "Participación 1",
          },
          {
            type: "image",
            content: "/src/assets/9.jpeg",
            description: "Participación 1",
          },
          {
            type: "image",
            content: "/src/assets/10.jpeg",
            description: "Participación 1",
          },
          {
            type: "image",
            content: "/src/assets/11.jpeg",
            description: "Participación 1",
          },
          {
            type: "image",
            content: "/src/assets/12.jpeg",
            description: "Participación 1",
          },
          {
            type: "image",
            content: "/src/assets/13.jpeg",
            description: "Participación 1",
          },
          {
            type: "image",
            content: "/src/assets/14.jpeg",
            description: "Participación 1",
          },
          {
            type: "image",
            content: "/src/assets/15.jpeg",
            description: "Participación 1",
          },
          {
            type: "image",
            content: "/src/assets/16.jpeg",
            description: "Participación 1",
          },
        ],
        generalEmojis: [
          { type: "emoji", content: "&#9200;", description: "Entró a tiempo" },
          {
            type: "emoji",
            content: "&#128248;",
            description: "Mantuvo la cámara encendida",
          },
        ],
        dragonEmojis: [
          {
            type: "image",
            content: "/src/assets/dragon.jpeg",
            description: "Hizo preguntas a sus compañeros",
          },
        ],
        automaticFluency: [
          {
            type: "emoji",
            content: "&#128150;",
            description: "Ya casi, sigue practicando",
          },
          {
            type: "image",
            content: "/src/assets/rayo2.jpeg",
            description: "Participación con energía",
          },
          {
            type: "image",
            content: "/src/assets/Participacion 5 estrellas.jpeg",
            description: "Participación 5 estrellas",
          },
        ],
        weeklyEvaluation: [
          {
            type: "image",
            content: "/src/assets/Necesit practicar.jpeg",
            description: "Necesita mejorar y practicar más",
          },
          {
            type: "image",
            content: "/src/assets/Cumplio sobresaliente.jpeg",
            description:
              "Cumplió el objetivo de la semana de manera sobresaliente",
          },
          {
            type: "image",
            content: "/src/assets/Cumplio objetivo semana.jpeg",
            description: "Cumplió con el objetivo de la semana",
          },
        ],
      };
    }
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDragStart = (e, item) => {
    if (e.target.tagName === "IMG") {
      const id = `img-${Date.now()}`;
      e.target.id = id;
      e.dataTransfer.setData("draggedId", id);
    } else {
      e.dataTransfer.setData("text/plain", item);
    }
  };

  const handleImageClick = () => {
    const participationImages = emojiGroups.participationImages || [];
    if (participationImages.length > 0) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % participationImages.length
      );
    }
  };

  const renderParticipationItem = () => {
    const participationImages = emojiGroups.participationImages || [];
    if (participationImages.length === 0) {
      return <p>No hay imágenes de participación</p>;
    }

    const currentItem = participationImages[currentImageIndex];

    if (currentItem.type === "emoji") {
      return (
        <p
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onClick={handleImageClick}
          onDragStart={(event) => handleDragStart(event, currentItem.content)}
        >
          <span dangerouslySetInnerHTML={{ __html: currentItem.content }} />
        </p>
      );
    }

    return (
      <p
        className="draggable cursor-grab w-10 h-10"
        draggable="true"
        onClick={handleImageClick}
        onDragStart={(event) => handleDragStart(event, currentItem.content)}
      >
        <img
          src={currentItem.content}
          alt="Participation"
          className="w-full h-full object-contain"
          draggable="true"
        />
      </p>
    );
  };

  const renderEmojiGroup = (group, title) => {
    if (!emojiGroups[group] || emojiGroups[group].length === 0) {
      return null;
    }

    return (
      <>
        <h1 className="font-bold text-xl">{title}:</h1>
        {emojiGroups[group].map((item, index) => (
          <div key={index} className="flex gap-5">
            <p
              className={`draggable cursor-grab ${
                item.type === "emoji" ? "text-3xl w-10" : "w-10"
              }`}
              draggable="true"
              onDragStart={(event) =>
                handleDragStart(
                  event,
                  item.type === "emoji" ? item.content : item.content
                )
              }
            >
              {item.type === "emoji" ? (
                <span dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                <img
                  src={item.content}
                  alt={item.description}
                  className="w-10 h-10 object-contain"
                  draggable="true"
                />
              )}
            </p>
            <h2>{item.description}</h2>
          </div>
        ))}
      </>
    );
  };

  // Link to admin page
  const goToAdmin = () => {
    window.location.href = "/admin";
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Significado:</h1>
        <button
          onClick={goToAdmin}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded text-sm"
          title="Administrar emojis"
        >
          ⚙️ Administrar Emojis
        </button>
      </div>

      {renderEmojiGroup("generalEmojis", "Entrada y Cámara")}

      <div className="flex gap-5">
        {renderParticipationItem()}
        <h2>Participación 1</h2>
      </div>

      {renderEmojiGroup("dragonEmojis", "Preguntas y Participación")}
      {renderEmojiGroup(
        "automaticFluency",
        "Participación en Automatic Fluency"
      )}
      {renderEmojiGroup("weeklyEvaluation", "Participación evaluación viernes")}
    </div>
  );
};

export default Emojis;
