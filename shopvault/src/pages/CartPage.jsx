import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

export default function CartPage(){
    const {items} = useCart();

    if(items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-5 text-center">
                <div className="w-20 h-20 rounded-full bg-#f9edda flex items-center justify-center">
                    <ShoppingBag size={36} className="text-#dc9f42"/>
                </div>
                <h2 className="font-serif text-2xl font-bold text-#5c3617">Your cart is empty</h2>
                <p className="text-#dc9f42 text-sm">Add sme products to get started</p>
                <Link to="/" className="btn-primary mt-2">Browse Products</Link>
            </div>
        )
    }

    return(
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/" className="flex items-center gap-2 text-sm text-#c9841e hover:text-#874f12 transition mb-6"><ArrowLeft size={15}/>Continue shopping</Link>
            <h1 className="font-serif text-3xl font-bold text-#341c08 mb-8">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {items.map((items) => (
                        <CartItem key={items.id} item={item}/>
                    ))}
                </div>
                <div>
                    <CartSummary/>
                </div>
            </div>
        </div>
    )
}