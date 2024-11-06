import star from "../assets/star.png";

const Emojis = () => {
  const handleDragStart = (e, item) => {
    if (e.target.tagName === "IMG") {
      const id = `img-${Date.now()}`;
      e.target.id = id;
      e.dataTransfer.setData("draggedId", id);
    } else {
      e.dataTransfer.setData("text/plain", item);
    }
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
        <p
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#128150;")}
        >
          &#128150;
        </p>
        <h2>Participación 1</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#129409;")}
        >
          &#129409;
        </p>
        <h2>Hizo preguntas a sus compañeros</h2>
      </div>

      <h1 className="font-bold text-xl">Participación en Automatic Fluency:</h1>

      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#128151;")}
        >
          &#128151;
        </p>
        <h2>Ya casi, sigue practicando</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#9889;")}
        >
          &#9889;
        </p>
        <h2>Participación con energía</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#127942;")}
        >
          &#127942;
        </p>
        <h2>Participación 5 estrellas</h2>
      </div>

      <h1 className="font-bold text-xl">Participación evaluación viernes:</h1>

      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#128151;")}
        >
          &#128151;
        </p>
        <h2>Necesita mejorar y practicar más</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab text-3xl"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#9889;")}
        >
          &#9889;
        </p>
        <h2>Cumplió el objetivo de la semana de manera sobresaliente</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab "
          draggable="true"
          onDragStart={(event) => handleDragStart(event, star)}
        >
          <img
            src={star}
            alt="Objetivo cumplido"
            className="w-8 h-8"
            draggable="true"
          />
        </p>
        <h2>Cumplió con el objetivo de la semana</h2>
      </div>
    </div>
  );
};

export default Emojis;
