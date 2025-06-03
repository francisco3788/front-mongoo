const Botones = () => {
  // ✅ Dirección directa al backend Flask
  const baseURL = "http://localhost:5000";

  const descargarExcel = () => {
    window.location.href = `${baseURL}/api/descargar`;
  };

  const descargarFiltrado = (e) => {
    e.preventDefault();
    const inicio = document.getElementById("inicio").value;
    const fin = document.getElementById("fin").value;
    if (!inicio || !fin) return alert("Selecciona ambas fechas.");
    window.location.href = `${baseURL}/api/descargar/filtrado?inicio=${inicio}&fin=${fin}`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <button
        onClick={descargarExcel}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        📥 Descargar Todo Excel
      </button>

      <form onSubmit={descargarFiltrado} className="flex flex-wrap gap-2 items-center">
        <input
          type="datetime-local"
          id="inicio"
          className="bg-gray-900 border border-gray-700 rounded text-white px-2 py-1"
        />
        <input
          type="datetime-local"
          id="fin"
          className="bg-gray-900 border border-gray-700 rounded text-white px-2 py-1"
        />
        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
        >
          🔍 Filtrar y Descargar
        </button>
      </form>

      <a
        href="/graficas"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        📊 Ver Gráficas
      </a>
    </div>
  );
};

export default Botones;
