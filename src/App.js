import { useState, useEffect } from "react";
import burpeesImg from "./assets/burpees.png";
import cascoImg from "./assets/casco.png";

const frases = [
  "Cada paso cuenta, no te detengas.",
  "Hoy es un buen día para superarte.",
  "El esfuerzo de hoy es el resultado de mañana.",
  "No se trata de ser el mejor, sino de ser mejor que ayer.",
  "Cuando tengas ganas de rendirte, recordá por qué empezaste."
];

const rutinas = {
  lunes: { texto: "Burpees, Jumping Jacks, Mountain Climbers", img: burpeesImg },
  martes: { texto: "Flexiones, Fondos, Dominadas", img: burpeesImg },
  miércoles: { texto: "Trote, Plancha, Abdominales", img: burpeesImg },
  jueves: { texto: "Sentadillas, Zancadas, Step-ups", img: burpeesImg },
  viernes: { texto: "HIIT Full Body", img: burpeesImg },
  sábado: { texto: "Caminata, Estiramientos", img: burpeesImg },
  domingo: { texto: "Descanso o paseo activo", img: null }
};

const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

export default function App() {
  const [frase, setFrase] = useState("");
  const [completado, setCompletado] = useState(false);
  const [historial, setHistorial] = useState(() => JSON.parse(localStorage.getItem("historial")) || {});
  const [temporizador, setTemporizador] = useState(30);
  const [estado, setEstado] = useState("descanso");
  const [activo, setActivo] = useState(false);
  const [ronda, setRonda] = useState(1);

  const diaHoy = diasSemana[new Date().getDay()];
  const rutinaHoy = rutinas[diaHoy];

  useEffect(() => {
    setFrase(frases[Math.floor(Math.random() * frases.length)]);
  }, []);

  useEffect(() => {
    let interval = null;
    if (activo && ronda <= 4) {
      interval = setInterval(() => {
        setTemporizador((prev) => {
          if (prev === 1) {
            if (estado === "trabajo") {
              setEstado("descanso");
              return 10;
            } else {
              setRonda((r) => r + 1);
              setEstado("trabajo");
              return 30;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activo, estado, ronda]);

  const toggleTemporizador = () => {
    if (activo) {
      setActivo(false);
      setTemporizador(30);
      setEstado("trabajo");
      setRonda(1);
    } else {
      setActivo(true);
      setEstado("trabajo");
      setTemporizador(30);
    }
  };

  const marcarCompletado = () => {
    const nuevoHistorial = { ...historial, [diaHoy]: true };
    setHistorial(nuevoHistorial);
    localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
    setCompletado(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <img src={cascoImg} alt="casco" style={{ width: 50 }} />
      <h1>Mi Entrenador Diario</h1>

      <h2>Frase del día</h2>
      <p><em>{frase}</em></p>

      <h2>Rutina de hoy ({diaHoy})</h2>
      <p>{rutinaHoy.texto}</p>
      {rutinaHoy.img && <img src={rutinaHoy.img} alt="Ejercicio" style={{ width: "100%", maxWidth: 300 }} />}

      <h2>Temporizador HIIT</h2>
      <p>{estado.toUpperCase()} ({ronda}/4)</p>
      <h1>{temporizador}s</h1>
      <button onClick={toggleTemporizador}>{activo ? "Detener" : "Iniciar"}</button>

      <h2>¿Entrenaste hoy?</h2>
      <button onClick={marcarCompletado} disabled={completado}>
        {completado ? "✔ Completado" : "Marcar como Completado"}
      </button>

      <h2>Historial semanal</h2>
      <ul>
        {diasSemana.map((dia) => (
          <li key={dia}>
            {dia}: {historial[dia] ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}
