import { useState, useEffect } from "react";

const frases = [
  "Cada paso cuenta, no te detengas.",
  "Hoy es un buen día para superarte.",
  "El esfuerzo de hoy es el resultado de mañana.",
  "No se trata de ser el mejor, sino de ser mejor que ayer.",
  "Cuando tengas ganas de rendirte, recordá por qué empezaste."
];

const rutinas = {
  lunes: "HIIT: Burpees, Jumping Jacks, Mountain Climbers",
  martes: "Fuerza Tren Superior: Flexiones, Fondos, Dominadas",
  miércoles: "Cardio + Core: Trote, Plancha, Abdominales",
  jueves: "Fuerza Tren Inferior: Sentadillas, Zancadas, Step-ups",
  viernes: "HIIT Full Body: Repetir circuito lunes",
  sábado: "Movilidad: Caminata, Estiramientos",
  domingo: "Descanso o paseo activo"
};

const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

export default function App() {
  const [frase, setFrase] = useState("");
  const [completado, setCompletado] = useState(false);
  const [historial, setHistorial] = useState(() => {
    return JSON.parse(localStorage.getItem("historial")) || {};
  });

  const diaHoy = diasSemana[new Date().getDay()];

  useEffect(() => {
    const aleatoria = frases[Math.floor(Math.random() * frases.length)];
    setFrase(aleatoria);
  }, []);

  const marcarCompletado = () => {
    const nuevoHistorial = { ...historial, [diaHoy]: true };
    setHistorial(nuevoHistorial);
    localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
    setCompletado(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mi Entrenador Diario</h1>
      <section>
        <h2>Frase del día</h2>
        <p><em>{frase}</em></p>
      </section>
      <section>
        <h2>Rutina de hoy ({diaHoy})</h2>
        <p>{rutinas[diaHoy]}</p>
      </section>
      <section>
        <h2>¿Entrenaste hoy?</h2>
        <button onClick={marcarCompletado} disabled={completado}>
          {completado ? "✔ Entrenamiento Completado" : "Marcar como Completado"}
        </button>
      </section>
      <section>
        <h2>Historial Semanal</h2>
        <ul>
          {diasSemana.map((dia) => (
            <li key={dia}>
              {dia}: {historial[dia] ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
