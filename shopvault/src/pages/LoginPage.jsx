import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authThunks.js";
import { clearError } from "../features/auth/authSlice.js";
import { useAuth } from "../hooks/useAuth.js";
import { Eye, EyeOff, LogIn, Store } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, error } = useAuth();

  const [form, setForm] = useState({ username: "mor_2314", password: "83r5^_" });
  const [showPwd, setShowPwd] = useState(false);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back!");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Store size={24} className="text-#a86814" />
            <span className="font-display text-2xl font-bold">
              Shop<span className="text-#a86814">Vault</span>
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-#341c08">Welcome back</h1>
          <p className="text-#dc9f42 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="card p-8">
          {/* Demo credentials hint */}
          <div className="bg-vault-50 border border-#f2d9b0 rounded-xl p-3 mb-5 text-xs text-#a86814">
            <strong>Demo credentials:</strong><br />
            Username: <code className="font-mono">mor_2314</code> · Password: <code className="font-mono">83r5^_</code>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-#a86814 mb-1.5 block">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="input"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-#a86814 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="input pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-#dc9f42 hover:text-#a86814"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center justify-center gap-2 py-3 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-#dc9f42 mt-5">
            Don't have an account?{" "}
            <Link to="/register" className="text-#a86814 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
