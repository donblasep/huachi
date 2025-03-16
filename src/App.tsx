import React, { Suspense, lazy } from "react";
import { Star, createLucideIcon, InstagramIcon } from "lucide-react";
import fans from "./assets/hincha.webp";
import { Routes, Route, Link } from "react-router-dom";
import HamburgerMenu from "./components/HamburgerMenu"; // Asegúrate de que la ruta sea correcta
import LastMatch from "./components/LastMatch"; // Asegúrate de que la ruta sea correcta
import campeondelsur from "./assets/campeondelsur.svg";
import temple from "./assets/temple.svg";

import First from "./assets/trophies/1974.svg";
import Huemul from "./assets/trophies/huemul.svg";

const logos = import.meta.glob("./assets/logos/*.webp", { eager: true });

const logoMap = Object.keys(logos).reduce((acc, path) => {
  const name = path.split("/").pop()?.replace(".webp", ""); // Extract filename
  if (name) acc[name] = (logos[path] as any).default;
  return acc;
}, {} as Record<string, string>);

console.log(logoMap);

const XIcon = createLucideIcon("X", [
  [
    "path",
    {
      d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
      stroke: "none",
      fill: "currentColor",
    },
  ],
]);

const Results = lazy(() => import("./pages/Results"));
const Squad = lazy(() => import("./pages/Squad"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Honours = lazy(() => import("./pages/Honours"));
const JerseyQuiz = lazy(() => import("./pages/JerseyQuiz"));

function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Mensaje de desarrollo */}
      <div className="bg-yellow-500 text-black text-center py-2">
        <strong>
          El Huachisitio está en desarrollo. Algunas imágenes podrían no estar
          disponibles.
        </strong>
      </div>
      {/* Sidebar */}

      <div className="flex-1">
        {/* Header */}
        <header className="bg-black text-white py-6 shadow-xs border-b border-blue-900">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={logoMap.huachipato}
                alt="Logo de Club Deportivo Huachipato"
                className="absolute top-4 h-32 z-[1] left-1/10"
              />
            </div>
            <div className="w-auto flex mx-auto relative left-12 md:left-20 lg:left-32">
              <Star
                fill="#eab308"
                className="size-6 mx-2 md:mx-4 text-yellow-500"
              />
              <Star
                fill="#eab308"
                className="size-8 mx-2 md:mx-4 text-yellow-500"
              />
              <Star
                fill="#eab308"
                className="size-6 mx-2 md:mx-4 text-yellow-500"
              />
            </div>
            <HamburgerMenu /> {/* Agrega el menú hamburguesa aquí */}
          </div>
        </header>

        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Hero Section */}
                  <section className="relative h-[500px]">
                    <div className="absolute inset-0 brightness-[.4]">
                      <img
                        src={fans}
                        alt="Estadio"
                        className="w-full h-full object-cover blur-sm"
                      />
                    </div>
                    <LastMatch />
                  </section>

                  {/* Timeline Section */}
                  <section
                    id="historia"
                    className="py-16 bg-black timeline-container mx-auto block justify-center w-19/20 md:w-4/5 max-w-5xl md:flex"
                  >
                    <div className="container px-4 mx-auto md:mx-0">
                      <h2 className="text-3xl font-bold text-white mb-12 text-center">
                        Historia del Club
                      </h2>
                      <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600"></div>

                        {/* Timeline Items */}
                        <div className="space-y-12">
                          <TimelineItem
                            year="1947"
                            title="Fundación y Nacimiento de una Leyenda"
                            content="El Club Deportivo Huachipato nace en Talcahuano, impulsado por el espíritu trabajador de los empleados de la Compañía Siderúrgica Huachipato, marcando el inicio de una tradición acerera y de orgullo para la región."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1950"
                            title="Consolidación Amateur"
                            content="El club ingresa a la Asociación de Fútbol de Talcahuano, ganando el campeonato local y abriendo camino al Campeonato Regional de Concepción."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1952"
                            title="Ascenso Regional"
                            content="Aunque finaliza en tercer lugar, Huachipato asciende al Campeonato Regional al aprovechar que el campeón, Naval B, era filial, asegurando su permanencia en la competencia."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1956"
                            title="Primer Campeonato Regional"
                            content="Bajo la dirección de Sergio Cruzat, el equipo se consagra campeón regional por primera vez, sentando las bases para su futuro profesionalismo."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1964"
                            title="Segundo Campeonato Regional"
                            content="Con Luis Vera al mando, Huachipato obtiene su segundo título regional, consolidando su reputación en la zona del Biobío."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1965"
                            title="Ingreso al Profesionalismo"
                            content="El club es aceptado en la Segunda División de Chile, marcando su transición del amateurismo al fútbol profesional."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1966"
                            title="Ascenso a Primera División"
                            content="Se corona campeón de la Segunda División con 49 puntos, asegurando su primer ascenso a la máxima categoría del fútbol chileno."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1967"
                            title="Debut en Primera División"
                            content="El equipo debuta en la Primera División con un empate 1-1 contra Audax Italiano y finaliza la temporada en sexto lugar, estableciendo su presencia en el profesionalismo."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1973"
                            title="Gira Internacional"
                            content="Huachipato realiza una gira por Centroamérica que fortalece la cohesión del equipo, culminando en un histórico tercer lugar en la liga tras enfrentar a equipos de Costa Rica, Honduras y Guatemala."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1974"
                            title="Campeón del Sur"
                            content="El club se consagra campeón de la Primera División, convirtiéndose en el único equipo sureño en lograr el título en esa época y ganándose el sobrenombre de 'Campeón del Sur'."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1978"
                            title="Descenso y Retos"
                            content="Huachipato sufre el descenso a la Segunda División, enfrentando una etapa de desafíos que pondrá a prueba su resiliencia."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1982"
                            title="Nuevo Ascenso"
                            content="El club retorna a la Primera División, demostrando su capacidad para sobreponerse a las adversidades y reafirmar su presencia en la élite."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="1990s"
                            title="Formación de Talentos"
                            content="Durante la década, el club se destaca por su excelente labor formativa, convirtiéndose en una cantera de grandes jugadores para el fútbol nacional e internacional."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="2006"
                            title="Internacionalización"
                            content="Huachipato participa por primera vez en la Copa Sudamericana, iniciando sus incursiones en torneos continentales y ampliando su proyección más allá de Chile."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="2012"
                            title="Segunda Estrella"
                            content="En el Torneo Clausura, el club se corona campeón, obteniendo su segundo título de Primera División después de 38 años, en una final llena de emoción contra Unión Española."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="2014-2015"
                            title="Transformación Institucional"
                            content="El club se moderniza al convertirse en sociedad anónima deportiva (SADP), impulsando la integración de jóvenes talentos a su primer equipo y fortaleciendo su estructura organizacional."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="2023"
                            title="Tercera Corona"
                            content="Con una campaña histórica, Huachipato se consagra campeón de la Primera División por tercera vez, consolidando su legado en el fútbol chileno tras una victoria decisiva sobre Audax Italiano."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="2024"
                            title="Proyección Internacional"
                            content="Clasificado para la Copa Libertadores 2024, el club hizo una gran campaña pero no logró pasar a 8vos, por lo que clasificó a Sudamericana."
                            align="center"
                            className="timeline-item"
                          />
                          <TimelineItem
                            year="2024"
                            title="Huachitermos"
                            content="Se creó Huachitermos, el grupo con menos fútbol de Chile. (mentira)"
                            align="center"
                            className="timeline-item"
                          />
                        </div>
                      </div>
                    </div>

                    <aside className="p-4 flex flex-col w-full size-full mt-16 md:max-w-sm">
                      <div
                        id="scoreaxis-widget-fa7ec"
                        style={{
                          borderWidth: "1px",
                          borderColor: "rgba(255, 255, 255, 0.15)",
                          borderStyle: "solid",
                          borderRadius: "8px",
                          background: "rgba(0, 0, 0, 0.8)",
                          width: "100%",
                        }}
                      >
                        <iframe
                          id="Iframe"
                          src="https://www.scoreaxis.com/widget/standings-widget/663?autoHeight=0&amp;groupNum=undefined&amp;widgetRows=1%2C1%2C0%2C1%2C1%2C1%2C0%2C0%2C0%2C1&amp;lang=es&amp;font=7&amp;widgetHomeAwayTabs=0&amp;header=0&amp;teamsLogo=1&amp;fontSize=16&amp;borderColor=%231e40af&amp;links=0&amp;bodyBackground=%231e3a8a&amp;textColor=%23e5e7eb&amp;inst=fa7ec"
                          style={{
                            width: "100%",
                            height: "514px",
                            border: "none",
                            transition: "all 300ms ease",
                            borderRadius: "8px",
                          }}
                        ></iframe>
                        <script>
                          {`window.addEventListener("DOMContentLoaded", event => {
                window.addEventListener("message", event => {
                  if (event.data.appHeight && "fa7ec" == event.data.inst) {
                    let container = document.querySelector("#scoreaxis-widget-fa7ec iframe");
                    container && (container.style.height = parseInt(event.data.appHeight) + "px");
                  }
                }, !1);
              });`}
                        </script>
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontFamily: "Arial, sans-serif",
                          textAlign: "left",
                          color: "white",
                        }}
                      >
                        Data provided by{" "}
                        <a
                          target="_blank"
                          href="https://www.scoreaxis.com/"
                          style={{ color: "blue" }}
                        >
                          Scoreaxis
                        </a>
                      </div>

                      <div className="w-full">
                        <img
                          src={Huemul}
                          alt=""
                          className="w-full brightness-[.35] fill-white hidden md:mt-16 md:block"
                        />
                        <img
                          src={Huemul}
                          alt=""
                          className="w-full brightness-[.35] fill-white hidden md:mt-80 md:block"
                        />
                        <img
                          src={First}
                          alt=""
                          className="w-full brightness-[.35] fill-white hidden md:mt-80 md:block"
                        />
                      </div>
                    </aside>
                  </section>
                </>
              }
            />
            <Route path="/results" element={<Results />} />
            <Route path="/squad" element={<Squad />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/honours" element={<Honours />} />
            <Route path="/jersey-quiz" element={<JerseyQuiz />} />
          </Routes>
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8 border-t border-blue-900">
        <div className="container mx-auto px-4 text-center">
          <p>Sitio creado por un hincha para hinchas</p>
          <div className="flex justify-center space-x-4 mt-1 flex-wrap">
            <img
              src={campeondelsur}
              alt="El Campeón del Sur"
              className="w-72 opacity-50"
            />
            <img
              src={temple}
              alt="El Campeón del Sur"
              className="w-40 opacity-50"
            />
          </div>
          {/* Redes Sociales */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <a
              href="https://twitter.com/templedeaceroo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/templedeaceroo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TimelineItem({
  year,
  title,
  content,
  className,
}: {
  year: string;
  title: string;
  content: string;
  align: "center";
  className?: string;
}) {
  return (
    <div className={`flex justify-center relative ${className || ""}`}>
      <div className="w-full">
        <div className="bg-gradient-to-br from-blue-900 to-black p-6 rounded-lg border border-blue-800">
          <span className="text-blue-400 font-bold">{year}</span>
          <h3 className="text-white text-xl font-bold mt-2">{title}</h3>
          <p className="text-gray-300 mt-2">{content}</p>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full mt-6 z-10"></div>
    </div>
  );
}

export default App;
