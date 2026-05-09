import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../features/products/productsThunks.js";
import { setSearchQuery, setSortBy } from "../features/products/productsSlice.js";
import { useDebounce } from "../hooks/useDebounce.js";
import ProductGrid from "../components/product/ProductGrid.jsx";
import CategoryFilter from "../components/product/CategoryFilter.jsx";
import { Search, SlidersHorizontal } from "lucide-react";

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A–Z" },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const { items, categories, isLoading, searchQuery, sortBy, activeCategory } = useSelector(
    (state) => state.products
  );

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 400);

  // Fetch on mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Sync debounced search to Redux
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const handleSortChange = useCallback(
    (e) => dispatch(setSortBy(e.target.value)),
    [dispatch]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero banner */}
      <div className="bg-#341c08 text-#fdf8f0 rounded-3xl px-8 py-10 mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-#dc9f42 text-sm font-medium tracking-widest uppercase mb-2">New Collection</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-3">
            Discover Premium<br />Products
          </h1>
          <p className="text-#e8be7a text-sm max-w-sm">
            Curated selections across electronics, fashion, and jewelry — all in one vault.
          </p>
        </div>
        {/* Decorative */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10"
          style={{ background: "radial-gradient(circle at 80% 50%, #c9841e 0%, transparent 70%)" }} />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-#dc9f42" />
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-#dc9f42" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="input pl-9 pr-4 appearance-none cursor-pointer sm:w-52"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Category filters */}
        <CategoryFilter categories={categories} />
      </div>

      {/* Result count */}
      {!isLoading && (
        <p className="text-sm text-#dc9f42 mb-4">
          Showing <span className="font-medium text-#874f12">{items.length}</span> products
          {activeCategory !== "all" && (
            <> in <span className="capitalize font-medium text-#874f12">{activeCategory}</span></>
          )}
        </p>
      )}

      <ProductGrid
        products={items}
        isLoading={isLoading}
        searchQuery={searchQuery}
        sortBy={sortBy}
      />
    </div>
  );
}
