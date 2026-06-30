"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Target,
  TrendingUp,
  Users,
  Map,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Search,
  Crosshair,
  MessageSquare,
  Bot,
  X,
  Loader2,
  Download,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Save,
  Check,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Estilos CSS customizados para animaciones y scrollbar
const customStyles = `
  @keyframes slideUpFade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 15px rgba(159, 18, 57, 0.2); }
    50% { box-shadow: 0 0 30px rgba(159, 18, 57, 0.6); }
  }
  .glow-effect {
    animation: pulseGlow 3s infinite;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0f172a; 
  }
  ::-webkit-scrollbar-thumb {
    background: #334155; 
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #475569; 
  }
`;

// Default list in case database is loading/empty
const DEFAULT_SECCIONES = [
  { seccion: "1980", distrito: 10, zona: "Urbana Centro", listaNominal: 1450, votosMorena2024: 512, participacion2024: "62%", rentabilidad: "Media", tendencia: "Competitivo" },
  { seccion: "1985", distrito: 10, zona: "Residencial", listaNominal: 1820, votosMorena2024: 455, participacion2024: "68%", rentabilidad: "Baja", tendencia: "Oposición" },
  { seccion: "1992", distrito: 10, zona: "Urbana Popular", listaNominal: 2100, votosMorena2024: 1224, participacion2024: "58%", rentabilidad: "Alta", tendencia: "Bastión" },
  { seccion: "2001", distrito: 10, zona: "Urbana Media", listaNominal: 1650, votosMorena2024: 742, participacion2024: "60%", rentabilidad: "Media", tendencia: "Competitivo" },
  { seccion: "2015", distrito: 10, zona: "Residencial Alta", listaNominal: 1980, votosMorena2024: 396, participacion2024: "71%", rentabilidad: "Baja", tendencia: "Oposición" },
  { seccion: "2024", distrito: 10, zona: "Urbana Popular", listaNominal: 2400, votosMorena2024: 1488, participacion2024: "55%", rentabilidad: "Alta", tendencia: "Bastión" },
  { seccion: "2038", distrito: 10, zona: "Urbana Media", listaNominal: 1350, votosMorena2024: 610, participacion2024: "61%", rentabilidad: "Media", tendencia: "Competitivo" },
  { seccion: "2045", distrito: 11, zona: "Semi-rural (El Castillo)", listaNominal: 2850, votosMorena2024: 1852, participacion2024: "64%", rentabilidad: "Alta", tendencia: "Bastión" },
  { seccion: "2052", distrito: 11, zona: "Rural (Chiltoyac)", listaNominal: 1200, votosMorena2024: 816, participacion2024: "66%", rentabilidad: "Alta", tendencia: "Bastión" },
  { seccion: "2060", distrito: 11, zona: "Urbana Popular", listaNominal: 2200, votosMorena2024: 1386, participacion2024: "57%", rentabilidad: "Alta", tendencia: "Bastión" },
  { seccion: "2071", distrito: 11, zona: "Urbana Media", listaNominal: 1750, votosMorena2024: 840, participacion2024: "59%", rentabilidad: "Media", tendencia: "Competitivo" },
  { seccion: "2088", distrito: 11, zona: "Nuevos Fraccionamientos", listaNominal: 3100, votosMorena2024: 1519, participacion2024: "53%", rentabilidad: "Media", tendencia: "Competitivo" },
  { seccion: "2095", distrito: 11, zona: "Urbana Popular Sur", listaNominal: 1950, votosMorena2024: 1209, participacion2024: "56%", rentabilidad: "Alta", tendencia: "Bastión" },
  { seccion: "2104", distrito: 11, zona: "Rural (Tronconal)", listaNominal: 950, votosMorena2024: 684, participacion2024: "68%", rentabilidad: "Alta", tendencia: "Bastión" },
  { seccion: "2115", distrito: 11, zona: "Residencial Sur", listaNominal: 2400, votosMorena2024: 816, participacion2024: "65%", rentabilidad: "Baja", tendencia: "Oposición" }
];

