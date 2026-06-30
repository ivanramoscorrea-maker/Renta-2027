import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DB_FILE_PATH = path.join(process.cwd(), "database.json");

// Default initial data for the database
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

const DEFAULT_STATE = {
  simulatorState: {
    listaNominal: 395753,
    participacionEstimada: 48,
    metaPorcentajeMorena: 52,
  },
  secciones: DEFAULT_SECCIONES,
};

async function readDatabase() {
  try {
    await fs.access(DB_FILE_PATH);
    const data = await fs.readFile(DB_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, write defaults and return them
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(DEFAULT_STATE, null, 2), "utf-8");
    return DEFAULT_STATE;
  }
}

async function writeDatabase(data: any) {
  await fs.writeFile(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const data = await readDatabase();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Database GET Error:", error);
    return NextResponse.json({ error: "Failed to read data from database." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.simulatorState || !data.secciones) {
      return NextResponse.json({ error: "Invalid database state structure." }, { status: 400 });
    }
    await writeDatabase(data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Database POST Error:", error);
    return NextResponse.json({ error: "Failed to save data to database." }, { status: 500 });
  }
}
