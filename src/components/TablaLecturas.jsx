import axios from "axios";
import moment from "moment-timezone";
import { useEffect, useState } from "react";

// ✅ Cambiar por tu URL pública de Render
const baseURL = "https://mongo-backkk.onrender.com";

const TablaLecturas = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/datos`);
        setDatos(res.data.reverse());
      } catch (err) {
        console.error("Error al cargar tabla", err);
      }
    };

    cargar();
    const intervalo = setInterval(cargar, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="overflow-x-auto bg-gray-800 rounded shadow">
      <table className="table-auto w-full text-sm text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2">Fecha (Colombia)</th>
            <th className="px-4 py-2">Sensor 1 (°C)</th>
            <th className="px-4 py-2">Sensor 2 (°C)</th>
            <th className="px-4 py-2">Sensor 3 (°C)</th>
            <th className="px-4 py-2">Sensor 4 (°C)</th>
            <th className="px-4 py-2">Temp DHT22 (°C)</th>
            <th className="px-4 py-2">Humedad DHT22 (%)</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i} className="even:bg-gray-900">
              <td className="border px-2 py-1">
                {moment(d.timestamp).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss")}
              </td>
              <td className="border px-2 py-1">{d.t1?.toFixed(2) ?? "—"}</td>
              <td className="border px-2 py-1">{d.t2?.toFixed(2) ?? "—"}</td>
              <td className="border px-2 py-1">{d.t3?.toFixed(2) ?? "—"}</td>
              <td className="border px-2 py-1">{d.t4?.toFixed(2) ?? "—"}</td>
              <td className="border px-2 py-1">{d.tempDHT?.toFixed(2) ?? "—"}</td>
              <td className="border px-2 py-1">{d.humDHT?.toFixed(2) ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaLecturas;
