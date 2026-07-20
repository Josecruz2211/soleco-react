import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import CustomerList from "./components/CustomerList";
import OrderForm from "./components/OrderForm";
import OrderHistory from "./components/OrderHistory";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Dashboard />
      <ProductList />
      <CustomerList />
      <OrderForm />
      <OrderHistory />
      <Footer />
    </>
  );
}

export default App;