import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Cart({ cart, setCart }) {
  const cartIsEmpty = cart.length === 0;

  const handleCheckout = async () => {
    console.log("Attempting to checkout with cart:", cart);

    try {
      const response = await fetch(
        "http://localhost:4040/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const session = await response.json();
      // const stripe = await stripePromise;

      const data = await response.json();

      // Redirect to the Stripe checkout URL
      window.location.href = data.url;

      if (error) {
        console.error("Stripe checkout error:", error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const deleteItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  return (
    <div className="max-w-lg  bg-white shadow-lg rounded-lg overflow-hidden p-4 top-0 absolute mt-16 mx-5 md:right-5">
      {cartIsEmpty ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex gap-5 items-center">
                <img
                  className="w-16 h-16 object-cover rounded"
                  src={item.image}
                  alt={item.name}
                />
                <div className="ml-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-800 text-sm">Size: {item.size}</p>
                  <p className="text-gray-800 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <button
                className="px-3 py-2 bg-red-500 hover:bg-red-400 transition duration-200 text-white rounded"
                onClick={() => deleteItem(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <title>delete_3_line</title>
                  <g id="delete_3_line" fill="none" fill-rule="evenodd">
                    <path d="M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z" />
                    <path
                      fill="#FFF"
                      d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2h-1v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zM17 7H7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zm-2.72-3H9.72l-.333 1h5.226z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          ))}

          <button
            onClick={handleCheckout}
            className="w-full text-sm md:text-base px-4 py-2 mt-3 bg-teal-700 text-white rounded-md hover:bg-teal-600 transition duration-200"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
