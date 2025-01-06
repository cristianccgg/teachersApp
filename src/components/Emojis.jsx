import { useState } from "react";
import dragon from "../assets/dragon.jpeg";
import estrellas from "../assets/Participacion 5 estrellas.jpeg";
import sobresaliente from "../assets/Cumplio sobresaliente.jpeg";
import semana from "../assets/Cumplio objetivo semana.jpeg";
import practicar from "../assets/Necesit practicar.jpeg";
import seven from "../assets/7.jpeg";
import eight from "../assets/8.jpeg";
import nine from "../assets/9.jpeg";
import ten from "../assets/10.jpeg";
import eleven from "../assets/11.jpeg";
import twelve from "../assets/12.jpeg";
import thirteen from "../assets/13.jpeg";
import fourteen from "../assets/14.jpeg";
import fifteen from "../assets/15.jpeg";
import sixteen from "../assets/16.jpeg";
import rayo2 from "../assets/rayo2.jpeg";

const Emojis = () => {
  const participationImages = [
    { type: "image", content: seven },
    { type: "image", content: eight },
    { type: "image", content: nine },
    { type: "image", content: ten },
    { type: "image", content: eleven },
    { type: "image", content: twelve },
    { type: "image", content: thirteen },
    { type: "image", content: fourteen },
    { type: "image", content: fifteen },
    { type: "image", content: sixteen },
  ];

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
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % participationImages.length
    );
  };

  const renderParticipationItem = () => {
    const currentItem = participationImages[currentImageIndex];

    if (currentItem.type === "emoji") {
      return (
        <p
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onClick={handleImageClick}
          onDragStart={(event) => handleDragStart(event, currentItem.content)}
        >
          {currentItem.content}
        </p>
      );
    }

    return (
      <p
        className="draggable cursor-grab w-10 h-10" // Added fixed container dimensions
        draggable="true"
        onClick={handleImageClick}
        onDragStart={(event) => handleDragStart(event, currentItem.content)}
      >
        <img
          src={currentItem.content}
          alt="Participation"
          className="w-full h-full object-contain" // Changed to object-contain and full dimensions
          draggable="true"
        />
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-xl">Significado:</h1>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl w-10"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#9200;")}
        >
          &#9200;
        </p>
        <h2>Entró a tiempo</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl w-10"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#128248;")}
        >
          &#128248;
        </p>
        <h2>Mantuvo la cámara encendida</h2>
      </div>
      <div className="flex gap-5">
        {renderParticipationItem()}
        <h2>Participación 1</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab "
          draggable="true"
          onDragStart={(event) => handleDragStart(event, dragon)}
        >
          <img
            src={dragon}
            alt="Objetivo cumplido"
            className="w-10 h-10 object-contain"
            draggable="true"
          />
        </p>
        <h2>Hizo preguntas a sus compañeros</h2>
      </div>

      <h1 className="font-bold text-xl">Participación en Automatic Fluency:</h1>

      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl w-10"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#128150;")}
        >
          &#128150;
        </p>
        <h2>Ya casi, sigue practicando</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab w-10"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, rayo2)}
        >
          <img
            src={rayo2}
            alt="Objetivo cumplido"
            className="w-12 h-10 object-cover -ms-1 -me-2"
            draggable="true"
          />
        </p>
        <h2>Participación con energía</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab w-10"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, estrellas)}
        >
          <img
            src={estrellas}
            alt="Objetivo cumplido"
            className="w-8 h-8 object-contain"
            draggable="true"
          />
        </p>
        <h2>Participación 5 estrellas</h2>
      </div>

      <h1 className="font-bold text-xl">Participación evaluación viernes:</h1>

      <div className="flex gap-5">
        <p
          className="draggable cursor-grab w-10"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, practicar)}
        >
          <img
            src={practicar}
            alt="Objetivo cumplido"
            className="w-8 h-8 object-contain"
            draggable="true"
          />
        </p>
        <h2>Necesita mejorar y practicar más</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab w-10"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, sobresaliente)}
        >
          <img
            src={sobresaliente}
            alt="Objetivo cumplido"
            className="w-10 h-10 object-contain"
            draggable="true"
          />
        </p>
        <h2>Cumplió el objetivo de la semana de manera sobresaliente</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab w-10"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, semana)}
        >
          <img
            src={semana}
            alt="Objetivo cumplido"
            className="w-8 h-8 object-contain"
            draggable="true"
          />
        </p>
        <h2>Cumplió con el objetivo de la semana</h2>
      </div>
    </div>
  );
};

export default Emojis;
