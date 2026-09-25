import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/pedidos", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener el historial de pedidos.");
        }
        return res.json();
      })
      .then((data) => {
        const listaPedidos = Array.isArray(data) ? data : (data.data || []);
        setPedidos(listaPedidos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar pedidos:", err);
        setError("Error al cargar el historial.");
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: "20px", maxWidth: "800px" }}>
      <h1>Historial de Pedidos</h1>

      <button 
        type="button" 
        onClick={() => navigate("/nuevo-pedido")}
        style={{ marginBottom: "20px" }}
      >
        + Crear Nuevo Pedido
      </button>

      {loading && <p>Cargando historial de pedidos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && pedidos.length === 0 && (
        <p>No se han registrado pedidos hasta el momento.</p>
      )}

      {!loading && !error && pedidos.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {pedidos.map((pedido) => {
            const idPed = pedido.id_pedido || pedido.id;
            return (
              <article
                key={idPed}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "#fff"
                }}
              >
                <h3>Pedido #{idPed}</h3>
                <p><strong>Cliente:</strong> {pedido.cliente_nombre || pedido.nombre_cliente || "Cliente N/A"}</p>
                <p>
                  <strong>Total:</strong> ${Number(pedido.total || 0).toLocaleString("es-CO")}
                </p>
                {pedido.fecha && (
                  <p>
                    <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString("es-CO")}
                  </p>
                )}
                {pedido.estado && (
                  <p>
                    <strong>Estado:</strong> <span>{pedido.estado}</span>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default OrderHistory;