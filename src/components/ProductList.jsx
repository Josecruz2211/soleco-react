import { useState } from "react";

function ProductList({ onAgregar }) {
  const [busqueda, setBusqueda] = useState("");

  const productos = [
    {
      id: 1,
      nombre: "Detergente",
      precio: 15000,
      imagen: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      nombre: "Cloro",
      precio: 8000,
      imagen: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      nombre: "Desinfectante",
      precio: 12000,
      imagen: "https://via.placeholder.com/150"
    },
    {
      id: 4,
      nombre: "Jabón Líquido",
      precio: 10000,
      imagen: "https://via.placeholder.com/150"
    }
  ];

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

      <div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
            />

            <h3>{producto.nombre}</h3>

            <p>
              ${producto.precio.toLocaleString("es-CO")}
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