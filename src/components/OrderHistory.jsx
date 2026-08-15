function OrderHistory() {
  const pedidos = [
    {
      id: "001",
      fecha: "05/08/2026",
      cliente: "Juan Pérez",
      estado: "Entregado"
    },
    {
      id: "002",
      fecha: "04/08/2026",
      cliente: "María Gómez",
      estado: "Pendiente"
    },
    {
      id: "003",
      fecha: "02/08/2026",
      cliente: "Carlos Rodríguez",
      estado: "Cancelado"
    }
  ];

  return (
    <main>
      <section>
        <h1>Historial de Pedidos</h1>

        <table className="tabla-pedidos">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Fecha</th>
              <th>Cliente / Establecimiento</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>#{pedido.id}</td>
                <td>{pedido.fecha}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default OrderHistory;