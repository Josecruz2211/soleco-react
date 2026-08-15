import { Link, useNavigate } from "react-router-dom";

function Navbar({ cerrarSesion }) {
  const navigate = useNavigate();

  const manejarCierreSesion = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <nav>
      <h2>SOLECO</h2>

      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li>
          <Link to="/nuevo-pedido">Nuevo Pedido</Link>
        </li>

        <li>
          <Link to="/historial">Historial</Link>
        </li>

        <li>
          <Link to="/perfil">Perfil</Link>
        </li>

        <li>
          <button type="button" onClick={manejarCierreSesion}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;