import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import {useNavigate} from "react-router-dom"
import { CreditCard, ShieldCheck } from "lucide-react";

export default function CartSummary(){
    const {total, count, handleClearCart} = useCart();
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const shipping = total > 50 ? 0 : 4.99;
    const tax = total * 0.08;
    const grandTotal = total + shipping + tax;

    const handleCheckOut = () => {
        if(!isAuthenticated){
            toast.error("Please login to checkout");
            navigate("/login");
            return;
        }
        toast.success("Order placed! Thank you for shopping at ShopVault 🎉");
        handleClearCart();
        navigate("/");
    };

    return(
        <div className="card p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-#5c3617">Order Summary</h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-#a86814">
                    <span>Subtotal ({count} items)</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-#a86814">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-#a86814">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                {total < 50 && (
                    <p className="text-xs text-#dc9f42 bg-#fdf8f0 rounded-lg px-3 py-2">Add ${(50 - total).toFixed(2)} more for free shipping</p>
                )}
                <div className="border-t border-#f9edda pt-3 flex justify-between font-bold text-#5c3617 text-base">
                    <span>Total</span>
                    <span className="font-serif text-xl">${grandTotal.toFixed(2)}</span>
                </div>
            </div>
            <button onClick={handleCheckOut} className="btn-primary w-full mt-5 flex items-center justify-center gap-2"><CreditCard size={16}/></button>
            <div className="flex items-center gap-2 mt-4 text-xs text-#dc9f42 justify-center">
                <ShieldCheck size={13}/> Secure checkout . JWT Protected
            </div>
        </div>
    )
}