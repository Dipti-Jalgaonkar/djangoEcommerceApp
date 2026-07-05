import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

function ProductDetails() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    console.log(product, "products in cart");

    useEffect(() => {
        fetch(`${BASE_URL}/api/products/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id, BASE_URL]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No Product Found</div>;
    }

    // return (
    //     <Link
    //         to={`product/${product.id}`}
    //         className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform p-4 cursor-pointer"
    //     >
    //         <img
    //             src={BASE_URL + product.image}
    //             alt={product.name}
    //             className="w-full h-56 ovect-cover rounded-lg mb-4"
    //         />
    //         <h2 className="text-lg font-semibold text-gray-800 truncate">
    //             {product.name}
    //         </h2>
    //         <p className="text-gray-600 font-medium ">${product.price}</p>
    //         <p className="text-gray-600 font-medium ">${product.description}</p>
    //     </Link>
    // );

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full md:w-1/2 h-auto object-cover rounded-lg "
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>
                        <p className="texxt-xl text-gray-600 font-semibold mb-4">
                            {product.description}
                        </p>
                        <p className="texxt-xl text-gray-600 font-semibold mb-4">
                            ${product.price}
                        </p>
                        <button
                            onClick={() => addToCart(product.id)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Add To Cart
                        </button>
                        <div className="mt-4">
                            <a
                                href="/"
                                className="text-blue-600 hover:underline"
                            >
                                &larr; Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
