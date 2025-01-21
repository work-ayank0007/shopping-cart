import { NavLink, useNavigate } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="bg-green-400 w-full py-2">
            <div className="mx-auto max-w-screen-xl bg-white rounded-full flex justify-between px-8" >
                <h1 className="poppins-regular text-xl" onClick={() => navigate('/')}>GREENCART</h1>
                <ul className="flex items-center gap-x-4" >
                    <li><NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "active" : " underline underline-offset-2"
                        }
                    >Home</NavLink></li>
                    <li><NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            isActive ? "active" : " underline underline-offset-2"
                        }
                    ><FiShoppingCart /></NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar