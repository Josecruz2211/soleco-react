import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setAutenticado }) {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = async (event) => {
    event.preventDefault();

    if (!correo.trim() || !contrasena.trim()) {
      setError("Debes completar todos los campos.");
      return;
    }

    try {
      setError("");

      const respuesta = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            correo,
            contrasena
          })
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        setError(resultado.message || "Credenciales incorrectas.");
        return;
      }

      const token = resultado.data?.token;

      if (!token) {
        setError("La API no devolvió un token de autenticación.");
        return;
      }

      localStorage.setItem("token", token);
      setAutenticado(true);
      navigate("/");
    } catch {
      setError("No fue posible conectar con la API.");
    }
  };

  return (
    <main className="login-container">
      <section className="login-card">
        <div className="login-logo">
          <strong>SOLECO</strong>
          <span>DISTRIBUIDORA</span>
        </div>

        <h1>Inicio de Sesión</h1>

        <form onSubmit={iniciarSesion}>
          <label htmlFor="correo">
            Correo electrónico o nombre de usuario
          </label>

          <input
            id="correo"
            type="text"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
          />

          <label htmlFor="contrasena">
            Contraseña
          </label>

          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit">
            Ingresar
          </button>
        </form>

        <a href="#" onClick={(event) => event.preventDefault()}>
          ¿Olvidaste tu contraseña?
        </a>
      </section>
    </main>
  );
}

export default Login;