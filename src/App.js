import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data...",
        })
      );
      const response = await fetch(
        "https://react-learn-t-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending data did not passed");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Send cart data ",
        })
      );
    };

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Sending cart data failed...",
        })
      );
    });
  }, [cart]);

  return (
    <Layout>
      {state && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
