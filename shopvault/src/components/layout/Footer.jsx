import { Store } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-#341c08 text-#e8be7a mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Store size={18} className="text-#dc9f42"/>
                        <span className="font-serif text-lg font-bold text-#fdf8f0">Shop<span className="text-#dc9f42">Vault</span></span>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link to='/' className="hover:text-#dc9f42 transition">Shop</Link>
                        <Link to='/cart' className="hover:text-#dc9f42 transition">Cart</Link>
                        <Link to='/login' className="hover:text-#dc9f42 transition">Login</Link>
                    </div>
                    <p className="text-xs text-#a86814">Powered by {" "}<a href="https://fakestoreapi.com" target="_blank" rel="noreferrer" className="text-#dc9f42 hover:underline">FakeStoreAPI</a>{" "} Built with React + Redux Toolkit</p>
                </div>
            </div>
        </footer>
    )
}