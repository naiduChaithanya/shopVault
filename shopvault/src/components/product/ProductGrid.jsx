import { PackageSearch } from "lucide-react";
import { useMemo } from "react";
import Loader from "../shared/Loader";
import ProductCard from "./ProductCard";

export default function ProductGrid({products, isLoading, searchQuery, sortBy}){
    const filtered = useMemo(() => {
        let list = [...products];

        // filter by search
        if(searchQuery){
            const q = searchQuery.toLowerCase();
            list = list.filter(
                (p) => 
                    p.title.toLowerCase().includes(q) || 
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
            )
        }

        // sort
        switch(sortBy){
            case "price-asc":
                list.sort((a,b) => a.price - b.price);
                break;
            case "price-desc":
                list.sort((a,b) => b.price - a.price);
                break;
            case "rating":
                list.sort((a,b) => b.rating.rate - a.rating.rate);
                break;
            case "name":
                list.sort((a,b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return list
    }, [products, searchQuery, sortBy]);

    if(isLoading) return <Loader text="Fetching products...."/>

    if(!filtered.length){
        return(
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-#dc9f42">
                <PackageSearch size={48} strokeWidth={1.5}/>
                <p className="text-lg font-serif">No products found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-stagger">
            {filtered.map((p) => (
                <ProductCard key={p.id} product={p}/>
            ))}
        </div>
    )
}