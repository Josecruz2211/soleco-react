import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

function OrderForm({
  productosSeleccionados,
  setProductosSeleccionados
}) {
  const navigate = useNavigate();

  const handleAgregar = (producto) => {
    setProductosSeleccionados((productosActuales) => {
      const productoExistente = productosActuales.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return productosActuales.map((item) =>
          item.id === producto.id
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
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    );
  };

  const disminuirCantidad = (id) => {
    setProductosSeleccionados((productosActuales) =>
      productosActuales
        .map((producto) =>
          producto.id === id
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
                  <li key={producto.id}>
                    <strong>{producto.nombre}</strong>

                    <p>
                      Precio: $
                      {producto.precio.toLocaleString("es-CO")}
                    </p>

                    <div className="controles-cantidad">
                      <button
                        type="button"
                        className="boton-cantidad"
                        onClick={() => disminuirCantidad(producto.id)}
                      >
                        -
                      </button>

                      <span>{producto.cantidad}</span>

                      <button
                        type="button"
                        className="boton-cantidad"
                        onClick={() => aumentarCantidad(producto.id)}
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
              disabled={productosSeleccionados.length === 0}
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