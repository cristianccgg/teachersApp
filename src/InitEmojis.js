// This file needs to be imported and executed once at app startup

import dragon from "./assets/dragon.jpeg";
import estrellas from "./assets/Participacion 5 estrellas.jpeg";
import sobresaliente from "./assets/Cumplio sobresaliente.jpeg";
import semana from "./assets/Cumplio objetivo semana.jpeg";
import practicar from "./assets/Necesit practicar.jpeg";
import seven from "./assets/7.jpeg";
import eight from "./assets/8.jpeg";
import nine from "./assets/9.jpeg";
import ten from "./assets/10.jpeg";
import eleven from "./assets/11.jpeg";
import twelve from "./assets/12.jpeg";
import thirteen from "./assets/13.jpeg";
import fourteen from "./assets/14.jpeg";
import fifteen from "./assets/15.jpeg";
import sixteen from "./assets/16.jpeg";
import rayo2 from "./assets/rayo2.jpeg";

// Initialize emoji data in localStorage if it doesn't exist yet
export const initEmojiData = () => {
  // Check if data exists already
  const existingData = localStorage.getItem("customEmojis");

  if (!existingData) {
    // Create default data structure based on original component
    const defaultEmojiData = {
      participationImages: [
        { type: "image", content: seven, description: "Participación 1" },
        { type: "image", content: eight, description: "Participación 1" },
        { type: "image", content: nine, description: "Participación 1" },
        { type: "image", content: ten, description: "Participación 1" },
        { type: "image", content: eleven, description: "Participación 1" },
        { type: "image", content: twelve, description: "Participación 1" },
        { type: "image", content: thirteen, description: "Participación 1" },
        { type: "image", content: fourteen, description: "Participación 1" },
        { type: "image", content: fifteen, description: "Participación 1" },
        { type: "image", content: sixteen, description: "Participación 1" },
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
          content: dragon,
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
          content: rayo2,
          description: "Participación con energía",
        },
        {
          type: "image",
          content: estrellas,
          description: "Participación 5 estrellas",
        },
      ],
      weeklyEvaluation: [
        {
          type: "image",
          content: practicar,
          description: "Necesita mejorar y practicar más",
        },
        {
          type: "image",
          content: sobresaliente,
          description:
            "Cumplió el objetivo de la semana de manera sobresaliente",
        },
        {
          type: "image",
          content: semana,
          description: "Cumplió con el objetivo de la semana",
        },
      ],
    };

    localStorage.setItem("customEmojis", JSON.stringify(defaultEmojiData));
    console.log("Emoji data initialized successfully");
  }
};

export default initEmojiData;
