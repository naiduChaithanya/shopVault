import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../../features/products/productsSlice";
import { fetchProducts, fetchProductsByCategory } from "../../features/products/productsThunks";
import { LayoutGrid } from "lucide-react";

export default function CategoryFilter({categories}) {
    const dispatch = useDispatch();
    const activeCategory = useSelector((state) => state.products.activeCategory);

    const handleSelect = (cat) => {
        dispatch(setActiveCategory(cat));
        if(cat === "all"){
            dispatch(fetchProducts())
        }else{
            dispatch(fetchProductsByCategory(cat))
        }
    }

    const allCats = ["all", ...categories];

    return (
        <div>
            {allCats.map((cat) => (
                <button key={cat} onClick={() => handleSelect(cat)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transistion-all duration-150 capitalize ${activeCategory === cat ? "bg-#874f12 text-white border-#874f12" : "bg-white text-#874f12 border-#f2d9b0 hover:border-#dc9f42"}`}>{cat === "all" && <LayoutGrid size={13}/>}{cat}</button>
            ))}
        </div>
    )
}