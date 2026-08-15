import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setAutenticado }) {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = (event) => {
    event.preventDefault();

    if (!correo.trim() || !contrasena.trim()) {
      setError("Debes completar todos los campos.");
      return;
    }

    setError("");
    setAutenticado(true);
    navigate("/");
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