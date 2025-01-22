import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../app/Slice/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const cart = useSelector((state) => state.cart); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return (
        <div className="w-full h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 poppins-regular">
            <div className="max-w-screen-xl mx-auto">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                        <h2 className="text-4xl font-bold text-gray-700">Your Cart is Empty</h2>
                        <p className="text-lg text-gray-500 mt-4">It seems like you haven&apos;t added any items yet. Go back and shop some products!</p>
                        <button 
                            onClick={() => navigate("/")}
                            className="mt-8 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Go to Shop
                        </button>
                    </div>
                ) : (
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                        <div className="flex justify-between items-center p-6 bg-gray-100 border-b">
                            <span className="text-xl font-semibold text-gray-800">Product</span>
                            <span className="text-xl font-semibold text-gray-800">Total</span>
                        </div>
                        <div className="flex flex-col gap-y-6 p-6">
                            {cart.map((product) => (
                                <div key={product.id} className="flex items-center justify-between py-4 border-b">
                                    <div className="flex items-center gap-x-6">
                                        <img 
                                            className="h-20 w-16 object-contain rounded-lg shadow-md" 
                                            src={product.image} 
                                            alt={`image-${product.id}`}
                                        />
                                        <div className="flex flex-col items-start space-y-2">
                                            <p className="text-lg font-medium text-gray-800">{product.title}</p>
                                            <div className="flex items-center gap-x-4">
                                                <button 
                                                    onClick={() => dispatch(decrementQuantity(product.id))}
                                                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                                                >
                                                    -
                                                </button>
                                                <span className="text-lg font-medium text-gray-800">{product.quantity}</span>
                                                <button 
                                                    onClick={() => dispatch(incrementQuantity(product.id))}
                                                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button 
                                                onClick={() => dispatch(removeFromCart(product.id))}
                                                className="text-sm text-red-600 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-lg font-medium text-gray-800">${(product.price * product.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-gray-100 text-right">
                            <span className="text-xl font-bold text-gray-800">
                                Total: ${cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
