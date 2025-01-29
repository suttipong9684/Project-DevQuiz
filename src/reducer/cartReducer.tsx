interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  products: Product[];
  total: number;
  amount: number;
  discount: number;
}

type CartAction = 
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "CALCULATE"; payload?: never }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } };

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const productInCart = state.products.find((product) => product.id === action.payload.id);

      if (productInCart) {
        const updateCart = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity + action.payload.quantity,
            };
          }
          return product;
        });
        return { ...state, products: updateCart };
      } else {
        const updateCart = [...state.products, action.payload];
        return { ...state, products: updateCart };
      }
    }

    case "CALCULATE": {
      // จัดกลุ่มสินค้าตาม ID และเก็บจำนวน
      const groupedProducts = state.products.reduce((sum, item) => {
        if (!sum[item.id]) {
          sum[item.id] = { ...item, count: item.quantity };
        }
        return sum;
      }, {} as { [key: number]: Product & { count: number } });

      let totalPrice = 0;
      const remainingProducts = { ...groupedProducts };
      let maxDiscount = 0;

      // คำนวณไปเรื่อยๆ จนกว่าจะไม่มีสินค้าเหลือ
      while (Object.values(remainingProducts).some(item => item.count > 0)) {
        // รวบรวมสินค้าที่ยังมีจำนวนเหลืออยู่
        const availableProducts = Object.values(remainingProducts)
          .filter(item => item.count > 0);
        
        const uniqueCount = availableProducts.length;
        
        // คำนวณส่วนลดตามจำนวนรายการที่ไม่ซ้ำกัน
        let discount = 0;
        if (uniqueCount >= 7) discount = 0.60;
        else if (uniqueCount >= 6) discount = 0.50;
        else if (uniqueCount >= 5) discount = 0.40;
        else if (uniqueCount >= 4) discount = 0.30;
        else if (uniqueCount >= 3) discount = 0.20;
        else if (uniqueCount >= 2) discount = 0.10;

        maxDiscount = Math.max(maxDiscount, discount);
        
        // คำนวณราคาสำหรับชุดปัจจุบัน
        let setPrice = 0;
        availableProducts.forEach(product => {
          setPrice += product.price;
          remainingProducts[product.id].count--;
        });

        // เพิ่มราคาหลังหักส่วนลดเข้าไปในราคารวม
        totalPrice += setPrice * (1 - discount);

        // ลบสินค้าที่ไม่มีจำนวนเหลือแล้วออกจาก remainingProducts
        Object.keys(remainingProducts).forEach(id => {
          if (remainingProducts[Number(id)].count <= 0) {
            delete remainingProducts[Number(id)];
          }
        });
      }

      // คำนวณจำนวนรวมของสินค้าทั้งหมด
      const totalAmount = state.products.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        total: totalPrice,
        amount: totalAmount,
        discount: maxDiscount * 100
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        products: updatedProducts
      };
    }

    case "UPDATE_QUANTITY": {
      // ถ้าจำนวนน้อยกว่า 1 ให้ลบสินค้าออก
      if (action.payload.quantity < 1) {
        return {
          ...state,
          products: state.products.filter(product => product.id !== action.payload.id)
        };
      }

      // ถ้าจำนวนมากกว่าหรือเท่ากับ 1 ให้อัพเดทจำนวน
      const updatedProducts = state.products.map(product => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity
          };
        }
        return product;
      });
      return {
        ...state,
        products: updatedProducts
      };
    }

    default:
      return state;
  }
};
