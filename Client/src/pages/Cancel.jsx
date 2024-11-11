import React from "react";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <div className="h-[100vh]">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-10 rounded-lg  w-[80%]">
          <h1 className="text-3xl font-bold text-center mb-5">Oops!</h1>
          <p className="text-lg text-center mb-5">
            It's looks like there was an error ordering the product.
          </p>
          <button className="flex justify-center ml-auto mr-auto">
            <Link
              to="/"
              className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white"
            >
              Back to Home
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
