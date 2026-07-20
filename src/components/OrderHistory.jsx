function OrderHistory() {
  const pedidos = [
    {
      id: "001",
      cliente: "Juan Pérez",
      total: "$35.000"
    },
    {
      id: "002",
      cliente: "María Gómez",
      total: "$28.000"
    },
    {
      id: "003",
      cliente: "Carlos Rodríguez",
      total: "$42.000"
    }
  ];

  return (
    <section>
      <h2>Historial de Pedidos</h2>

      <table className="tabla-pedidos">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>#{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default OrderHistory;