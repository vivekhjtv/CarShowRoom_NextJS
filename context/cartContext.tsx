'use client';
// Import necessary modules
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define types for CartContext
interface CartContextType {
  cartProduct: string[];
  wishlist: string[];
  setCartProduct: React.Dispatch<React.SetStateAction<string[]>>;
  setWishlist: React.Dispatch<React.SetStateAction<string[]>>;
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
}

// Create the CartContext with undefined initial value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the CartContextProvider component
export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartProduct, setCartProduct] = useState<string[]>(() => {
    // Initialize state from localStorage, checking if it's available
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } else {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    // Initialize wishlist from localStorage, checking if it's available
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem('wishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } else {
      return [];
    }
  });

  useEffect(() => {
    if (cartProduct?.length > 0 && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartProduct));
    }
  }, [cartProduct]);

  useEffect(() => {
    if (wishlist?.length > 0 && typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addProduct = (productId: string) => {
    setCartProduct((prev) => [...prev, productId]);
  };

  const removeProduct = (productId: string) => {
    setCartProduct((prev) => {
      const updatedCart = prev.filter((id) => id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
      return updatedCart;
    });
  };

  const addToWishlist = (productId: string) => {
    setWishlist((prev) => [...prev, productId]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter((id) => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update localStorage
      return updatedWishlist;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartProduct,
        wishlist,
        setCartProduct,
        setWishlist,
        addProduct,
        removeProduct,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the CartContext
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }
  return context;
};

export default CartContext; // Export CartContext for usage
