import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      {showCart && <Cart onCloseCart={() => setShowCart(false)} />}
      <Header onShowCart={() => setShowCart(true)} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
