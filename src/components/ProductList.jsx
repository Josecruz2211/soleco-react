function ProductList() {
  const productos = [
    { nombre: "Detergente", precio: "$15.000" },
    { nombre: "Cloro", precio: "$8.000" },
    { nombre: "Desinfectante", precio: "$12.000" },
    { nombre: "Jabón Líquido", precio: "$10.000" }
  ];

  return (
    <section>
      <h2>Catálogo de Productos</h2>

      <div className="productos-grid">
        {productos.map((producto, index) => (
          <div className="producto-card" key={index}>
            <h3>{producto.nombre}</h3>
            <p>{producto.precio}</p>
            <button>Ver Detalle</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;