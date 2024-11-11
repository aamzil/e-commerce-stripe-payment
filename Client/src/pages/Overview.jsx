import React from "react";
import { useState } from "react";

function Overview({ addToCart }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [itemquantity, SetItemquantity] = useState(1);
  const [message, setMessage] = useState("");

  const product = {
    id: 1,
    name: "Men's Oversize Black T-shirt For Your Casual Days.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodimollitia earum sunt ad hic molestias saepe laudantium, eos temporesit vel nobis similique dolorum impedit id. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corrupti autem consequatur illo sapiente dolorem repellat ea, explicabo fuga ut nobis expedita dignissimos deleniti. Tempore laudantium omnis illum cum vero?",
    price: 30 * itemquantity,
    image:
      "https://isto.pt/cdn/shop/files/Heavyweight_Black_ef459afb-ff7a-4f9a-b278-9e9621335444.webp?v=1710414950",
    sizes: ["S", "M", "L", "XL"],
    quantity: itemquantity,
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({
        ...product,
        size: selectedSize,
        price: product.price,
        quantity: product.quantity,
      });
      setMessage("Item added to the cart.");
    } else {
      setMessage("Please select a size.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="grid py-14 lg:flex justify-evenly items-center h-[100%] lg:h-[100vh] w-[100%] px-10 mt-5">
      <div className=" lg:w-[50%] w-[100%] ">
        <img src={product.image} alt="" srcset="" width={"90%"} />
      </div>
      <div className=" lg:w-[50%] w-[100%] h-full lg:h-[100vh] grid place-content-center ml-auto mr-auto">
        <h1 className="font-semibold text-4xl lg:text-5xl">{product.name}</h1>
        <h2 className="font-bold text-3xl lg:text-4xl mt-4 text-teal-700">
          {product.price} $
        </h2>

        <div className="flex gap-4">
          <div className="flex gap-2 text-2xl mt-5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700"
                } transition duration-200`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:flex md:gap-2 ">
          <div className="flex gap-1 mt-5 ">
            <button
              onClick={() =>
                SetItemquantity(itemquantity > 1 ? itemquantity - 1 : 1)
              }
              className="bg-black px-5 py-2 rounded-xl text-white hover:bg-neutral-800 duration-300 "
            >
              -
            </button>
            <button className="bg-inherit border-black border-[2px] px-5 py-2 rounded-xl">
              {itemquantity}
            </button>
            <button
              onClick={() => SetItemquantity(itemquantity + 1)}
              className="bg-black px-5 py-2 rounded-xl text-white hover:bg-neutral-800 duration-300"
            >
              +
            </button>
          </div>

          <div className="flex gap-2 mt-5 ">
            <button
              onClick={handleAddToCart}
              className="bg-teal-700 flex gap-2 items-center hover:bg-teal-600 duration-300 px-5 py-2 rounded-xl text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <title>shopping_cart_2_line</title>
                <g id="shopping_cart_2_line" fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                  <path
                    fill="#fff"
                    d="M9 20a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2M3.495 2.631l.105.07 1.708 1.28a2 2 0 0 1 .653.848l.06.171h12.846a2 2 0 0 1 1.998 2.1l-.013.148-.457 3.655a5 5 0 0 1-4.32 4.34l-.226.023-7.313.61.26 1.124H17.5a1 1 0 0 1 .117 1.993L17.5 19H8.796a2 2 0 0 1-1.906-1.393l-.043-.157-2.74-11.87L2.4 4.3a1 1 0 0 1 .985-1.723zM18.867 7H6.487l1.595 6.906 7.6-.633a3 3 0 0 0 2.728-2.617z"
                  />
                </g>
              </svg>
              Add to cart
            </button>
          </div>
        </div>

        <p className={`mt-2 text-teal-700 ease-in-out duration-300`}>
          {message}
        </p>

        <div className="mt-8">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
