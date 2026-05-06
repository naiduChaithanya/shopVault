import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { clearError } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { loginUser } from "../features/auth/authThunks";
import { Eye, EyeOff, LogIn, Store } from "lucide-react";

export default function LoginPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {isAuthenticated, isLoading, error} = useAuth();

    const [form, setForm] = useState({username: "mor_2314", password: "83r5^_"})
    const [showPwd, setShowPwd] = useState(false);

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if(isAuthenticated) navigate(from, {replace: true});
    }, [isAuthenticated, navigate, from]);

    useEffect(() => {
        return () => dispatch(clearError())
    },[dispatch]);

    const handleChange = (e) => setForm((f) => ({...f, [e.target.name]: e.target.value}));

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!form.username || !form.password){
            toast.error("Please fill all fields");
            return;
        }
        const result = await dispatch(loginUser(form));
        if(loginUser.fulfilled.match(result)){
            toast.success("Welcome back!")
        }
    };

    return (
        <div>
            <div>
                {/* header */}
                <div>
                    <div>
                        <Store size={24}/>
                        <span>Shop<span>Vault</span></span>
                    </div>
                    <h1>Welcome back</h1>
                    <p>Sign in to your account</p>
                </div>
                <div>
                    {/* demo credentials hint */}
                    <div>
                        <strong>Demo credentials:</strong> <br/>
                        Username: <code>mor_2314</code> . Password: <code>83r5^_</code>
                    </div>
                    {error && (
                        <div>{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username</label>
                            <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Enter Username" className="input" autoComplete="username"/>
                        </div>
                        <div>
                            <label>Password</label>
                            <div>
                                <input type={showPwd ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Enter password" className="input pr-10" autoComplete="current-password"/>
                                <button type="button" onClick={() => setShowPwd((v) => !v)}>{showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                            </div>
                        </div>
                        <button>
                            {isLoading ? (
                                <div></div>
                            ) : (
                                <LogIn size={16}/>
                            )}
                            {isLoading ? "Signing in... " : "Sign In"}
                        </button>
                    </form>
                    <p>Don't have an account? {" "}
                        <Link>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}