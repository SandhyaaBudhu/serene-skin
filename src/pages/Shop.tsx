import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "../data";
import type { Product } from "../data";
import { ArrowLink, ProductCard, QuickView } from "../components";
export default function Shop() {
  const [params, setParams] = useSearchParams();
  const query = params.get("search") || "";
  const category = params.get("category") || "All essentials";
  const sort = params.get("sort") || "considered";
  const [quick, setQuick] = useState<Product | null>(null);
  const setFilter = (key: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (category === "All essentials" || p.category === category) &&
        [
          p.name,
          p.category,
          p.subtitle,
          p.texture,
          ...p.ingredients.map((i) => i.name),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
    return sort === "low"
      ? list.sort((a, b) => a.price - b.price)
      : sort === "high"
        ? list.sort((a, b) => b.price - a.price)
        : sort === "name"
          ? list.sort((a, b) => a.name.localeCompare(b.name))
          : list;
  }, [query, category, sort]);
  return (
    <>
      <section className="page-intro shop-intro">
        <span className="eyebrow">Thoughtfully made. Beautifully simple.</span>
        <h1>
          A few good <em>essentials.</em>
        </h1>
        <p>
          A small, considered collection. Each with its own place in your
          everyday.
        </p>
        <span className="intro-flower" aria-hidden="true">
          ✳
        </span>
      </section>
      <section className="section shop-section">
        <div className="shop-toolbar">
          <div className="filter-tabs" aria-label="Product category">
            {["All essentials", "Cleanser", "Serum", "Moisturiser", "Mask"].map(
              (c) => (
                <button
                  className={c === category ? "active" : ""}
                  aria-pressed={c === category}
                  onClick={() => setFilter("category", c)}
                  key={c}
                >
                  {c}
                </button>
              ),
            )}
          </div>
          <div className="shop-controls">
            <div className="search-input">
              <Search size={17} />
              <input
                aria-label="Search products"
                placeholder="Find your essential"
                value={query}
                onChange={(e) => setFilter("search", e.target.value)}
              />
              {query && (
                <button
                  className="icon-button"
                  aria-label="Clear search"
                  onClick={() => setFilter("search", "")}
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <label className="sort-label">
              <SlidersHorizontal size={16} />
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setFilter("sort", e.target.value)}
              >
                <option value="considered">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>
        </div>
        <div className="results-label">
          <span>
            {filtered.length}{" "}
            {filtered.length === 1 ? "essential" : "essentials"}
            {query && ` for “${query}”`}
          </span>
          <span>Good things. No extra steps.</span>
        </div>
        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onQuick={setQuick} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h3>A little too specific?</h3>
            <p>Try another ingredient, texture, or product name.</p>
            <button className="button" onClick={() => setParams({})}>
              See all essentials <ArrowRight size={17} />
            </button>
          </div>
        )}
        <div className="shop-ritual-banner">
          <div>
            <span className="eyebrow">A little guidance goes a long way</span>
            <h3>Find the routine that feels like you.</h3>
          </div>
          <ArrowLink to="/ritual">Build your ritual</ArrowLink>
        </div>
      </section>
      {quick && <QuickView product={quick} onClose={() => setQuick(null)} />}
    </>
  );
}
