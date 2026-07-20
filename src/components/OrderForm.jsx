function OrderForm() {
  return (
    <section>
      <h2>Registrar Pedido</h2>

      <div className="formulario-pedido">
        <input
          type="text"
          placeholder="Nombre del cliente"
        />

        <input
          type="text"
          placeholder="Producto"
        />

        <input
          type="number"
          placeholder="Cantidad"
        />

        <button>
          Registrar Pedido
        </button>
      </div>
    </section>
  );
}

export default OrderForm;