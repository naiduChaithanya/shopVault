import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { Eye, EyeOff, Store, UserPlus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { registerUser } from "../features/auth/authThunks";

export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated, isLoading, error} = useAuth();

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: ""
    });

    const [showPwd, setShowPwd] = useState(false);

    useEffect(() => {
        if(isAuthenticated) navigate("/", {replace: true});
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => dispatch(clearError());
    },[dispatch]);

    const handleChange = (e) => setForm((f) => ({...f, [e.target.name]: e.target.value}));

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {firstname, lastname, email, username, password} = form;
        if(!firstname || !email || !username || !password){
            toast.error("Please fill all required fields")
            return;
        }
        if(password.length < 6){
            toast.error("Password must be at least 6 characters");
            return;
        }
        const result = await dispatch(registerUser(form));
        if(registerUser.fulfilled.match(result)){
            toast.success("Account created! Welcome to ShopVault 🎉")
        }
    }

    const fields = [
        { name: "firstname", label: "First name *", type: "text", placeholder: "John"},
        { name: "lastname", label: "Last name", type: "text", placeholder: "Doe"},
        { name: "email", label: "Email *", type: "email", placeholder: "john@example.com" },
        { name: "username", label: "Username *", type: "text", placeholder: "johndoe"},
    ];

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md animate-slide-up">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Store size={24} className="text-#a86814"/>
                        <span className="font-serif text-2xl font-bold">Shop<span className="text-#a86814">Vault</span></span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-#341c08">Create account</h1>
                    <p className="text-#dc9f42 text-sm mt-1">Join ShopVault today</p>
                </div>
                <div className="card p-8">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4">{error}</div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            {fields.slice(0,2).map((f) => (
                                <div key={f.name}>
                                    <label className="text-xs font-medium text-#a86814 mb-1.5 block">{f.label}</label>
                                    <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className="input" />
                                </div>
                            ))}
                        </div>
                        {fields.slice(2).map((f) => (
                            <div>
                                <label className="text-xs font-medium text-#a86814 mb-1.5 block">{f.label}</label>
                                <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className="input"/>
                            </div>
                        ))}
                        <div>
                            <label className="text-xs font-medium text-#a86814 mb-1.5 block">Password *</label>
                            <div className="relative">
                                <input type={showPwd ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" className="input pr-10"/>
                                <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-#dc9f42 hover:text-#a86814">{showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className="btn-primary flex items-center justify-center gap-2 py-3 mt-1 disabled:opacity-60 disabled:cursor-not-allowed">{isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                        ) : (
                            <UserPlus size={16}/>
                        )}
                        {isLoading ? "Creating account..." : "Create account"}
                        </button>
                    </form>
                    <p className="text-center text-sm text-#dc9f42 mt-5">Already have an account? {" "}
                        <Link to="/login" className="text-#a86814 font-medium hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}