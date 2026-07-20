function CustomerList() {
  const clientes = [
    {
      nombre: "Juan Pérez",
      telefono: "3001234567"
    },
    {
      nombre: "María Gómez",
      telefono: "3109876543"
    },
    {
      nombre: "Carlos Rodríguez",
      telefono: "3204567890"
    }
  ];

  return (
    <section>
      <h2>Gestión de Clientes</h2>

      <table className="tabla-clientes">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.nombre}</td>
              <td>{cliente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default CustomerList;