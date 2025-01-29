import { useCart } from "../context/Cartcontext";

interface CartProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const { products, total, discount, removeFromCart, updateQuantity } = useCart();

  return (
    <>
    <div className="bg-white shadow-lg rounded-lg max-w-lg mx-auto my-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">ตะกร้าสินค้า</h2>
        <button
          className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          ปิด
        </button>
      </div>

      {/* List of products */}
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between py-4 px-2"
          >
            <div className="w-1/4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-24 object-cover rounded-md shadow-md"
              />
            </div>

            <div className="flex-1 px-4">
              <h3 className="text-lg font-medium text-gray-800">
                {product.title}
              </h3>
              
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(product.id, product.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center">{product.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, product.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-1">
                ฿{product.price.toLocaleString()} / ชิ้น
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="font-semibold text-yellow-500">
                ฿{(product.price * product.quantity).toLocaleString()}
              </span>
              <button
                onClick={() => removeFromCart(product.id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                ลบสินค้า
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total with discount display */}
      <div className="mt-6 border-t pt-4 text-right">
        {discount > 0 && (
          <div className="mb-2 text-green-600">
            <span className="text-lg font-semibold">ส่วนลด: </span>
            <span className="text-xl">{discount}%</span>
          </div>
        )}
        <span className="text-xl font-semibold text-gray-800">ยอดรวม: </span>
        <span className="text-2xl text-yellow-500">฿{total.toLocaleString()}</span>
      </div>
    </div>
    </>
  );
};

export default Cart;
