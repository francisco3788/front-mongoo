import { useState, useEffect } from "react";
import axios from "axios";
import TablaLecturas from "./TablaLecturas";
import Graficas from "./Graficas";
import Botones from "./Botones";

// ✅ URL del backend en Render
const baseURL = "https://mongo-backkk.onrender.com";

const Home = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/datos`);
        setDatos(res.data.reverse());
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchDatos();
    const intervalo = setInterval(fetchDatos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-center text-3xl font-bold mb-6">
        📡 Lecturas en Tiempo Real
      </h2>

      <Botones />

      <TablaLecturas datos={datos} />

      <div className="mt-10">
        <Graficas datos={datos.slice(-10)} />
      </div>
    </div>
  );
};

export default Home;
