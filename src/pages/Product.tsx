import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Droplets, Leaf, Sun } from "lucide-react";
import { products, money } from "../data";
import type { Product as ProductType } from "../data";
import {
  Accordion,
  Image,
  ProductArt,
  ProductCard,
  PurchaseControls,
  QuickView,
} from "../components";
export default function Product() {
  const { id } = useParams();
  const product = products.find((x) => x.id === id);
  const [view, setView] = useState("product");
  const [quick, setQuick] = useState<ProductType | null>(null);
  if (!product)
    return (
      <div className="empty-state section">
        <h1>A little lost?</h1>
        <p>That essential is not in our collection.</p>
        <Link to="/shop" className="button">
          Back to the essentials
        </Link>
      </div>
    );
  return (
    <>
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <ChevronRight size={13} />
        <Link to="/shop">Essentials</Link>
        <ChevronRight size={13} />
        <span>{product.name}</span>
      </div>
      <section className="product-detail section">
        <div className="product-gallery">
          <div className="gallery-main">
            {view === "collection" ? (
              <Image
                src="/images/hero-refined.webp"
                alt="The complete Serene Skin collection in an editorial still life"
              />
            ) : (
              <ProductArt product={product} close={view === "detail"} />
            )}
            <span className="gallery-note">
              {view === "detail"
                ? "THE LITTLE DETAILS"
                : view === "collection"
                  ? "BETTER TOGETHER"
                  : "A LITTLE CARE, BEAUTIFULLY PACKAGED"}
            </span>
          </div>
          <div className="gallery-thumbnails">
            {["product", "detail", "collection"].map((x) => (
              <button
                key={x}
                className={view === x ? "selected" : ""}
                aria-label={`View ${x} image`}
                aria-pressed={view === x}
                onClick={() => setView(x)}
              >
                {x === "collection" ? (
                  <Image src="/images/hero-refined.webp" alt="Collection thumbnail" />
                ) : (
                  <ProductArt product={product} close={x === "detail"} />
                )}
              </button>
            ))}
            <span>
              Made to be part
              <br />
              of your everyday.
            </span>
          </div>
        </div>
        <div className="product-info">
          <span className="eyebrow">
            {product.tag} · {product.category}
          </span>
          <h1>{product.name}</h1>
          <p className="product-subtitle">
            {product.subtitle}
            <span>{money(product.price)}</span>
          </p>
          <p className="product-description">{product.description}</p>
          <div className="texture-tag">
            <Droplets size={16} />
            {product.texture}
            <span>·</span>A considered everyday formula
          </div>
          <PurchaseControls key={product.id} product={product} />
          <p className="shipping-note">
            <Leaf size={15} /> Complimentary shipping on orders $75+
          </p>
          <div className="product-accordions">
            <Accordion title="The ingredients, simply explained" open>
              {product.ingredients.map((i) => (
                <div className="ingredient-explanation" key={i.name}>
                  <strong>{i.name}</strong>
                  <p>{i.text}</p>
                </div>
              ))}
              <small>
                Demonstration formula notes. Ingredient highlights are
                illustrative; a complete INCI list is not provided.
              </small>
            </Accordion>
            <Accordion title="A place in your ritual">
              <p>{product.usage}</p>
              <p className="small-text">
                Patch test before first use. Avoid the eye area. Stop use if
                irritation occurs.
              </p>
            </Accordion>
            <Accordion title="Packaging & the little details">
              <p>
                A tactile{" "}
                {product.cell === 1 ? "glass bottle" : "jar or bottle"} in our
                signature muted palette. Designed with a simple label, a
                comfortable shape, and a place on your bathroom shelf.
              </p>
              <p className="small-text">
                Packaging is concept imagery for this fictional collection.
                Check local guidance for disposal.
              </p>
            </Accordion>
            <Accordion title="Delivery & demonstration checkout">
              <p>
                Demo shipping is $6, or complimentary on orders of $75 or more.
                The checkout lets you try the full experience without a payment
                or real order.
              </p>
            </Accordion>
          </div>
        </div>
      </section>
      <section className="product-ritual-note">
        <Sun size={25} />
        <p>
          A small reminder: for a daytime routine, finish with your own
          sunscreen.
        </p>
      </section>
      <section className="section related">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Good company for your shelf</span>
            <h2>
              Make it a <em>ritual.</em>
            </h2>
          </div>
          <Link to="/ritual" className="arrow-link">
            Find your routine <ChevronRight size={17} />
          </Link>
        </div>
        <div className="product-grid related-grid">
          {products
            .filter((p) => p.id !== id)
            .map((p) => (
              <ProductCard key={p.id} product={p} onQuick={setQuick} />
            ))}
        </div>
      </section>
      {quick && <QuickView product={quick} onClose={() => setQuick(null)} />}
    </>
  );
}
