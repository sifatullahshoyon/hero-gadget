import { Link, useLoaderData } from "react-router-dom";
import CartItem from "./CartItem";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakeDB";
import { useContext } from "react";
import { CartContext } from "../../App";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  let total = 0;
  if (cart.length > 0) {
    for (let product of cart) {
      total = total + product.price * product.quantity;
    }
  }

  //   Remove item from shopping cart
  const handleRemoveItem = (id) => {
    const remaining = cart?.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
    toast.error("Product Remove");
  };

  //   Delete Shopping Cart
  const handleDeleteCart = () => {
    deleteShoppingCart();
  };

  //   Place Order
  const orderHandler = () => {
    if (cart.length > 0) {
      setCart([]);
      deleteShoppingCart();
      return toast.success("Order Done");
    }
    return toast.error("Cart Empty");
  };

  // Clear Cart
  const deleteCartHandler = () => {
    if (cart.length > 0) {
      setCart([]);
      deleteShoppingCart();
      return toast.success("All Items Removed!");
    }
    return toast.error("Cart is Empty");
  };
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 text-gray-900">
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10">
        <h2 className="text-xl font-semibold">
          {cart.length ? "Review Cart Items" : "Cart is EMPTY!"}
        </h2>
        <ul className="flex flex-col divide-y divide-gray-700">
          {cart?.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount: <span className="font-semibold">{total}$</span>
          </p>
          <p className="text-sm text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        {/* btn */}
        <div className="flex justify-end space-x-4">
          {cart.length > 0 ? (
            <button onClick={deleteCartHandler} className="btn-outlined">
              Clear Cart
            </button>
          ) : (
            <Link to={"/shop"}>
              <button className="btn-outlined">Back To Shop</button>
            </Link>
          )}
          <button onClick={orderHandler} className="btn-primary">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
