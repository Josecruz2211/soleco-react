import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSummary({ productosSeleccionados, clienteSeleccionado, setProductosSeleccionados, setClienteSeleccionado }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

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

  const confirmarPedido = async () => {
    if (productosSeleccionados.length === 0 || !clienteSeleccionado) {
      setMensajeError("Falta seleccionar un cliente o productos para el pedido.");
      return;
    }

    setLoading(true);
    setMensajeError("");

    const token = localStorage.getItem("token");
    const idVendedor = localStorage.getItem("id_vendedor") || localStorage.getItem("id_usuario") || 1;
    const codigoPedido = `PED-${Date.now().toString().slice(-6)}`;
    const idCliente = clienteSeleccionado.id_cliente || clienteSeleccionado.id;

    // Estructura de datos para enviar al backend
    const datosPedido = {
      codigo_pedido: codigoPedido,
      id_cliente: Number(idCliente),
      id_vendedor: Number(idVendedor),
      observaciones: "Pediddo realizado desde la app web",
      total: totalPedido,
      detalles: productosSeleccionados.map((p) => ({
        id_producto: p.id_producto || p.id,
        cantidad: p.cantidad,
        precio_unitario: p.precio
      }))
    };

    console.log("Enviando pedido al backend:", datosPedido);

    try {
      const response = await fetch("http://localhost:3000/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(datosPedido)
      });

      if (!response.ok) {
        const errordata = await response.json().catch(() => ({}));
        console.error("Respuesta del servidor al rechazar (Error 400):", errorData);

        throw new Error(errorData.mensaje || errorData.error || "Error al registrar el pedido.");
      }

      setPedidoConfirmado(true);

      // Limpiar datos del estado global del pedido
      if (setProductosSeleccionados) setProductosSeleccionados([]);
      if (setClienteSeleccionado) setClienteSeleccionado(null);

      // Redirigir al historial después de 2 segundos
      setTimeout(() => {
        navigate("/historial");
      }, 2000);

    } catch (error) {
      console.error("Error confirmando pedido:", error);
      setMensajeError(`No se pudo guardar el pedido: ${error.mensaje}`);
    } finally {
      setLoading(false);
    }
  };

  if (productosSeleccionados.length === 0 && !pedidoConfirmado) {
    return (
      <main>
        <section style={{ padding: "20px" }}>
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
      <section style={{ padding: "20px", maxWidth: "600px" }}>
        <button type="button" onClick={regresar} style={{ marginBottom: "15px" }}>
          Regresar
        </button>

        <h1>Resumen del Pedido</h1>

        {/* Información del Cliente */}
        {clienteSeleccionado && (
          <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "6px", marginBottom: "20px" }}>
            <h3>Datos del Cliente</h3>
            <p><strong>Nombre:</strong> {clienteSeleccionado.nombre}</p>
            <p><strong>Teléfono:</strong> {clienteSeleccionado.telefono}</p>
            {clienteSeleccionado.direccion && <p><strong>Dirección:</strong> {clienteSeleccionado.direccion}</p>}
          </div>
        )}

        {/* Detalle de Productos (Sin imágenes) */}
        <h3>Productos</h3>
        {productosSeleccionados.map((producto) => {
          const subtotal = producto.precio * producto.cantidad;
          const idProd = producto.id_producto || producto.id;

          return (
            <article 
              key={idProd} 
              style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px" }}
            >
              <h2>{producto.nombre}</h2>
              <p>Precio: ${Number(producto.precio).toLocaleString("es-CO")}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <p>Subtotal: ${subtotal.toLocaleString("es-CO")}</p>
            </article>
          );
        })}

        {/* Totales */}
        <div style={{ marginTop: "20px", fontSize: "1.1rem" }}>
          <p><strong>Cantidad total:</strong> {cantidadTotal}</p>
          <p><strong>Total del Pedido:</strong> ${totalPedido.toLocaleString("es-CO")}</p>
        </div>

        {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}

        {/* Acciones */}
        {!pedidoConfirmado ? (
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              type="button"
              onClick={confirmarPedido}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Confirmar Pedido"}
            </button>
            <button type="button" onClick={regresar}>
              Seguir Comprando
            </button>
          </div>
        ) : (
          <div style={{ color: "green", marginTop: "20px" }}>
            <p><strong>¡Pedido confirmado y registrado correctamente!</strong></p>
            <p>Redirigiendo al historial...</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default OrderSummary;