import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import OrderForm from "./components/OrderForm";
import OrderHistory from "./components/OrderHistory";
import OrderSummary from "./components/OrderSummary";
import Footer from "./components/Footer";
import CustomerList from "./components/CustomerList";
import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./components/Login";


function App() {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [autenticado, setAutenticado] = useState(
    () => Boolean(localStorage.getItem("token"))
  );
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
 

  return (
    <>
      {autenticado && (
        <Navbar
          cerrarSesion={() => {
            localStorage.removeItem("token");
            setAutenticado(false);
          }}
           />
      )}

      <Routes>
        <Route path="/"
        element={
          autenticado ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
        />

        <Route
          path="/nuevo-pedido"
          element={
            autenticado ? (
            <OrderForm
              productosSeleccionados={productosSeleccionados}
              setProductosSeleccionados={setProductosSeleccionados}
              clienteSeleccionado={clienteSeleccionado}
              setClienteSeleccionado={setClienteSeleccionado}
            />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
        path="/historial"
        element={
          autenticado ? (
            <OrderHistory />
          ) : (
            <Navigate to="/login" replace/>
          )
        }
        />

        <Route
          path="/perfil"
          element={
            autenticado ? (
              <section>
                <h1>Perfil</h1>
              </section>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/resumen"
          element={
            autenticado ? (
            <OrderSummary
              productosSeleccionados={productosSeleccionados}
              clienteSeleccionado={clienteSeleccionado}
              setProductosSeleccionados={setProductosSeleccionados}
              setClienteSeleccionado={setClienteSeleccionado}
            />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
        path="/login"
        element={<Login setAutenticado={setAutenticado}/>}
        />

        <Route 
      path="/clientes" element={<CustomerList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;