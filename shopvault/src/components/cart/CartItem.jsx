import { useCart } from "../../hooks/useCart";
import { Minus, Plus, Trash2} from "lucide-react"

export default function CartItem({item}){
    const {handleIncrease, handleDecrease, handleRemove} = useCart();

    return(
        <div className="card flex gap-4 p-4 items-center">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain bg-white rounded-xl border border-vault-100 p-2 shrink-0"/>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-vault-900 line-clamp-2">{item.title}</p>
                <p className="text-vault-500 text-xs mt-0.5 capitalize">{item.category}</p>
                <p className="font-display font-bold text-vault-700 mt-1">{item.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0">
                <button onClick={() => handleRemove(item.id)} className="text-vault-300 hover:text-red-500 transistion"><Trash2 size={15}/></button>
                <div className="flex items-center gap-2">
                    <button onClick={() => handleDecrease(item.id)} className="w-7 h-7 rounded-full border border-vault-200 flex items-center justify-center hover:bg-#f9edda transistion"><Minus size={12}/></button>
                    <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id)} className="w-7 h-7 rounded-full border border-vault-200 flex items-center justify-center hover:bg-#f9edda transistion"><Plus size={12}/></button>
                </div>
                <p className="text-sm font-bold text-#6e4016">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    )
}