import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

function OrderForm({
  productosSeleccionados,
  setProductosSeleccionados,
  clienteSeleccionado,
  setClienteSeleccionado
}) {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(true);

  // Cargar clientes desde la API
  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch("http://localhost:3000/api/clientes", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error de autenticación o respuesta del servidor');
        }
        return res.json();
      })
      .then(data => {
        const listaClientes = Array.isArray(data) ? data : (data.data || []);
        console.log("Estructura de un cliente recibido:", listaClientes[0]);
        setClientes(listaClientes);
        setLoadingClientes(false);
      })
      .catch(error => {
        console.error('Error al cargar clientes:', error);
        setClientes([]);
        setLoadingClientes(false);
      });
  }, []);

  const handleAgregar = (producto) => {
    setProductosSeleccionados((productosActuales) => {
      const productoExistente = productosActuales.find(
        (item) => item.id_producto === producto.id_producto
      );

      if (productoExistente) {
        return productosActuales.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...productosActuales,
        {
          ...producto,
          cantidad: 1
        }
      ];
    });
  };

  const aumentarCantidad = (id) => {
    setProductosSeleccionados((productosActuales) =>
      productosActuales.map((producto) =>
        producto.id_producto === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    );
  };

  const disminuirCantidad = (id) => {
    setProductosSeleccionados((productosActuales) =>
      productosActuales
        .map((producto) =>
          producto.id_producto === id
            ? { ...producto, cantidad: producto.cantidad - 1 }
            : producto
        )
        .filter((producto) => producto.cantidad > 0)
    );
  };

  const cantidadTotal = productosSeleccionados.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const totalPedido = productosSeleccionados.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  return (
    <main>
      {/* Sección de Selección de Clientes */}
      <section className="seleccion-clientes" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Seleccionar cliente</h3>
        {loadingClientes ? (
          <p>Cargando clientes...</p>
        ) : (
          <select
            value={clienteSeleccionado ? (clienteSeleccionado.id_cliente || clienteSeleccionado.id) : ""}
            onChange={(e) => {
              const idSeleccionado = Number(e.target.value);
              const clienteEncontrado = clientes.find(
                (c) => Number(c.id_cliente || c.id) === idSeleccionado
              );
              setClienteSeleccionado(clienteEncontrado || null);
            }}
            style={{ padding: '8px', fontSize: '1rem', width: '100%', maxWidth: '400px' }}
          >
            <option value="">-- Seleccionar cliente --</option>
            {clientes.map((cliente) => {
              const idcli = cliente.id_cliente || cliente.id;
              return (
                <option key={idcli} value={idcli}>
                  {cliente.nombre} - Tel: {cliente.telefono}
                </option>
              );
            })}
          </select>
        )}
      </section>

      <ProductList onAgregar={handleAgregar} />

      <section>
        <h2>Productos seleccionados</h2>

        {productosSeleccionados.length === 0 ? (
          <p>No hay productos seleccionados.</p>
        ) : (
          <>
            <ul>
              {productosSeleccionados.map((producto) => {
                const subtotal = producto.precio * producto.cantidad;

                return (
                  <li key={producto.id_producto}>
                    <strong>{producto.nombre}</strong>

                    <p>
                      Precio: $
                      {Number(producto.precio).toLocaleString("es-CO")}
                    </p>

                    <div className="controles-cantidad">
                      <button
                        type="button"
                        className="boton-cantidad"
                        onClick={() => disminuirCantidad(producto.id_producto)}
                      >
                        -
                      </button>

                      <span>{producto.cantidad}</span>

                      <button
                        type="button"
                        className="boton-cantidad"
                        onClick={() => aumentarCantidad(producto.id_producto)}
                      >
                        +
                      </button>
                    </div>

                    <p>
                      Subtotal: $
                      {subtotal.toLocaleString("es-CO")}
                    </p>
                  </li>
                );
              })}
            </ul>

            <p>
              <strong>Cantidad total:</strong> {cantidadTotal}
            </p>

            <p>
              <strong>Total del pedido:</strong> $
              {totalPedido.toLocaleString("es-CO")}
            </p>

            <button
              type="button"
              onClick={() => navigate("/resumen")}
              disabled={productosSeleccionados.length === 0 || !clienteSeleccionado}
            >
              Ver resumen
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default OrderForm;