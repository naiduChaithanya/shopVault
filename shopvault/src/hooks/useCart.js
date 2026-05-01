import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, decreaseQty, IncreaseQty, removeFromCart, selectCartCount, selectCartItems, selectCartTotal } from "../features/cart/cartSlice";
import toast from "react-hot-toast"

export function useCart(){
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const count = useSelector(selectCartCount);
    const total = useSelector(selectCartTotal);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`${product.title.slice(0,25)}... added to cart`);
    }

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
        toast("Item Removed", {icon: "🗑️" })
    }

    const handleIncrease = (id) => dispatch(IncreaseQty(id));
    const handleDecrease = (id) => dispatch(decreaseQty(id));
    const handleClearCart = () => dispatch(clearCart())

    return {items, count, total, handleAddToCart, handleRemove, handleIncrease, handleDecrease, handleClearCart };
}
