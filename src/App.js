import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Category from "./pages/category";
import Products from "./pages/products";
import Product from "./pages/product";
import { CartProvider } from "./context/CartContext";
import Bag from "./pages/bag";
import Nopage from "./pages/nopage";
import ScrollToTop from "./components/scrollTop";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path=":gender" element={<Category />} />
              <Route path=":gender/:category" element={<Products />} />
              <Route
                path=":gender/:category/:productId"
                element={<Product />}
              />
              <Route path="bag" element={<Bag />} />
            </Route>
            <Route path="*" element={<Nopage />} />
          </Routes>
        
      </BrowserRouter>
    </CartProvider>
  );
}
