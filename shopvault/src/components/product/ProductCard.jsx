import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import StarRating from "../shared/StarRating";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({product}) {
    const {handleAddToCart} = useCart();

    const onAdd = useCallback((e) => {
        e.preventDefault();
        handleAddToCart(product);
    },[product, handleAddToCart])

    const categoryColors = {
        "men's clothing": "bg-blue-50 text-blue-700",
        "women's clothing": "bg-pink-50 text-pink-700",
        "jewelery": "bg-vault-100 text-vault-700",
        "electronics": "bg-slate-100 text-slate-700",
    };

    const badgeClass = categoryColors[product.category] || "bg-#f9edda text-#874f12";

    return (
        <Link to={`/product/${product.id}`} className="card group flex flex-col hover:shadow-md transition-shadow duration-200">
            {/* image */}
            <div className="bg-white h-52 flex items-center justify-center p-6 relative overflow-hidden">
                <img src={product.image} alt={product.title} className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy"/>
            </div>
            {/* info */}
            <div className="flex flex-col flex-1 p-4 gap-2">
                <span className={`badge w-fit ${badgeClass}`}>{product.category}</span>
                <h3 className="text-sm font-medium text-#5c3617 line-clamp-2 leading-snug flex-1">{product.title}</h3>
                <StarRating rating={product.rating?.rate} count={product.rating?.count}/>
                <div className="flex items-center justify-between mt-2">
                    <span className="font-serif text-xl font-bold text-#6e4016">
                        ${product.price.toFixed(2)}
                    </span>
                    <button onClick={onAdd} className="flex items-center gap-1.5 bg-#a86814 hover:bg-#874f12 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"> <ShoppingCart size={13}/> Add</button>
                </div>                    
            </div>
        </Link>
    )
}