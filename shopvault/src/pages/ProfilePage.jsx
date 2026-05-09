import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";
import { LogOut, Mail, Package, ShieldCheck, ShoppingBag, User } from "lucide-react";

export default function ProfilePage(){
    const {user, handleLogout} = useAuth();
    const {items, total, count} = useCart();
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        toast("Logged out successfully", {icon: "👋"});
        navigate("/");
    };

    const initials = `${user?.name?.firstname?.[0] || ""} ${user?.name?.Lastname?.[0] || user?.username?.[0] || ""}`.toUpperCase();

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
            <h1 className="font-serif text-3xl font-bold text-#5c3617 mb-8">My Profile</h1>
            <div className="grid grid-col-1 md:grid-cols-3 gap-6">
                {/* avatar card */}
                <div className="card p-6 flex flex-col items-center gap-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-#874f12 text-white flex items-center justify-center font-serif text-2xl font-bold">
                        {initials || <User size={32}/>}
                    </div>
                    <div>
                        <p className="font-semibold text-#5c3617 text-lg capitalize">{user?.name?.firstname} {user?.name?.lastname}</p>
                        <p className="text-sm text-#dc9f42">@{user?.username}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100"><ShieldCheck size={12} /> JWT Authenticated</div>
                </div>
    
                {/* info */}
                <div className="card p-6 md:col-span-2 flex flex-col gap-5">
                    <h2 className="font-display text-lg font-bold text-#5c3617">Account Details</h2>
                    <div className="space-y-4">
                        {[
                            {icon: <User size={16}/>, label: "Full Name", value: `${user?.name?.firstname || ""}${user?.name?.lastname || ""}`.trim() || "—"},
                            {icon: <Mail size={16}/>, label: "Email", value: user?.email || "—" },
                            {icon: <ShoppingBag size={16}/>, label: "Username", value: `@${user?.username}`},
                            {icon: <Package size={16}/>,  label: "Account ID", value: `#${user?.id || "—"}`}
                        ].map((row) => {
                            <div key={row.label} className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-#f9edda flex items-center justify-center text-#a86814 shrink-0">
                                    {row.icon}
                                </div>
                                <div>
                                    <p className="text-xs text-#dc9f42">{row.label}</p>
                                    <p className="text-sm font-medium text-#6e4016">{row.value}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                {/* cart summary card */}
                <div className="card p-6 md:col-span-3">
                    <h2 className="font-serif text-lg font-bold text-#5c3617 mb-4">Current cart</h2>
                    {items.length === 0 ? (
                        <p className="text-sm text-#dc9f42 ">Your cart is enpty!</p>
                    ) : (
                        <div className="space-y-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between text-sm py-2 border-b border-#f9edda last:border-0">
                                    <span className="text-#874f12 line-clamp-1 flex-1">{item.title}</span>
                                    <span className="text-#dc9f42 mx-3">x {item.quantity}</span>
                                    <span className="font-medium text-#6e4016">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between pt-2 font-bold text-#5c3617 ">
                                <span>Total ({count} items)</span>
                                <span className="font-serif text-lg">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button onClick={onLogout} className="mt-8 flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transsition font-medium">
                <LogOut size={16}/> Sign out of ShopVault
            </button>
        </div>
    )
}