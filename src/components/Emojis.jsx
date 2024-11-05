const Emojis = () => {
  // Manejar el inicio del arrastre
  const handleDragStart = (event, emoji) => {
    event.dataTransfer.setData("text/plain", emoji);
    event.dataTransfer.setDragImage(event.target, 0, 0); // Esto mostrará el emoji durante el arrastre
  };

  return (
    <div>
      <h1 className="font-bold">Significado</h1>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#129409;")}
        >
          &#129409;
        </p>
        <h2>Participación 1</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#129447;")}
        >
          &#129447;
        </p>
        <h2>Hizo preguntas a sus compañeros</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#129448;")}
        >
          &#129448;
        </p>
        <h2>Participación en Automatic Fluency</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#129421;")}
        >
          &#129421;
        </p>
        <h2>Necesita mejorar y practicar más</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#129412;")}
        >
          &#129412;
        </p>
        <h2>Cumplió el objetivo de la semana de manera sobresaliente</h2>
      </div>
      <div className="flex gap-5">
        <p
          className="draggable cursor-grab"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, "&#129449;")}
        >
          &#129449;
        </p>
        <h2>Cumplió con el objetivo de la semana</h2>
      </div>
    </div>
  );
};

export default Emojis;
