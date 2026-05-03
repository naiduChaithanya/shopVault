import { Star } from "lucide-react";

export default function StarRating({rating, count}){
    const stars = Array.from({length: 5},(_, i) => i + 1);

    return(
        <div className="flex items-center gap-1">
            <div className="flex">
                {stars.map((s) => (
                    <Star key={s} size={13} className={s <= Math.round(rating) ? "text-#dc9f42 fill-#dc9f42" : "text-#f2d9b0 fill-#f9edda"}/>
                ))}
            </div>
            <span className="text-xs text-#c9841e ml-1">{rating?.toFixed(1)}{count !== undefined && ` (${count})`}</span>
        </div>
    )
}