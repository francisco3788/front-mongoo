import { useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment-timezone";
import Chart from "chart.js/auto";

// ✅ Usar dominio seguro
const baseURL = "https://misensores.duckdns.org";

export default function Graficas() {
  const chartRefs = [useRef(), useRef(), useRef(), useRef()];
  const chartInstances = useRef([]);

  const crearGrafico = (canvasRef, label, data, labels, index) => {
    if (chartInstances.current[index]) {
      chartInstances.current[index].destroy();
    }

    chartInstances.current[index] = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: "cyan",
            tension: 0.3,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          x: { ticks: { color: "#fff" } },
          y: { ticks: { color: "#fff" } },
        },
        plugins: {
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });
  };

  const cargarDatos = () => {
    axios.get(`${baseURL}/api/datos`)
      .then((res) => {
        const datos = res.data.slice(-10);
        const labels = datos.map((d) =>
          moment(d.timestamp).tz("America/Bogota").format("HH:mm:ss")
        );

        const sensores = ["t1", "t2", "t3", "t4"];

        sensores.forEach((sensor, i) => {
          const values = datos.map((d) =>
            d[sensor] !== undefined ? d[sensor].toFixed(2) : null
          );
          crearGrafico(chartRefs[i], `Sensor ${i + 1} (°C)`, values, labels, i);
        });
      })
      .catch((err) => console.error("Error al cargar datos", err));
  };

  useEffect(() => {
    cargarDatos();
    const interval = setInterval(cargarDatos, 5000);
    return () => {
      clearInterval(interval);
      chartInstances.current.forEach((chart) => chart?.destroy());
    };
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📈 Gráficas de Sensores en Tiempo Real</h2>
      <div className="row">
        {chartRefs.map((ref, i) => (
          <div className="col-md-6 mb-4" key={i}>
            <canvas ref={ref}></canvas>
          </div>
        ))}
      </div>
    </div>
  );
}
