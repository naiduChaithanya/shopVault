import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useCallback, useState } from "react";
import { LogOut, Menu, ShoppingCart, Store, User } from "lucide-react";

export default function Navbar(){
    const {isAuthenticated, user, handleLogout} = useAuth();
    const {count} = useCart();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const onLogout = useCallback(() => {
        handleLogout();
        navigate("/");
        setMenuOpen(false)
    }, [handleLogout, navigate]);

    return (
        <header className="sticky top-0 z-50 bg-#341c08 text-#d4cec4 shadow-lg bg-gray-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <Store size={22} className="text-#dc9f42 group-hover:text-#e8be7a transistion"/>
                    <span className="font-serif text-xl  font-bold tracking-tight">Shop<span className="text-#dc9f42">Vault</span></span>
                </Link>
                {/* desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium text-#f2d9b0 hover:text-#dc9f42 transistion">Shop</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="text-sm font-medium text-#f2d9b0 hover:text-#dc9f42 transistion">
                                <User size={15}/>
                                {user?.name?.firstname || user?.username}
                            </Link>
                            <button onClick={onLogout} className="text-sm font-medium text-#f2d9b0 hover:text-#dc9f42 transition flex items-center gap-1.5"> <LogOut size={15}/> Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-#f2d9b0 hover:text-#dc9f42 transistion">Login</Link>
                            <Link to="/register" className="btn-primary">Sign Up</Link>
                        </>
                    )}
                    {/* cart */}
                    <Link to="/cart" className="relative p-2 rounded-full hover:bg-#6e4016 transition">
                        <ShoppingCart size={20}/>
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-#dc9f42 text-#341c08 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{count > 9 ? "9+" : count}</span>
                        )}
                    </Link>
                </div>
                {/* mobile */}
                <div className="md:hidden flex items-center gap-3">
                    <Link to="/cart" className="relative p-2">
                        <ShoppingCart size={20}/>
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-#dc9f42 text-#341c08 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{count}</span>
                        )}
                    </Link>
                    <button onClick={() => setMenuOpen((o) => !o)} className="p-2">{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
                </div>
            </nav>
            {/* mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-#5c3617 px-4 pb-4 flex flex-col gap-3 animate-fade-in">
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-#f2d9b0 py-2 border-b border-#6e4016 ">Shop</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-#f2d9b0 py-2 border-b border-#6e4016 ">Profile</Link>
                            <button onClick={onLogout} className="text-sm font-medium text-#dc9f42 py-2 text-left">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-#f2d9b0 py-2 border-b border-#6e4016 ">Login</Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-#dc9f42 py-2">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}