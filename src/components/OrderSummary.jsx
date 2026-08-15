import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSummary({ productosSeleccionados }) {
  const navigate = useNavigate();
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const cantidadTotal = productosSeleccionados.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const totalPedido = productosSeleccionados.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  const regresar = () => {
    navigate("/nuevo-pedido");
  };

  const confirmarPedido = () => {
    if (productosSeleccionados.length === 0) {
      return;
    }

    setPedidoConfirmado(true);
  };

  if (productosSeleccionados.length === 0) {
    return (
      <main>
        <section>
          <h1>Resumen del Pedido</h1>

          <p>No hay productos seleccionados.</p>

          <button type="button" onClick={regresar}>
            Volver a Nuevo Pedido
          </button>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section>
        <button type="button" onClick={regresar}>
          Regresar
        </button>

        <h1>Resumen del Pedido</h1>

        {productosSeleccionados.map((producto) => {
          const subtotal = producto.precio * producto.cantidad;

          return (
            <article key={producto.id}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
              />

              <h2>{producto.nombre}</h2>

              <p>
                Precio: $
                {producto.precio.toLocaleString("es-CO")}
              </p>

              <p>
                Cantidad: {producto.cantidad}
              </p>

              <p>
                Subtotal: $
                {subtotal.toLocaleString("es-CO")}
              </p>
            </article>
          );
        })}

        <div>
          <p>
            <strong>Cantidad total:</strong> {cantidadTotal}
          </p>

          <p>
            <strong>Total del Pedido:</strong> $
            {totalPedido.toLocaleString("es-CO")}
          </p>
        </div>

        {!pedidoConfirmado ? (
          <button
            type="button"
            onClick={confirmarPedido}
          >
            Confirmar Pedido
          </button>
        ) : (
          <p>
            Pedido confirmado correctamente.
          </p>
        )}

        <button
          type="button"
          onClick={regresar}
        >
          Seguir Comprando
        </button>
      </section>
    </main>
  );
}

export default OrderSummary;