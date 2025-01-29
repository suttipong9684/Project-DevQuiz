/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useReducer } from "react";

import { cartReducer } from "../reducer/cartReducer.js";

// ใช้ interface สำหรับข้อมูลใน CartContext
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  total: number;
  amount: number;
  discount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

// ตั้งค่า CartContext ให้เริ่มต้นเป็น undefined หรือค่า default
const CartContext = createContext<CartContext | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

const initState = {
  products: [] as Product[],
  total: 0,
  amount: 0,
  discount: 0,
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initState);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ 
      type: "UPDATE_QUANTITY", 
      payload: { id: productId, quantity } 
    });
  };

  // คำนวณ total และ amount ทุกครั้งที่ products เปลี่ยนแปลง
  useEffect(() => {
    console.log("Products changed:", state.products);
    dispatch({ type: "CALCULATE" });
  }, [state.products]);

  return (
    <CartContext.Provider value={{ 
      ...state, 
      addToCart, 
      removeFromCart, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
