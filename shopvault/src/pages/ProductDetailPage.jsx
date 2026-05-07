import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCallback, useEffect } from "react";
import { fetchProductById } from "../features/products/productsThunks";
import { clearSelectedProduct } from "../features/products/productsSlice";
import Loader from "../components/shared/Loader";
import { ArrowLeft, RotateCcw, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import StarRating from "../components/shared/StarRating";

export default function ProductDetailsPage(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {selectedProduct, isLoadingProduct} = useSelector((state) => state.products);
    const {handleAddToCart} = useCart()

    useEffect(() => {
        dispatch(fetchProductById(id));
        return () => dispatch(clearSelectedProduct());
    },[id, dispatch]);

    const onAdd = useCallback(() => {
        if(selectedProduct) handleAddToCart(selectedProduct);
    }, [selectedProduct, handleAddToCart]);

    if(isLoadingProduct) return <Loader text="Loading product...."/>;
    if(!selectedProduct) return null;

    const p = selectedProduct;

    return(
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-#c9841e hover:text-#874f12 transition mb-6">
                <ArrowLeft size={15}/> Back to shop
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
                {/* image */}
                <div className="bg-white rounded-3xl border border-#f9edda flex items-center justify-center p-10 shadow-sm">
                    <img src={p.image} alt={p.title} className="max-h-80 object-contain w-full"/>
                </div>
                {/* Details */}
                <div className="flex flex-col gap-5">
                    <div>
                        <span className="badge bg-#f9edda text-#874f12 capitalize">{p.category}</span>
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-#341c08 mt-2 leading-tight">{p.title}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <StarRating rating={p.rating?.rate} count={p.rating?.count}/>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="font-serif text-4xl font-bold text-#874f12">${p.price.toFixed(2)}</span>
                        <span className="text-#dc9f42 text-sm line-through">${(p.price * 1.2).toFixed(2)}</span>
                        <span className="badge bg-green-50 text-green-700">20% off</span>
                    </div>
                    <p className="text-#a86814 text-sm leading-relaxed">{p.description}</p>
                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {icon: <Truck size={16}/>, label: "Free Shipping", sub: "Over $50"},
                            {icon: <RotateCcw size={16}/>,label: "Easy Returns", sub: "30 days" },
                            {icon: <ShieldCheck size={16}/>,  label: "Secure Pay", sub: "JWT Auth"}
                        ].map((b) => (
                            <div key={b.label} className="bg-#fdf8f0 rounded-xl p-3 text-center border border-#f9edda">
                                <div className="flex justify-center mb-1 text-#a86814">{b.icon}</div>
                                <p className="text-xs font-medium text-#6e4016">{b.label}</p>
                                <p className="text-xs text-#dc9f42">{b.sub}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={onAdd} className="btn-primary flex items-center justify-center gap-2 w-full py-3 text-base"><ShoppingCart size={18}/> Add to cart</button>
                    <Link to="/" className="btn-outline flex items-center justify-center gap-2 w-full">Continue Shopping</Link>
                </div>
            </div>
        </div>
    )
}