import { useCart } from "../context/Cartcontext";
import { products } from "../assets/products";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const ProductList = () => {

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 }); // เพิ่มสินค้าและกำหนด quantity เป็น 1
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 bg-white mb-5 z-10 -mt-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-2 bg-white shadow-md rounded-xl  transform transition-all hover:scale-105 duration-300 relative"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg "
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-gray-800 py-4">
              {product.title}
            </h3>
            <div className="mt-2 text-sm text-gray-600"></div>
            <div className=" text-blue-950 font-bold mt-2">
              <span className="text-2xl ">
                ฿{product.price.toLocaleString()}
              </span>
              <button
                className="px-2 py-1 rounded-md float-right  bg-yellow-500 text-white hover:yellow-600 z-30 "
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
