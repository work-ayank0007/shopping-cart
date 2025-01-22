import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../app/Slice/cartSlice";
import axios from "axios";
import { BsCartPlus, BsCartX } from "react-icons/bs";
import { toast } from "react-toastify";

const Home = () => {
    const [data, setData] = useState([]);
    const cart = useSelector((state) => state.cart); 
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data:", error);
            });
    }, []);

    const isInCart = (id) => cart.some((item) => item.id === id);

    const handleCartClick = (product) => {
        if (isInCart(product.id)) {
            dispatch(removeFromCart(product.id));
            toast.error(`${product.title} removed from cart!`, { position: "top-right" });
        } else {
            dispatch(addToCart(product));
            toast.success(`${product.title} added to cart!`, { position: "top-right" });
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-8 p-4 items-end poppins-regular">
            {data.map((product) => (
                <div
                    key={product.id}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[20em]"
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-48 w-32 rounded-t-lg object-contain mb-4 mx-auto"
                    />
                    <h2 className="text-xl font-semibold">{product.title}</h2>
                    <p className="text-gray-500 text-sm mt-2">
                        {product.description.substring(0, 100) + "..."}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-bold text-green-500">${product.price}</p>
                        {isInCart(product.id) ? (
                            <BsCartX
                                className="text-red-500 cursor-pointer"
                                onClick={() => handleCartClick(product)}
                            />
                        ) : (
                            <BsCartPlus
                                className="text-green-500 cursor-pointer"
                                onClick={() => handleCartClick(product)}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