// Barra de progreso animada para los históricos
const ProgressBar = ({ label, morena, pan, mc, total, labelMorena, labelPan }: any) => {
  const [widthMorena, setWidthMorena] = useState(0);
  const [widthPan, setWidthPan] = useState(0);
  const [widthMc, setWidthMc] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const safeTotal = total || 1;
      setWidthMorena((morena / safeTotal) * 100);
      setWidthPan((pan / safeTotal) * 100);
      if (mc) setWidthMc((mc / safeTotal) * 100);
    }, 300);
    return () => clearTimeout(timer);
  }, [morena, pan, mc, total]);

  return (
    <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-slate-600 transition-all duration-300">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-slate-200">{label}</span>
        <span className="text-xs bg-rose-900/40 text-rose-400 font-bold px-3 py-1 rounded-full border border-rose-800/50 flex items-center gap-2">
          <CheckCircle2 size={12} /> MORENA LÍDER
        </span>
      </div>
      <div className="flex justify-between text-xs text-slate-400 mb-3 font-medium">
        <span className="text-rose-400">
          {labelMorena}: {morena.toLocaleString()}
        </span>
        <span className="text-blue-400">
          {labelPan}: {pan.toLocaleString()}
        </span>
        <span className="text-slate-500">Total: {total.toLocaleString()}</span>
      </div>
      <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex shadow-inner">
        <div
          className="bg-gradient-to-r from-rose-700 to-rose-500 h-full transition-all duration-1000 ease-out relative"
          style={{ width: `${widthMorena}%` }}
        ></div>
        <div
          className="bg-gradient-to-r from-blue-700 to-blue-500 h-full transition-all duration-1000 ease-out"
          style={{ width: `${widthPan}%` }}
        ></div>
        {mc && (
          <div
            className="bg-gradient-to-r from-orange-600 to-orange-400 h-full transition-all duration-1000 ease-out"
            style={{ width: `${widthMc}%` }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fodaActiveTab, setFodaActiveTab] = useState("F");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  // Estado de Calculadora / Simulador
  const [listaNominal, setListaNominal] = useState(395753);
  const [participacionEstimada, setParticipacionEstimada] = useState(48);
  const [metaPorcentajeMorena, setMetaPorcentajeMorena] = useState(52);

  // Lista de Secciones en Estado para CRUD
  const [secciones, setSecciones] = useState<any[]>([]);

  // Filtros de Tabla
  const [filterDistrito, setFilterDistrito] = useState("all");
  const [filterTendencia, setFilterTendencia] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Estado de Modales CRUD
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<any | null>(null);

  // Campos para nuevos/editados registros
  const [formSeccion, setFormSeccion] = useState("");
  const [formDistrito, setFormDistrito] = useState(10);
  const [formZona, setFormZona] = useState("");
  const [formListaNominal, setFormListaNominal] = useState(1000);
  const [formVotosMorena, setFormVotosMorena] = useState(500);
  const [formParticipacion, setFormParticipacion] = useState("60%");
  const [formRentabilidad, setFormRentabilidad] = useState("Media");
  const [formTendencia, setFormTendencia] = useState("Competitivo");

  // Estado del Modal de IA
  const [aiModal, setAiModal] = useState({ isOpen: false, title: "", content: "", isLoading: false });

  // Inyectar estilos
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  // Cargar datos de la base de datos (JSON en el Servidor) al arrancar
  useEffect(() => {
    async function initDb() {
      try {
        const res = await fetch("/api/database");
        if (res.ok) {
          const data = await res.json();
          if (data.simulatorState) {
            setListaNominal(data.simulatorState.listaNominal);
            setParticipacionEstimada(data.simulatorState.participacionEstimada);
            setMetaPorcentajeMorena(data.simulatorState.metaPorcentajeMorena);
          }
          if (data.secciones) {
            setSecciones(data.secciones);
          } else {
            setSecciones(DEFAULT_SECCIONES);
          }
        } else {
          setSecciones(DEFAULT_SECCIONES);
        }
      } catch (err) {
        console.error("Error cargando base de datos:", err);
        setSecciones(DEFAULT_SECCIONES);
      } finally {
        setLoading(false);
      }
    }
    initDb();
  }, []);

  // Función para guardar todo el estado en el servidor (Base de Datos)
  const saveToDatabase = async (simState = { listaNominal, participacionEstimada, metaPorcentajeMorena }, currentSecs = secciones) => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          simulatorState: simState,
          secciones: currentSecs,
        }),
      });
      if (res.ok) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2500);
      } else {
        setSaveStatus("error");
      }
    } catch (err) {
      console.error("Error guardando en base de datos:", err);
      setSaveStatus("error");
    }
  };

  // Función para restaurar base de datos a los valores originales de fábrica
  const handleResetDatabase = async () => {
    if (window.confirm("¿Estás seguro de que deseas restablecer todos los datos a sus valores originales? Se perderán todos tus cambios persistidos.")) {
      const defaultState = {
        simulatorState: {
          listaNominal: 395753,
          participacionEstimada: 48,
          metaPorcentajeMorena: 52,
        },
        secciones: DEFAULT_SECCIONES,
      };
      setLoading(true);
      try {
        const res = await fetch("/api/database", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(defaultState),
        });
        if (res.ok) {
          setListaNominal(defaultState.simulatorState.listaNominal);
          setParticipacionEstimada(defaultState.simulatorState.participacionEstimada);
          setMetaPorcentajeMorena(defaultState.simulatorState.metaPorcentajeMorena);
          setSecciones(defaultState.secciones);
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2000);
        }
      } catch (err) {
        console.error("Error al restaurar:", err);
        alert("Ocurrió un error al intentar restaurar.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Cálculos dinámicos
  const votosEmitidosEstimados = useMemo(() => Math.round((listaNominal * participacionEstimada) / 100), [listaNominal, participacionEstimada]);
  const votosNecesariosMorena = useMemo(() => Math.round((votosEmitidosEstimados * metaPorcentajeMorena) / 100), [votosEmitidosEstimados, metaPorcentajeMorena]);

  const filteredSecciones = useMemo(() => {
    return secciones.filter(sec => {
      const matchDistrito = filterDistrito === "all" || sec.distrito.toString() === filterDistrito;
      const matchTendencia = filterTendencia === "all" || sec.tendencia === filterTendencia;
      const matchSearch = sec.seccion.includes(searchQuery) || sec.zona.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDistrito && matchTendencia && matchSearch;
    });
  }, [secciones, filterDistrito, filterTendencia, searchQuery]);

  // Manejo de CRUD
  const openAddModal = () => {
    setFormSeccion("");
    setFormDistrito(10);
    setFormZona("");
    setFormListaNominal(1500);
    setFormVotosMorena(750);
    setFormParticipacion("60%");
    setFormRentabilidad("Media");
    setFormTendencia("Competitivo");
    setIsAddModalOpen(true);
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSeccion.trim() || !formZona.trim()) {
      alert("Por favor rellena la Sección y la Tipología de Zona.");
      return;
    }
    const exists = secciones.some(s => s.seccion === formSeccion);
    if (exists) {
      alert("Esta sección electoral ya existe en la lista.");
      return;
    }

    const newSec = {
      seccion: formSeccion.trim(),
      distrito: Number(formDistrito),
      zona: formZona.trim(),
      listaNominal: Number(formListaNominal),
      votosMorena2024: Number(formVotosMorena),
      participacion2024: formParticipacion.trim(),
      rentabilidad: formRentabilidad,
      tendencia: formTendencia,
    };

    const updatedSecs = [newSec, ...secciones];
    setSecciones(updatedSecs);
    setIsAddModalOpen(false);
    // Persistir directamente
    saveToDatabase({ listaNominal, participacionEstimada, metaPorcentajeMorena }, updatedSecs);
  };

  const openEditModal = (sec: any) => {
    setEditingSection(sec);
    setFormSeccion(sec.seccion);
    setFormDistrito(sec.distrito);
    setFormZona(sec.zona);
    setFormListaNominal(sec.listaNominal);
    setFormVotosMorena(sec.votosMorena2024);
    setFormParticipacion(sec.participacion2024);
    setFormRentabilidad(sec.rentabilidad);
    setFormTendencia(sec.tendencia);
    setIsEditModalOpen(true);
  };

  const handleEditSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formZona.trim()) {
      alert("Por favor rellena la Tipología de Zona.");
      return;
    }

    const updatedSecs = secciones.map(s => {
      if (s.seccion === editingSection.seccion) {
        return {
          ...s,
          distrito: Number(formDistrito),
          zona: formZona.trim(),
          listaNominal: Number(formListaNominal),
          votosMorena2024: Number(formVotosMorena),
          participacion2024: formParticipacion.trim(),
          rentabilidad: formRentabilidad,
          tendencia: formTendencia,
        };
      }
      return s;
    });

    setSecciones(updatedSecs);
    setIsEditModalOpen(false);
    setEditingSection(null);
    // Persistir directamente
    saveToDatabase({ listaNominal, participacionEstimada, metaPorcentajeMorena }, updatedSecs);
  };

  const handleDeleteSection = (seccionCode: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la sección ${seccionCode}?`)) {
      const updatedSecs = secciones.filter(s => s.seccion !== seccionCode);
      setSecciones(updatedSecs);
      // Persistir directamente
      saveToDatabase({ listaNominal, participacionEstimada, metaPorcentajeMorena }, updatedSecs);
    }
  };

  // Funciones IA (Usando nuestra ruta de API server-side segura)
  const generarEstrategiaAI = async () => {
    setAiModal({ isOpen: true, title: "Memorándum Táctico AI ✨", content: "", isLoading: true });

    const prompt = `El listado nominal es de ${listaNominal} ciudadanos. Estimamos una participación del ${participacionEstimada}%. Nuestra meta es lograr el ${metaPorcentajeMorena}% de los votos emitidos, lo que significa que necesitamos asegurar exactamente ${votosNecesariosMorena} votos en las urnas.`;
    const system = "Actúa como un estratega político experto en campañas electorales. Redacta un memorándum táctico de 3 viñetas (muy breve, directo, máximo 120 palabras en total) recomendando dónde y cómo concentrar los esfuerzos de movilización el día de la elección basándote estrictamente en los números proporcionados. Usa un tono ejecutivo, analítico y enfocado a resultados.";

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction: system }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAiModal(prev => ({ ...prev, content: data.text, isLoading: false }));
    } catch (error) {
      console.error(error);
      setAiModal(prev => ({
        ...prev,
        content: "⚠️ Error de conexión con la IA. Asegúrate de configurar la clave GEMINI_API_KEY en la sección Settings > Secrets del panel de control.",
        isLoading: false,
      }));
    }
  };

  const generarMensajeSeccionAI = async (seccionData: any) => {
    setAiModal({ isOpen: true, title: `Guion de Brigada: Sec. ${seccionData.seccion} ✨`, content: "", isLoading: true });

    const prompt = `Genera un mensaje para la sección ${seccionData.seccion}. Distrito: ${seccionData.distrito}. Tipo de zona: ${seccionData.zona}. Tendencia actual: ${seccionData.tendencia}. Participación histórica: ${seccionData.participacion2024}.`;
    const system = "Actúa como coordinador de brigadas de Morena. Crea un guion de puerta en puerta (canvassing script) persuasivo y empático (máximo 80 palabras) para que los brigadistas aborden a los vecinos de esta sección específica. Adapta el lenguaje y el argumento principal (ej. programas sociales, continuidad, seguridad) dependiendo del tipo de zona (popular, residencial, rural) y si es un bastión o territorio de oposición. No incluyas saludos genéricos como 'Hola, soy brigadista', ve al grano.";

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemInstruction: system }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAiModal(prev => ({ ...prev, content: data.text, isLoading: false }));
    } catch (error) {
      console.error(error);
      setAiModal(prev => ({
        ...prev,
        content: "⚠️ Error de conexión con la IA. Asegúrate de configurar la clave GEMINI_API_KEY en la sección Settings > Secrets del panel de control.",
        isLoading: false,
      }));
    }
  };

  // Función para exportar a PDF de alta fidelidad con jsPDF
  const exportarA_PDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // --- PÁGINA 1: PORTADA Y PERFIL ---
      // Franja roja decorativa
      doc.setFillColor(159, 18, 57); // Rose-900 (Morena Red)
      doc.rect(0, 0, 210, 40, "F");

      // Texto de cabecera
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("ESTRATEGIA ELECTORAL XALAPA 2027", 15, 18);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("DOCUMENTO INTERNO Y CONFIDENCIAL - MORENA VERACRUZ", 15, 28);

      // Bloque del Perfil del Candidato
      doc.setTextColor(15, 23, 42); // Slate-900
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text("1. Perfil Estratégico Evaluado", 15, 55);

      doc.setDrawColor(226, 232, 240); // Slate-200
      doc.line(15, 58, 195, 58);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Propuesta de Candidatura: Lic. Diego Castañeda Aburto", 15, 66);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Cargo de Evaluación: Diputación de Mayoría Relativa - Xalapa 2027", 15, 72);

      // Formación académica
      doc.setFont("helvetica", "bold");
      doc.text("Formación Académica:", 15, 82);
      doc.setFont("helvetica", "normal");
      doc.text("- Licenciatura en Derecho (Cédula 4381011)", 20, 88);
      doc.text("- Maestría en Derecho Notarial (Cédula 12058462)", 20, 94);

      // Experiencia pública
      doc.setFont("helvetica", "bold");
      doc.text("Trayectoria Pública Clave:", 15, 105);
      doc.setFont("helvetica", "normal");
      doc.text("- Diputado Local LXVII (Presidente de la Comisión de Gobernación)", 20, 111);
      doc.text("- Subsecretario de Asuntos Legislativos del Estado de Veracruz", 20, 117);
      doc.text("- Secretario Particular del Subsecretario de Gobierno", 20, 123);

      // Vínculo Nahle
      doc.setFillColor(248, 250, 252); // Slate-50 background for alert box
      doc.rect(15, 131, 180, 22, "F");
      doc.setDrawColor(159, 18, 57); // Rose red left border
      doc.setLineWidth(1);
      doc.line(15, 131, 15, 153);
      doc.setTextColor(159, 18, 57);
      doc.setFont("helvetica", "bold");
      doc.text("CONEXIÓN DE ALTO NIVEL:", 18, 137);
      doc.setTextColor(51, 65, 85);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Figura de absoluta confianza de la Gobernadora Rocío Nahle. Garantiza una interlocución", 18, 143);
      doc.text("directa y confiable entre la capital del estado y el Poder Ejecutivo.", 18, 148);

      // --- SECCIÓN: HISTÓRICOS DE VOTACIÓN ---
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("2. Históricos de Votación en Xalapa", 15, 168);
      doc.setDrawColor(226, 232, 240);
      doc.line(15, 171, 195, 171);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Elección de Diputados Locales 2021:", 15, 179);
      doc.setFont("helvetica", "normal");
      doc.text("MORENA: 65,696 votos (47.3%) | Oposición (PAN): 26,665 votos (19.2%) | Total: 138,890", 15, 184);

      doc.setFont("helvetica", "bold");
      doc.text("Elección de Gubernatura 2024:", 15, 194);
      doc.setFont("helvetica", "normal");
      doc.text("MORENA: 88,334 votos (58.9%) | Oposición (PAN): 47,650 votos (31.8%) | Total: 149,973", 15, 199);

      doc.setFont("helvetica", "bold");
      doc.text("Elección de Ayuntamientos 2025:", 15, 209);
      doc.setFont("helvetica", "normal");
      doc.text("MORENA: 65,859 votos (51.9%) | PAN: 29,186 (23.0%) | MC: 21,625 (17.0%) | Total: 126,896", 15, 214);

      // Núcleo duro
      doc.setFillColor(254, 242, 242); // soft red box for hard core stat
      doc.rect(15, 222, 180, 16, "F");
      doc.setDrawColor(239, 68, 68);
      doc.line(15, 222, 15, 238);
      doc.setTextColor(153, 27, 27);
      doc.setFont("helvetica", "bold");
      doc.text("ANÁLISIS DE PISO ELECTORAL:", 18, 228);
      doc.setFont("helvetica", "normal");
      doc.text("Incluso en años intermedios, Morena mantiene un piso duro estable de ~65,000 votos en Xalapa.", 18, 233);

      // Footer Pag 1
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text("Página 1 de 3 - Comité de Estrategia Electoral Morena Veracruz", 15, 285);

      // --- PÁGINA 2: FODA ---
      doc.addPage();
      doc.setFillColor(15, 23, 42); // Dark headers
      doc.rect(0, 0, 210, 25, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("MATRIZ FODA: DIEGO CASTAÑEDA ABURTO", 15, 16);

      // Dibujar 4 cuadrantes del FODA
      const startX = 15;
      const startY = 40;
      const colW = 87;
      const rowH = 100;

      // 1. FORTALEZAS (Verde)
      doc.setFillColor(240, 253, 250); // Emerald 50
      doc.rect(startX, startY, colW, rowH, "F");
      doc.setDrawColor(16, 185, 129); // Emerald 500
      doc.setLineWidth(0.5);
      doc.rect(startX, startY, colW, rowH, "D");
      doc.setTextColor(6, 95, 70); // Emerald 800
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("FORTALEZAS (Interno)", startX + 5, startY + 8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      let textLinesF = [
        "- Respaldo de primer nivel: Confianza directa",
        "  con la Gobernadora Rocío Nahle.",
        "- Solidez técnica y legislativa: Especialista",
        "  notarial y constitucionalista idóneo.",
        "- Cargo clave en el Congreso: Presidencia de",
        "  Comisión de Gobernación da foro mediático.",
        "- Cara fresca: Sin pasivos políticos ni",
        "  desgaste por campañas previas en tierra."
      ];
      textLinesF.forEach((line, i) => doc.text(line, startX + 5, startY + 18 + i * 6));

      // 2. OPORTUNIDADES (Azul)
      doc.setFillColor(239, 246, 255); // Blue 50
      doc.rect(startX + colW + 6, startY, colW, rowH, "F");
      doc.setDrawColor(59, 130, 246); // Blue 500
      doc.rect(startX + colW + 6, startY, colW, rowH, "D");
      doc.setTextColor(30, 64, 175); // Blue 800
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("OPORTUNIDADES (Externo)", startX + colW + 11, startY + 8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      let textLinesO = [
        "- Arrastre fuerte de programas sociales",
        "  federales y estatales en Xalapa.",
        "- Oposición tradicional (PAN/PRI) debilitada",
        "  y sin perfiles de recambio frescos.",
        "- Atractivo para la clase media y sectores",
        "  profesionistas por perfil académico.",
        "- Viabilidad de gestionar obra pública e",
        "  inversión estatal directa para la capital."
      ];
      textLinesO.forEach((line, i) => doc.text(line, startX + colW + 11, startY + 18 + i * 6));

      // 3. DEBILIDADES (Ámbar)
      doc.setFillColor(255, 251, 235); // Amber 50
      doc.rect(startX, startY + rowH + 6, colW, rowH, "F");
      doc.setDrawColor(245, 158, 11); // Amber 500
      doc.rect(startX, startY + rowH + 6, colW, rowH, "D");
      doc.setTextColor(146, 64, 14); // Amber 800
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("DEBILIDADES (Interno)", startX + 5, startY + rowH + 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      let textLinesD = [
        "- Bajo posicionamiento inicial: Estructuras de",
        "  seccionales no creadas personalmente.",
        "- Dependencia de la marca: Su potencial está",
        "  fuertemente anclado a las siglas de Morena.",
        "- Blanco de corrientes internas celosas del",
        "  primer círculo de poder.",
        "- Poca experiencia en debate de plaza pública",
        "  y movilización de bases territoriales."
      ];
      textLinesD.forEach((line, i) => doc.text(line, startX + 5, startY + rowH + 24 + i * 6));

      // 4. AMENAZAS (Rojo)
      doc.setFillColor(254, 242, 242); // Red 50
      doc.rect(startX + colW + 6, startY + rowH + 6, colW, rowH, "F");
      doc.setDrawColor(239, 68, 68); // Red 500
      doc.rect(startX + colW + 6, startY + rowH + 6, colW, rowH, "D");
      doc.setTextColor(153, 27, 27); // Red 800
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("AMENAZAS (Externo)", startX + colW + 11, startY + rowH + 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      let textLinesA = [
        "- Crecimiento exponencial de MC en Xalapa",
        "  (captó 21k votos en 2025 para alcaldía).",
        "- Abstencionismo de elecciones intermedias,",
        "  encareciendo costo de movilización.",
        "- Desgaste natural de mitad de sexenio",
        "  estatal y federal.",
        "- Campañas de golpeteo dirigidas que busquen",
        "  asociarlo a fallas de administraciones locales."
      ];
      textLinesA.forEach((line, i) => doc.text(line, startX + colW + 11, startY + rowH + 24 + i * 6));

      // Footer Pag 2
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text("Página 2 of 3 - Comité de Estrategia Electoral Morena Veracruz", 15, 285);

      // --- PÁGINA 3: PROYECCIÓN Y SECCIONES ---
      doc.addPage();
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 25, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("3. Simulador de Participación y Base de Secciones", 15, 16);

      // Datos de Simulador Actual
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(11);
      doc.text("CONFIGURACIÓN DE ESCENARIO 2027 PERSISTIDO:", 15, 38);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(`- Lista Nominal de Electores: ${listaNominal.toLocaleString()} ciudadanos`, 15, 45);
      doc.text(`- Participación Electoral Estimada: ${participacionEstimada}%`, 15, 51);
      doc.text(`- Votos Estimados Totales: ${votosEmitidosEstimados.toLocaleString()} votos`, 15, 57);
      doc.text(`- Meta de Votación para MORENA: ${metaPorcentajeMorena}%`, 15, 63);
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(159, 18, 57);
      doc.text(`=> OBJETIVO REQUERIDO DE VOTOS MORENA: ${votosNecesariosMorena.toLocaleString()} votos en las urnas`, 15, 71);

      // Tabla de secciones (hasta 15 para que quepa perfectamente)
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Detalle Micro-Territorial (Secciones Activas)", 15, 84);
      doc.setDrawColor(226, 232, 240);
      doc.line(15, 87, 195, 87);

      // Cabecera Tabla
      doc.setFillColor(241, 245, 249); // slate-100
      doc.rect(15, 92, 180, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text("SECC", 17, 97);
      doc.text("DIST", 30, 97);
      doc.text("TIPOLOGÍA / COBERTURA", 45, 97);
      doc.text("LISTA NOM.", 100, 97);
      doc.text("VOTOS '24", 125, 97);
      doc.text("PART.", 150, 97);
      doc.text("TENDENCIA", 168, 97);

      // Filas
      doc.setFont("helvetica", "normal");
      let currentY = 105;
      const limitSecs = secciones.slice(0, 18); // Limitar a 18 para evitar desborde de hoja única
      limitSecs.forEach((sec, idx) => {
        // Fondo alternado para filas
        if (idx % 2 === 1) {
          doc.setFillColor(248, 250, 252); // slate-50
          doc.rect(15, currentY - 4, 180, 6.5, "F");
        }
        doc.text(sec.seccion || "", 17, currentY);
        doc.text(`D${sec.distrito || ""}`, 30, currentY);
        
        // Cortar texto de zona si es muy largo
        const z = sec.zona || "";
        const zonaTrunc = z.length > 28 ? z.substring(0, 26) + "..." : z;
        doc.text(zonaTrunc, 45, currentY);
        
        doc.text((sec.listaNominal ?? 0).toLocaleString(), 100, currentY);
        doc.text((sec.votosMorena2024 ?? 0).toLocaleString(), 125, currentY);
        doc.text(sec.participacion2024 || "", 150, currentY);
        doc.text(sec.tendencia || "", 168, currentY);

        currentY += 6.5;
      });

      if (secciones.length > 18) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(`* Mostrando las primeras 18 de ${secciones.length} secciones totales persistidas en la base de datos.`, 15, currentY + 3);
      }

      // Footer Pag 3
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text("Página 3 de 3 - Comité de Estrategia Electoral Morena Veracruz", 15, 285);

      // Descargar PDF
      doc.save("Plan_Estrategico_Electoral_Xalapa_2027.pdf");
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Error al generar el archivo PDF.");
    }
  };

  // Definición de las 6 diapositivas principales
  const slides = [
    // Slide 1: Portada
    {
      id: 0,
      title: "Planeación Estratégica Electoral",
      subtitle: "Xalapa 2027",
      content: (
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 h-full animate-slide-up">
          <div className="flex-1 space-y-8 text-left z-10">
            <div className="inline-flex items-center gap-2 bg-rose-900/30 border border-rose-500/30 text-rose-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(159,18,57,0.3)]">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Documento Confidencial
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight font-display">
              Rentabilidad <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-500">
                Electoral 2027
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl font-light leading-relaxed">
              Análisis cuantitativo de las últimas tres elecciones en los Distritos 10 y 11 de Xalapa. Prospectiva
              matemática y evaluación de perfil estratégico para el proceso de consolidación de la cuarta transformación.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-300 pt-2">
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2.5 rounded-xl backdrop-blur-sm">
                <Map size={16} className="text-rose-400" /> Distritos 10 & 11
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2.5 rounded-xl backdrop-blur-sm">
                <Target size={16} className="text-amber-400" /> Proyección Persistida
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md relative z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 to-amber-600/20 blur-3xl rounded-full"></div>
            <div className="bg-slate-900/80 border border-slate-700 p-8 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6 relative glow-effect">
              <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-3 font-display">
                <Crosshair className="text-rose-500" /> Objetivos Clave
              </h3>
              <div className="space-y-4">
                {[
                  "Evaluar viabilidad del Lic. Diego Castañeda Aburto.",
                  "Auditar rentabilidad histórica (2021, 2024, 2025).",
                  "Calcular piso de votos requeridos en escenarios 2027.",
                  "Sincronizar cambios territoriales en base de datos."
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50"
                  >
                    <span className="bg-rose-900/50 text-rose-300 font-black text-xs px-2 py-1 rounded flex-shrink-0 mt-0.5 border border-rose-700/50">
                      0{i + 1}
                    </span>
                    <span className="text-sm text-slate-300 font-medium">{text}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 font-medium uppercase tracking-wider">
                <span>Morena Veracruz</span>
                <span>Comité de Estrategia</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 2: Perfil
    {
      id: 1,
      title: "Perfil Estratégico",
      subtitle: "Diego Castañeda Aburto",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full animate-slide-up">
          <div className="md:col-span-4 bg-slate-900/60 border border-slate-700 p-8 rounded-3xl backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 blur-3xl rounded-full"></div>
            <div className="space-y-6 relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-700 to-slate-900 border border-rose-500/30 text-white flex items-center justify-center rounded-2xl text-4xl font-black shadow-[0_0_20px_rgba(159,18,57,0.4)] font-display">
                DC
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight font-display">Diego Castañeda</h3>
                <p className="text-sm text-rose-400 font-bold uppercase tracking-wider mt-1">Diputado Local LXVII</p>
                <p className="text-sm text-slate-400 mt-2 flex items-center gap-2">
                  <Users size={14} /> 44 años | Veracruzano
                </p>
              </div>
              <div className="border-t border-slate-700/50 pt-6 space-y-4">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest block">Formación</span>
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                  <p className="text-sm text-slate-200 font-medium">Licenciatura en Derecho</p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">Céd. 4381011</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                  <p className="text-sm text-slate-200 font-medium">Maestría en Derecho Notarial</p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">Céd. 12058462</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6 flex flex-col">
            <div className="bg-slate-900/60 border border-slate-700 p-8 rounded-3xl backdrop-blur-md flex-1">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp size={16} className="text-amber-500" /> Trayectoria Pública
              </h4>
              <div className="relative border-l-2 border-slate-700 ml-3 space-y-8">
                <div className="relative pl-6">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-rose-500 shadow-[0_0_10px_rgba(159,18,57,0.8)]"></span>
                  <p className="text-xs font-bold text-rose-400 uppercase tracking-wider">2024 - Presente</p>
                  <p className="text-base font-bold text-white mt-1">Diputado Local Plurinominal (MORENA)</p>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    Presidente de la Comisión de Gobernación y Puntos Constitucionales. Operador clave en el desahogo de
                    reformas constitucionales prioritarias.
                  </p>
                </div>
                <div className="relative pl-6">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-500"></span>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">2018 - 2021</p>
                  <p className="text-base font-bold text-slate-300 mt-1">Subsecretario de Asuntos Legislativos</p>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    Coordinación directa de la agenda legislativa del Estado durante la consolidación de la cuarta
                    transformación en Veracruz.
                  </p>
                </div>
                <div className="relative pl-6">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-600"></span>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">2005 - 2008</p>
                  <p className="text-base font-bold text-slate-300 mt-1">Contraloría y Gobernación</p>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    Secretario Particular del Subsecretario, Contralor Interno y Jefe de Convenios del Gobierno Estatal.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-900/20 to-slate-900/60 border border-amber-700/30 p-6 rounded-3xl backdrop-blur-md">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-3">
                <Target size={18} /> Vínculo Estratégico de Alto Nivel
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Figura de <strong>absoluta confianza de la Gobernadora Rocío Nahle</strong>. Su perfil garantiza un
                canal de interlocución directo, confiable y de alto impacto entre el Poder Ejecutivo y el Congreso,
                siendo clave para la gobernabilidad del estado.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 3: FODA
    {
      id: 2,
      title: "Matriz FODA",
      subtitle: "Evaluación multidimensional de competitividad",
      content: (
        <div className="h-full flex flex-col space-y-6 animate-slide-up">
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                id: "F",
                label: "Fortalezas",
                color: "from-emerald-900/50 to-emerald-900/10",
                border: "border-emerald-500/50",
                text: "text-emerald-400",
                icon: "💪",
              },
              {
                id: "O",
                label: "Oportunidades",
                color: "from-blue-900/50 to-blue-900/10",
                border: "border-blue-500/50",
                text: "text-blue-400",
                icon: "🎯",
              },
              {
                id: "D",
                label: "Debilidades",
                color: "from-amber-900/50 to-amber-900/10",
                border: "border-amber-500/50",
                text: "text-amber-400",
                icon: "⚠️",
              },
              {
                id: "A",
                label: "Amenazas",
                color: "from-rose-900/50 to-rose-900/10",
                border: "border-rose-500/50",
                text: "text-rose-400",
                icon: "🛡️",
              },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFodaActiveTab(tab.id)}
                className={`relative overflow-hidden flex flex-col items-center justify-center py-4 px-2 rounded-2xl transition-all duration-300 border ${
                  fodaActiveTab === tab.id
                    ? `bg-gradient-to-b ${tab.color} ${tab.border} shadow-lg transform scale-105 z-10`
                    : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="text-2xl mb-2">{tab.icon}</span>
                <span className={`text-sm font-bold tracking-wide ${fodaActiveTab === tab.id ? tab.text : ""}`}>
                  {tab.label}
                </span>
                {fodaActiveTab === tab.id && (
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${tab.color.split(" ")[0]} to-transparent`}
                  ></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 bg-slate-900/60 border border-slate-700 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/30 blur-3xl rounded-full"></div>

            {fodaActiveTab === "F" && (
              <div className="space-y-6 relative z-10 animate-slide-up">
                <h4 className="text-2xl font-black text-emerald-400 flex items-center gap-3 border-b border-emerald-900/50 pb-4 font-display">
                  Fortalezas Internas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-emerald-500/30 transition-colors">
                    <h5 className="text-white font-bold mb-2">Cercanía de Primer Nivel</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Relación de absoluta confianza con el Ejecutivo Estatal, garantizando un fuerte respaldo político y
                      capacidad de gestión.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-emerald-500/30 transition-colors">
                    <h5 className="text-white font-bold mb-2">Solidez Técnica y Jurídica</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Perfil altamente especializado en derecho constitucional y notarial, ideal para proyectar una imagen de
                      seriedad y debate de altura.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-emerald-500/30 transition-colors">
                    <h5 className="text-white font-bold mb-2">Control Institucional</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      La Presidencia de la Comisión de Gobernación le otorga una vitrina mediática permanente en los temas de
                      mayor trascendencia.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-emerald-500/30 transition-colors">
                    <h5 className="text-white font-bold mb-2">Sin Desgaste de Campaña</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Rostro fresco en el territorio sin los pasivos de administraciones municipales anteriores o
                      confrontaciones locales previas.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {fodaActiveTab === "O" && (
              <div className="space-y-6 relative z-10 animate-slide-up">
                <h4 className="text-2xl font-black text-blue-400 flex items-center gap-3 border-b border-blue-900/50 pb-4 font-display">
                  Oportunidades del Entorno
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-blue-500/30">
                    <h5 className="text-white font-bold mb-2">Inercia de la Marca Morena</h5>
                    <p className="text-slate-400 text-sm">
                      Xalapa mantiene una arraigada y sólida simpatía y lealtad hacia los programas sociales federales y
                      estatales.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-blue-500/30">
                    <h5 className="text-white font-bold mb-2">Debilidad Opositora (PAN/PRI)</h5>
                    <p className="text-slate-400 text-sm">
                      Ausencia de nuevos liderazgos de peso o propuestas de recambio dentro de la oposición tradicional en la
                      capital.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-blue-500/30">
                    <h5 className="text-white font-bold mb-2">Conexión con Sectores de Profesionistas</h5>
                    <p className="text-slate-400 text-sm">
                      Su perfil académico y especializado permite un diálogo más fluido con colegios de abogados, notarios y
                      clase media.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-blue-500/30">
                    <h5 className="text-white font-bold mb-2">Gestión Directa de Obra</h5>
                    <p className="text-slate-400 text-sm">
                      Gran capacidad para canalizar demandas urgentes de Xalapa directamente a las secretarías del Gobierno
                      del Estado.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {fodaActiveTab === "D" && (
              <div className="space-y-6 relative z-10 animate-slide-up">
                <h4 className="text-2xl font-black text-amber-400 flex items-center gap-3 border-b border-amber-900/50 pb-4 font-display">
                  Debilidades Internas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-amber-500/30">
                    <h5 className="text-white font-bold mb-2">Bajo Posicionamiento de Tierra</h5>
                    <p className="text-slate-400 text-sm">
                      Carece de una estructura social o red de seccionales construida personalmente a lo largo de los años.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-amber-500/30">
                    <h5 className="text-white font-bold mb-2">Blanco de Corrientes Celosas</h5>
                    <p className="text-slate-400 text-sm">
                      Estar tan ligado al primer círculo del poder genera recelos naturales por parte de otras facciones y
                      grupos locales.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-amber-500/30">
                    <h5 className="text-white font-bold mb-2">Dependencia Fuerte de la Marca</h5>
                    <p className="text-slate-400 text-sm">
                      Su viabilidad actual depende significativamente del arrastre de las siglas del partido sobre el imán
                      del voto directo.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-amber-500/30">
                    <h5 className="text-white font-bold mb-2">Falta de Fogueo Territorial</h5>
                    <p className="text-slate-400 text-sm">
                      Requerirá un fuerte proceso de acompañamiento en campañas de tierra masivas y oratoria de plaza pública.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {fodaActiveTab === "A" && (
              <div className="space-y-6 relative z-10 animate-slide-up">
                <h4 className="text-2xl font-black text-rose-400 flex items-center gap-3 border-b border-rose-900/50 pb-4 font-display">
                  Amenazas Externas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-rose-500/30">
                    <h5 className="text-white font-bold mb-2">Crecimiento de Movimiento Ciudadano</h5>
                    <p className="text-slate-400 text-sm">
                      MC captó un significativo volumen de votos (17%) en 2025. Representa una amenaza creciente en clases
                      medias.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-rose-500/30">
                    <h5 className="text-white font-bold mb-2">Desgaste Natural de Mitad de Sexenio</h5>
                    <p className="text-slate-400 text-sm">
                      El proceso de 2027 coincidirá con el periodo de evaluación y escrutinio intermedio de las gestiones.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-rose-500/30">
                    <h5 className="text-white font-bold mb-2">Ataques y Campañas de Desprestigio</h5>
                    <p className="text-slate-400 text-sm">
                      Riesgo latente de campañas de desprestigio dirigidas para debilitar su perfil ejecutivo.
                    </p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:border-rose-500/30">
                    <h5 className="text-white font-bold mb-2">Baja Participación Intermedia</h5>
                    <p className="text-slate-400 text-sm">
                      La tendencia histórica de menor participación en comicios intermedios encarece y dificulta la
                      movilización.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    // Slide 4: Histórico
    {
      id: 3,
      title: "Auditoría Histórica de Votación",
      subtitle: "Xalapa (2021 - 2025)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full animate-slide-up">
          <div className="md:col-span-8 space-y-4">
            <ProgressBar
              label="2021 - Elección Diputaciones Locales"
              morena={65696}
              pan={26665}
              total={138890}
              labelMorena="MORENA"
              labelPan="PAN"
            />
            <ProgressBar
              label="2024 - Elección Gubernatura"
              morena={88334}
              pan={47650}
              total={149973}
              labelMorena="MORENA"
              labelPan="PAN"
            />
            <ProgressBar
              label="2025 - Elección Ayuntamientos"
              morena={65859}
              pan={29186}
              mc={21625}
              total={126896}
              labelMorena="MORENA"
              labelPan="PAN"
            />
          </div>

          <div className="md:col-span-4 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-3xl flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full"></div>
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2 font-display">
              <AlertTriangle size={16} /> Insights de Rentabilidad
            </h4>
            <div className="space-y-6 flex-1 text-slate-300">
              <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-rose-500 before:rounded-full">
                <p className="text-white font-bold text-sm mb-1">El &quot;Piso&quot; Electoral</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Incluso en escenarios de participación reducida (2021, 2025), Morena tiene una base firme e inquebrantable
                  de <strong>~65,000 votos</strong>.
                </p>
              </div>
              <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-blue-500 before:rounded-full">
                <p className="text-white font-bold text-sm mb-1">Techo Opositor Limitado</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  El bloque PAN/PRI se muestra estancado, con dificultades serias para rebasar los 47,000 votos en su pico de
                  mayor fuerza (2024).
                </p>
              </div>
              <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-orange-500 before:rounded-full">
                <p className="text-white font-bold text-sm mb-1">Crecimiento de Tercera Vía</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Movimiento Ciudadano captó casi el 17% del voto total en 2025, capitalizando sectores de clases medias y
                  desencantados.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 5: Simulador persistente con IA
    {
      id: 4,
      title: "Simulador Táctico Electivo",
      subtitle: "Persistencia de metas y proyecciones 2027",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-slide-up">
          {/* Controles */}
          <div className="lg:col-span-5 bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-md flex flex-col justify-center space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                  Lista Nominal Total
                </label>
                <span className="text-xs text-rose-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Persistido
                </span>
              </div>
              <input
                type="number"
                value={listaNominal}
                onChange={e => {
                  const val = Number(e.target.value);
                  setListaNominal(val);
                  saveToDatabase({ listaNominal: val, participacionEstimada, metaPorcentajeMorena });
                }}
                className="w-full text-2xl font-black text-white bg-slate-900/50 border border-slate-700 px-6 py-3.5 rounded-2xl shadow-inner focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                  Participación Estimada
                </label>
                <span className="text-2xl font-black text-amber-400">{participacionEstimada}%</span>
              </div>
              <input
                type="range"
                min="35"
                max="65"
                value={participacionEstimada}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  setParticipacionEstimada(val);
                  saveToDatabase({ listaNominal, participacionEstimada: val, metaPorcentajeMorena });
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <span>35% (Baja)</span>
                <span>48% (Histórica)</span>
                <span>65% (Alta)</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                  Meta Voto MORENA
                </label>
                <span className="text-2xl font-black text-rose-500">{metaPorcentajeMorena}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="65"
                value={metaPorcentajeMorena}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  setMetaPorcentajeMorena(val);
                  saveToDatabase({ listaNominal, participacionEstimada, metaPorcentajeMorena: val });
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <span>40% (Competido)</span>
                <span>52% (Cómodo)</span>
                <span>65% (Aplastante)</span>
              </div>
            </div>
          </div>

          {/* Resultados e Inteligencia */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6 flex-1">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden shadow-xl">
                <BarChart3 className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-700/30" />
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 z-10">
                  Votos Totales Estimados
                </span>
                <span className="text-5xl font-black text-white z-10">{votosEmitidosEstimados.toLocaleString()}</span>
              </div>

              <div className="bg-gradient-to-br from-rose-900 to-rose-950 border border-rose-700 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden shadow-[0_0_30px_rgba(159,18,57,0.3)] glow-effect">
                <Target className="absolute -right-4 -bottom-4 w-32 h-32 text-rose-800/40" />
                <span className="text-sm font-bold text-rose-200 uppercase tracking-wider mb-2 z-10">
                  Meta Requerida MORENA
                </span>
                <span className="text-5xl font-black text-white z-10">{votosNecesariosMorena.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-200 uppercase tracking-widest mb-2 flex items-center gap-2 font-display">
                  <Bot size={16} className="text-emerald-400" /> Consultor Electoral AI (Gemini)
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Genera un memorándum táctico de movilización con la IA de Google a partir de las cifras de participación
                  persistidas actualmente en la base de datos.
                </p>
              </div>
              <button
                onClick={generarEstrategiaAI}
                className="whitespace-nowrap bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center gap-2 cursor-pointer"
              >
                Analizar Escenario ✨
              </button>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 6: Mapeo de Secciones (CRUD persistente)
    {
      id: 5,
      title: "Mapeo Territorial Interactivo",
      subtitle: "Auditoría por sección con base de datos e IA en tiempo real",
      content: (
        <div className="flex flex-col h-full space-y-6 animate-slide-up">
          {/* Controles y Búsqueda */}
          <div className="flex flex-col xl:flex-row gap-4 justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-inner">
            <div className="flex flex-wrap gap-3">
              <select
                className="bg-slate-800 text-sm text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl outline-none focus:border-rose-500 transition-colors cursor-pointer"
                value={filterDistrito}
                onChange={e => setFilterDistrito(e.target.value)}
              >
                <option value="all">📍 Ambos Distritos</option>
                <option value="10">Distrito 10</option>
                <option value="11">Distrito 11</option>
              </select>

              <select
                className="bg-slate-800 text-sm text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl outline-none focus:border-rose-500 transition-colors cursor-pointer"
                value={filterTendencia}
                onChange={e => setFilterTendencia(e.target.value)}
              >
                <option value="all">📊 Todas las Tendencias</option>
                <option value="Bastión">Bastión Morena</option>
                <option value="Competitivo">Zona Competitiva</option>
                <option value="Oposición">Oposición Fuerte</option>
              </select>

              <button
                onClick={openAddModal}
                className="bg-rose-700 hover:bg-rose-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Plus size={16} /> Nueva Sección
              </button>
            </div>

            <div className="relative w-full xl:w-72">
              <input
                type="text"
                placeholder="Buscar sección o cobertura..."
                className="w-full bg-slate-800 text-sm text-white border border-slate-700 pl-11 pr-4 py-2.5 rounded-xl outline-none focus:border-rose-500 transition-colors placeholder-slate-500"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-3 text-slate-400" size={16} />
            </div>
          </div>

          {/* Tabla de Secciones */}
          <div className="flex-1 overflow-auto rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm shadow-xl min-h-[300px]">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="sticky top-0 bg-slate-800 border-b border-slate-700 z-10 shadow-md">
                <tr>
                  <th className="py-4 px-4 font-bold text-slate-300 uppercase tracking-wider text-xs">Sección</th>
                  <th className="py-4 px-4 font-bold text-slate-300 uppercase tracking-wider text-xs">Tipología de Zona</th>
                  <th className="py-4 px-4 font-bold text-slate-300 uppercase tracking-wider text-xs text-right">
                    Lista Nom.
                  </th>
                  <th className="py-4 px-4 font-bold text-rose-400 uppercase tracking-wider text-xs text-right bg-rose-900/10">
                    Votos 2024
                  </th>
                  <th className="py-4 px-4 font-bold text-slate-300 uppercase tracking-wider text-xs text-center">Part.</th>
                  <th className="py-4 px-4 font-bold text-slate-300 uppercase tracking-wider text-xs text-center">Estatus</th>
                  <th className="py-4 px-4 font-bold text-indigo-400 uppercase tracking-wider text-xs text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredSecciones.length > 0 ? (
                  filteredSecciones.map((sec, idx) => (
                    <tr key={idx} className="hover:bg-slate-850 transition-colors group cursor-default">
                      <td className="py-3 px-4 font-mono font-bold text-white group-hover:text-rose-400 transition-colors">
                        {sec.seccion}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        <span className="text-slate-500 mr-2 font-bold text-xs bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                          D{sec.distrito}
                        </span>{" "}
                        {sec.zona}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-400">{sec.listaNominal?.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-rose-400 bg-rose-900/5">
                        {sec.votosMorena2024?.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-400">{sec.participacion2024}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wide border ${
                            sec.tendencia === "Bastión"
                              ? "bg-emerald-900/30 text-emerald-400 border-emerald-700/50"
                              : sec.tendencia === "Competitivo"
                              ? "bg-amber-900/30 text-amber-400 border-amber-700/50"
                              : "bg-rose-900/30 text-rose-400 border-rose-700/50"
                          }`}
                        >
                          {sec.tendencia}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => generarMensajeSeccionAI(sec)}
                            className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                            title="Generar guion para brigada"
                          >
                            <MessageSquare size={12} /> Mensaje ✨
                          </button>
                          <button
                            onClick={() => openEditModal(sec)}
                            className="bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Editar Sección"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteSection(sec.seccion)}
                            className="bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-950/40 border border-slate-700 p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar Sección"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                      <Search className="mx-auto mb-3 opacity-50" size={24} />
                      No se encontraron resultados para los filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => currentSlide < slides.length - 1 && setCurrentSlide(prev => prev + 1);
  const handlePrev = () => currentSlide > 0 && setCurrentSlide(prev => prev - 1);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-rose-500" size={48} />
        <h3 className="text-lg font-black tracking-widest font-display uppercase animate-pulse">
          Inicializando Base de Datos...
        </h3>
        <p className="text-sm text-slate-400">Conectando y cargando el estado táctico de Xalapa</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-rose-900 selection:text-white relative">
      {/* Contenedor Principal */}
      <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col h-[88vh] min-h-[660px] relative">
        {/* Efectos de Iluminación Superior */}
        <div className="absolute top-0 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50"></div>

        {/* Header Superior de la App */}
        <div className="bg-slate-900/80 backdrop-blur-md px-6 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center z-20 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-700 to-rose-900 rounded-xl flex items-center justify-center border border-rose-600/50 shadow-lg">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight font-display">{slides[currentSlide].title}</h2>
              <p className="text-xs text-rose-400 font-bold uppercase tracking-widest mt-0.5">
                {slides[currentSlide].subtitle}
              </p>
            </div>
          </div>

          {/* Menú de herramientas generales: Exportación PDF, Guardado DB, Sincronización */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Status de Sincronización de Base de Datos */}
            <div className="mr-2 text-xs font-mono font-medium flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
              {saveStatus === "saving" && (
                <>
                  <Loader2 size={12} className="animate-spin text-amber-400" />
                  <span className="text-amber-400">Sincronizando...</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400">DB Persistida</span>
                </>
              )}
              {saveStatus === "error" && (
                <>
                  <AlertTriangle size={12} className="text-rose-400" />
                  <span className="text-rose-400">Error Sinc.</span>
                </>
              )}
              {saveStatus === "idle" && (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-400">Base Sincronizada</span>
                </>
              )}
            </div>

            <button
              onClick={exportarA_PDF}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold p-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors flex items-center gap-2 text-xs cursor-pointer"
              title="Exportar Todo el Plan a Formato PDF"
            >
              <Download size={14} /> <span className="hidden md:inline">Exportar PDF</span>
            </button>

            <button
              onClick={handleResetDatabase}
              className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 p-2.5 rounded-xl border border-slate-700 hover:border-rose-950 transition-colors cursor-pointer"
              title="Restablecer base de datos por defecto"
            >
              <RefreshCw size={14} />
            </button>

            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Contenido de la Diapositiva */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-950 relative z-10">
          {slides[currentSlide].content}
        </div>

        {/* Barra de Navegación Inferior */}
        <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-5 flex items-center justify-between z-20">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
              currentSlide === 0
                ? "opacity-30 cursor-not-allowed text-slate-500"
                : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600"
            }`}
          >
            <ChevronLeft size={18} /> Anterior
          </button>

          <div className="flex gap-2.5 hidden md:flex">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  currentSlide === idx ? "w-10 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center gap-2 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
              currentSlide === slides.length - 1
                ? "opacity-30 cursor-not-allowed text-slate-500 bg-slate-800"
                : "bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(159,18,57,0.4)] hover:shadow-[0_0_25px_rgba(159,18,57,0.6)] border border-rose-500/50"
            }`}
          >
            Siguiente <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* MODAL DE INTELIGENCIA ARTIFICIAL GEMINI */}
      <AnimatePresence>
        {aiModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 w-full max-w-lg shadow-[0_0_50px_rgba(79,70,229,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-white flex items-center gap-2 font-display">
                  <Bot className="text-indigo-400" /> {aiModal.title}
                </h3>
                <button
                  onClick={() => setAiModal({ isOpen: false, title: "", content: "", isLoading: false })}
                  className="text-slate-400 hover:text-white bg-slate-800 hover:bg-rose-600 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="min-h-[150px] flex items-center justify-center bg-slate-950/50 rounded-2xl border border-slate-800 p-6">
                {aiModal.isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-indigo-500" size={32} />
                    <p className="text-sm font-bold text-slate-400 animate-pulse">Gemini está analizando los datos...</p>
                  </div>
                ) : (
                  <div className="text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
                    {aiModal.content}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 text-right">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center justify-end gap-2">
                  Powered by Gemini API <Bot size={12} />
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL CRUD: AGREGAR SECCIÓN */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                  <Plus className="text-rose-500" /> Agregar Nueva Sección
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddSection} className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Sección (Ej: 2120)</label>
                    <input
                      type="text"
                      required
                      value={formSeccion}
                      onChange={e => setFormSeccion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Distrito</label>
                    <select
                      value={formDistrito}
                      onChange={e => setFormDistrito(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500 cursor-pointer"
                    >
                      <option value={10}>Distrito 10</option>
                      <option value={11}>Distrito 11</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Tipología / Zona (Ej: Urbana Popular)</label>
                  <input
                    type="text"
                    required
                    value={formZona}
                    onChange={e => setFormZona(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Lista Nominal</label>
                    <input
                      type="number"
                      required
                      value={formListaNominal}
                      onChange={e => setFormListaNominal(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Votos Morena 2024</label>
                    <input
                      type="number"
                      required
                      value={formVotosMorena}
                      onChange={e => setFormVotosMorena(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Part. 2024</label>
                    <input
                      type="text"
                      required
                      value={formParticipacion}
                      onChange={e => setFormParticipacion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Rentabilidad</label>
                    <select
                      value={formRentabilidad}
                      onChange={e => setFormRentabilidad(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500 cursor-pointer"
                    >
                      <option value="Alta">Alta</option>
                      <option value="Media">Media</option>
                      <option value="Baja">Baja</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Tendencia</label>
                    <select
                      value={formTendencia}
                      onChange={e => setFormTendencia(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500 cursor-pointer"
                    >
                      <option value="Bastión">Bastión</option>
                      <option value="Competitivo">Competitivo</option>
                      <option value="Oposición">Oposición</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 rounded-xl cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL CRUD: EDITAR SECCIÓN */}
      <AnimatePresence>
        {isEditModalOpen && editingSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                  <Edit className="text-amber-500" /> Editar Sección {editingSection.seccion}
                </h3>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingSection(null);
                  }}
                  className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleEditSection} className="space-y-4 text-sm">
                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Distrito</label>
                  <select
                    value={formDistrito}
                    onChange={e => setFormDistrito(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500 cursor-pointer"
                  >
                    <option value={10}>Distrito 10</option>
                    <option value={11}>Distrito 11</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Tipología / Zona</label>
                  <input
                    type="text"
                    required
                    value={formZona}
                    onChange={e => setFormZona(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Lista Nominal</label>
                    <input
                      type="number"
                      required
                      value={formListaNominal}
                      onChange={e => setFormListaNominal(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Votos Morena 2024</label>
                    <input
                      type="number"
                      required
                      value={formVotosMorena}
                      onChange={e => setFormVotosMorena(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Part. 2024</label>
                    <input
                      type="text"
                      required
                      value={formParticipacion}
                      onChange={e => setFormParticipacion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Rentabilidad</label>
                    <select
                      value={formRentabilidad}
                      onChange={e => setFormRentabilidad(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500 cursor-pointer"
                    >
                      <option value="Alta">Alta</option>
                      <option value="Media">Media</option>
                      <option value="Baja">Baja</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Tendencia</label>
                    <select
                      value={formTendencia}
                      onChange={e => setFormTendencia(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white outline-none focus:border-rose-500 cursor-pointer"
                    >
                      <option value="Bastión">Bastión</option>
                      <option value="Competitivo">Competitivo</option>
                      <option value="Oposición">Oposición</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingSection(null);
                    }}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 rounded-xl cursor-pointer"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
