import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromCart } from "../app/Slice/cartSlice";
import axios from "axios";
import { BsCartPlus, BsCartX } from "react-icons/bs";

const Home = () => {
    const [data, setData] = useState([]);
    const cart = useSelector((state) => state.cart); // Access cart state directly
    const dispatch = useDispatch();

    // Fetch product data
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
    useEffect(()=>{
        console.log(cart);
        
    },[cart])
    // Check if product is in the cart
    const isInCart = (id) => cart.some((item) => item.id === id);

    // Handle adding/removing from cart
    const handleCartClick = (product) => {
        if (isInCart(product.id)) {
            dispatch(removeFromCart(product.id)); // Remove from cart if it's already there
        } else {
            dispatch(addToCart(product)); // Add to cart if not already there
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-8 p-4 items-end">
            {data.map((product) => (
                <div
                    key={product.id}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[20em]"
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-48 rounded-t-lg object-fit mb-4 mx-auto"
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
