import { useEffect, useState } from "react";

function ProductList({ onAgregar }) {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const token = localStorage.getItem("token");

        const respuesta = await fetch(
          "http://localhost:3000/api/productos",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
          setError(resultado.message || "No fue posible obtener los productos.");
          return;
        }

        setProductos(resultado.data || []);
      } catch {
        setError("No fue posible conectar con la API.");
      }
    };

    obtenerProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section>
      <h2>Nuevo Pedido</h2>

      <input
        type="search"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        aria-label="Buscar producto"
      />

      {error && <p>{error}</p>}

      <div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <div className="producto-card" key={producto.id_producto}>
            <h3>{producto.nombre}</h3>

            <p>
              ${Number(producto.precio).toLocaleString("es-CO")}
            </p>

            <button
              type="button"
              onClick={() => onAgregar(producto)}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;