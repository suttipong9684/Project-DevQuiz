import { useState, useEffect } from "react";
import { useCart } from "../context/Cartcontext";
import Cart from "./Cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const { amount } = useCart();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav>
      <div className="flex items-center justify-between px-6 py-3 bg-blue-950 shadow-md z-50">
        {/* Logo */}
        <div className="font-semibold  text-yellow-500 text-xl sm:text-2xl">
          บ้านนายดิน
        </div>

        {/* Cart Button */}
        <button
          className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18M3 12h18M3 21h18"
            />
          </svg>
          ตะกร้าสินค้า
          {amount > 0 && (
            <span className="ml-2 text-sm bg-red-600 text-white rounded-full px-2 py-1">
              {amount}
            </span>
          )}
        </button>

        {/* Navbar Sticky */}

        <div className={`flex items-center justify-between px-6 py-3 bg-blue-950 shadow-md z-10 fixed top-0 left-0 w-full transform transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}` }>
        {/* Logo */}
        <div className="font-semibold  text-yellow-500 text-xl sm:text-2xl">
          บ้านนายดิน
        </div>

        {/* Cart Button */}
        <button
          className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18M3 12h18M3 21h18"
            />
          </svg>
          ตะกร้าสินค้า
          {amount > 0 && (
            <span className="ml-2 text-sm bg-red-600 text-white rounded-full px-2 py-1">
              {amount}
            </span>
          )}
        </button>

        {/* Cart Modal */}
        <div
          className={`bg-white w-full sm:w-96 fixed top-0 right-0 h-screen z-30 transform transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Cart setIsOpen={setIsOpen} />
        </div>
      </div>

        {/* Cart Modal */}
        <div
          className={`bg-white w-full sm:w-96 fixed top-0 right-0 h-screen z-30 transform transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Cart setIsOpen={setIsOpen} />
        </div>
      </div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="bg-black opacity-50 w-screen h-screen fixed top-0 left-0 z-10"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      )}
    </nav>
  );
};

export default Navbar;
