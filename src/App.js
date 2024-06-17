import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendCartData = async () => {
      const response = await fetch(
        "https://react-learn-t-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending data did not passed");
      }
      const responseData = await response.json();
    };
  }, [cart]);

  return (
    <Layout>
      {state && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
