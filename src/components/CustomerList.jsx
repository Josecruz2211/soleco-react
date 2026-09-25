import react, { useEffect, useState } from 'react';

function CustomerList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/clientes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al obtener los clientes');
        }
        return res.json();
      })
      .then(data => {
        // Ajusta según la estructura de tu respuesta (ej. data.data o data directamente)
        setClientes(data.data || data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>Error: {error}</p>;

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
          {clientes.length > 0 ? (
            clientes.map((cliente, index) => (
              <tr key={cliente.id || index}>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No hay clientes registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default CustomerList;