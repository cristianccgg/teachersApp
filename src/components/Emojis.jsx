import { useState } from "react";
import dragon from "../assets/dragon.jpeg";
import estrellas from "../assets/Participacion 5 estrellas.jpeg";
import sobresaliente from "../assets/Cumplio sobresaliente.jpeg";
import semana from "../assets/Cumplio objetivo semana.jpeg";
import practicar from "../assets/Necesit practicar.jpeg";
import rayo from "../assets/Rayo.jpeg";
import one from "../assets/1.jpeg";
import two from "../assets/2.jpeg";
import three from "../assets/3.jpeg";
import four from "../assets/4.jpeg";
import five from "../assets/5.jpeg";
import six from "../assets/6.jpeg";

const Emojis = () => {
  const participationImages = [
    { type: "image", content: one },
    { type: "image", content: two },
    { type: "image", content: three },
    { type: "image", content: four },
    { type: "image", content: five },
    { type: "image", content: six },
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
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#9200;")}
        >
          &#9200;
        </p>
        <h2>Entró a tiempo</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl"
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
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#128150;")}
        >
          &#128150;
        </p>
        <h2>Ya casi, sigue practicando</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab "
          draggable="true"
          onDragStart={(event) => handleDragStart(event, rayo)}
        >
          <img
            src={rayo}
            alt="Objetivo cumplido"
            className="w-12 h-10 object-cover -ms-1 -me-2"
            draggable="true"
          />
        </p>
        <h2>Participación con energía</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab "
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
          className="draggable cursor-grab "
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
          className="draggable cursor-grab "
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
          className="draggable cursor-grab "
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
