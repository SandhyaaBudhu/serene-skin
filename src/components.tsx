import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Leaf,
  Menu,
  Minus,
  Moon,
  Plus,
  Search,
  ShoppingBag,
  Sun,
  X,
} from "lucide-react";
import { products, money } from "./data";
import type { Product } from "./data";
import { itemPrice, useStore } from "./store";

export function Image({
  src,
  alt,
  className = "",
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`image-fallback ${className}`} role="img" aria-label={alt}>
      <Leaf size={44} />
      <span>serene skin</span>
    </div>
  ) : (
    <img
      className={className}
      src={src.startsWith("/") ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src}
      alt={alt}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
export function ProductArt({
  product,
  close = false,
}: {
  product: Product;
  close?: boolean;
}) {
  return (
    <div
      className={`product-art product-${product.cell} ${close ? "close-up" : ""}`}
    >
      <Image
        src="/images/products.webp"
        alt={`${product.name} ${product.category.toLowerCase()} in ${product.cell === 1 ? "sage glass" : product.cell === 3 ? "soft peach" : "ivory"} packaging`}
        loading="lazy"
      />
    </div>
  );
}
export function ArrowLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="arrow-link" to={to}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function Header() {
  const s = useStore();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const count = s.bag.reduce((n, i) => n + i.quantity, 0);
  const nav = [
    ["/shop", "Shop"],
    ["/ritual", "Build your ritual"],
    ["/story", "Our story"],
    ["/journal", "Journal"],
  ];
  return (
    <>
      <div className="announcement">
        A little care, delivered. Complimentary shipping on orders $75+
        <span>Made for your everyday.</span>
      </div>
      <header className="header">
        <Link to="/" className="wordmark" aria-label="Serene Skin home">
          serene skin<span>SKINCARE, SLOWLY.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
              {to === "/ritual" && <span className="tiny-dot" />}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="Search products"
            onClick={() => setSearch(true)}
          >
            <Search size={20} />
          </button>
          <button
            className="icon-button"
            aria-label={`Switch to ${s.theme === "light" ? "dark" : "light"} mode`}
            onClick={s.toggleTheme}
          >
            {s.theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <button
            className="icon-button wishlist-icon"
            aria-label={`Wishlist, ${s.wishlist.length} saved products`}
            onClick={() => s.setDrawer("wishlist")}
          >
            <Heart size={20} />
            {s.wishlist.length > 0 && (
              <span className="small-count">{s.wishlist.length}</span>
            )}
          </button>
          <button
            className="bag-button"
            aria-label={`Open bag, ${count} items`}
            onClick={() => s.setDrawer("bag")}
          >
            <ShoppingBag size={19} />
            <span className="bag-label">Bag</span>
            <span className="bag-count">{count}</span>
          </button>
          <button
            className="icon-button mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {mobile && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setMobile(false)}>
              {label}
              <ArrowRight size={17} />
            </NavLink>
          ))}
        </nav>
      )}
      {search && (
        <Modal title="Find a little care" onClose={() => setSearch(false)}>
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/shop?search=${encodeURIComponent(query)}`);
              setSearch(false);
            }}
          >
            <label htmlFor="header-search">Search our essentials</label>
            <div className="search-input">
              <Search size={19} />
              <input
                id="header-search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try serum, oat, or a soft gel…"
              />
            </div>
            <button className="button">
              Explore products <ArrowRight size={17} />
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Footer() {
  const s = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="wordmark">
            serene skin<span>SKINCARE, SLOWLY.</span>
          </Link>
          <p>
            Simple rituals.
            <br />A little more room for you.
          </p>
          <div className="footer-flower">✳</div>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Explore</span>
          <Link to="/shop">The essentials</Link>
          <Link to="/ritual">Build your ritual</Link>
          <Link to="/story">Our story</Link>
          <Link to="/journal">The slow journal</Link>
          <button onClick={() => s.setDrawer("wishlist")}>Your wishlist</button>
        </div>
        <div className="footer-news">
          <span className="eyebrow">A note, now and then</span>
          <h3>A softer kind of inbox.</h3>
          <p>Rituals, new favourites, and little moments of calm.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
              s.notify(
                "You’re on the list — demo signup saved for this visit.",
              );
            }}
          >
            <label className="sr-only" htmlFor="newsletter">
              Email address
            </label>
            <input
              type="email"
              required
              id="newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              disabled={subscribed}
            />
            <button aria-label="Subscribe to newsletter" disabled={subscribed}>
              {subscribed ? <Check size={20} /> : <ArrowRight size={20} />}
            </button>
          </form>
          <small>
            {subscribed
              ? "A little calm is on its way. This is a demo signup."
              : "By signing up, you agree to receive our occasional notes. Demo only."}
          </small>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Serene Skin. A considered skincare demo.
        </span>
        <span>Thoughtfully imagined. Simply made.</span>
        <span>USD · English</span>
      </div>
    </footer>
  );
}
export function ProductCard({
  product,
  onQuick,
}: {
  product: Product;
  onQuick: (p: Product) => void;
}) {
  const s = useStore();
  const wished = s.wishlist.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/shop/${product.id}`}>
          <ProductArt product={product} />
        </Link>
        <span className="product-tag">{product.tag}</span>
        <button
          className={`wish-button ${wished ? "selected" : ""}`}
          aria-label={`${wished ? "Remove" : "Save"} ${product.name} ${wished ? "from" : "to"} wishlist`}
          onClick={() => s.toggleWish(product.id)}
        >
          <Heart size={18} fill={wished ? "currentColor" : "none"} />
        </button>
        <button className="quick-view" onClick={() => onQuick(product)}>
          Quick view <Plus size={16} />
        </button>
      </div>
      <div className="product-card-meta">
        <div>
          <Link to={`/shop/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
          <p>{product.subtitle}</p>
        </div>
        <span>{money(product.price)}</span>
      </div>
      <div className="product-card-bottom">
        <span>
          {product.size} · {product.texture}
        </span>
        <button
          aria-label={`Add ${product.name} to bag`}
          onClick={() => s.add(product.id)}
        >
          <Plus size={16} />
        </button>
      </div>
    </article>
  );
}
export function Modal({
  title,
  onClose,
  children,
  drawer = false,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  drawer?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const titleId = useId();
  useEffect(() => {
    const prev = document.activeElement as HTMLElement;
    const el = ref.current!;
    const nodes = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'button:not(:disabled),input:not(:disabled),select,a[href],[tabindex="0"]',
        ),
      );
    nodes()[0]?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const items = nodes();
        if (!el.contains(document.activeElement)) {
          e.preventDefault();
          (e.shiftKey ? items.at(-1) : items[0])?.focus();
        } else if (e.shiftKey && document.activeElement === items[0]) {
          e.preventDefault();
          items.at(-1)?.focus();
        } else if (!e.shiftKey && document.activeElement === items.at(-1)) {
          e.preventDefault();
          items[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = old;
      prev?.focus();
    };
  }, []);
  return (
    <div
      className={`modal-backdrop ${drawer ? "drawer-backdrop" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`modal ${drawer ? "drawer" : ""}`}
      >
        <div className="modal-heading">
          <h2 id={titleId}>{title}</h2>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
export function Quantity({
  value,
  onChange,
}: {
  value: number;
  onChange: (q: number) => void;
}) {
  return (
    <div className="quantity">
      <button
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        aria-label="Decrease quantity"
      >
        <Minus size={15} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        disabled={value >= 20}
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
export function PurchaseControls({ product }: { product: Product }) {
  const s = useStore();
  const [size, setSize] = useState(product.size);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="purchase-controls">
      <div className="option-label">
        Choose your size{" "}
        <span>
          {size === product.mini
            ? "A little introduction"
            : "Your everyday essential"}
        </span>
      </div>
      <div className="size-options">
        {[product.size, product.mini].map((x) => (
          <button
            key={x}
            className={size === x ? "selected" : ""}
            onClick={() => setSize(x)}
            aria-pressed={size === x}
          >
            {x}
            <span>{money(itemPrice(product.id, x))}</span>
          </button>
        ))}
      </div>
      <div className="add-row">
        <Quantity value={quantity} onChange={setQuantity} />
        <button
          className="button"
          onClick={() => s.add(product.id, size, quantity)}
        >
          Add to bag — {money(itemPrice(product.id, size) * quantity)}
          <ShoppingBag size={17} />
        </button>
        <button
          className={`icon-button purchase-wish ${s.wishlist.includes(product.id) ? "selected" : ""}`}
          aria-label="Toggle wishlist"
          aria-pressed={s.wishlist.includes(product.id)}
          onClick={() => s.toggleWish(product.id)}
        >
          <Heart
            size={20}
            fill={s.wishlist.includes(product.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
}
export function QuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <Modal title="A closer look" onClose={onClose}>
      <div className="quick-layout">
        <ProductArt product={product} />
        <div>
          <span className="eyebrow">{product.category}</span>
          <h2>{product.name}</h2>
          <p className="muted">{product.description}</p>
          <PurchaseControls key={product.id} product={product} />
          <Link
            className="arrow-link"
            to={`/shop/${product.id}`}
            onClick={onClose}
          >
            All the little details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
export function BagDrawer() {
  const s = useStore();
  const [checkout, setCheckout] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const total = s.bag.reduce(
    (n, i) => n + itemPrice(i.id, i.size) * i.quantity,
    0,
  );
  useEffect(() => {
    setCheckout(false);
    setConfirmed(false);
  }, [s.drawer]);
  if (!s.drawer) return null;
  const wish = s.drawer === "wishlist";
  return (
    <Modal
      drawer
      title={
        confirmed
          ? "A little care is coming."
          : checkout
            ? "Complete your ritual"
            : wish
              ? "Your saved favourites"
              : `Your bag (${s.bag.reduce((n, i) => n + i.quantity, 0)})`
      }
      onClose={() => s.setDrawer(null)}
    >
      {confirmed ? (
        <div className="confirmation">
          <div className="confirmation-icon">
            <Check size={32} />
          </div>
          <span className="eyebrow">Demo order confirmed</span>
          <h2>Thank you, {name.split(" ")[0]}.</h2>
          <p>
            Your ritual is ready. This is a demonstration checkout — no payment
            was taken and no order will be shipped.
          </p>
          <span className="order-reference">SERENE · DEMO-1048</span>
          <button className="button" onClick={() => s.setDrawer(null)}>
            Keep exploring <ArrowRight size={17} />
          </button>
        </div>
      ) : checkout ? (
        <form
          className="checkout-form"
          onSubmit={(e) => {
            e.preventDefault();
            s.clear();
            setConfirmed(true);
          }}
        >
          <p className="muted">
            One more small step. Try our checkout experience with demonstration
            details.
          </p>
          <label>
            Your name
            <input
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Taylor"
              minLength={2}
            />
          </label>
          <label>
            Email address
            <input
              required
              type="email"
              autoComplete="email"
              placeholder="alex@example.com"
            />
          </label>
          <label>
            Delivery address
            <input
              required
              autoComplete="street-address"
              placeholder="12 Garden Lane"
            />
          </label>
          <div className="checkout-two">
            <label>
              City
              <input
                required
                autoComplete="address-level2"
                placeholder="Cape Town"
              />
            </label>
            <label>
              Postal code
              <input required autoComplete="postal-code" placeholder="8001" />
            </label>
          </div>
          <div className="bag-totals">
            <span>Total, including shipping</span>
            <strong>{money(total + (total >= 75 ? 0 : 6))}</strong>
          </div>
          <p className="demo-note">
            Frontend demo. No payment details are needed, and your form
            information is not sent anywhere.
          </p>
          <button className="button">
            Confirm demonstration order <ArrowRight size={17} />
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => setCheckout(false)}
          >
            Back to bag
          </button>
        </form>
      ) : (
        <>
          <div className="drawer-content">
            {(wish ? s.wishlist.length : s.bag.length) === 0 ? (
              <div className="empty-state">
                {wish ? <Heart size={35} /> : <ShoppingBag size={35} />}
                <h3>
                  {wish
                    ? "Keep a little inspiration."
                    : "Your ritual starts here."}
                </h3>
                <p>
                  {wish
                    ? "Tap the heart on an essential to save it for later."
                    : "Your bag is waiting for something lovely."}
                </p>
                <Link
                  to="/shop"
                  className="button"
                  onClick={() => s.setDrawer(null)}
                >
                  Explore the essentials <ArrowRight size={17} />
                </Link>
              </div>
            ) : wish ? (
              s.wishlist.map((id) => {
                const p = products.find((x) => x.id === id);
                return (
                  p && (
                    <div className="bag-item" key={id}>
                      <Link
                        to={`/shop/${id}`}
                        onClick={() => s.setDrawer(null)}
                      >
                        <ProductArt product={p} />
                      </Link>
                      <div>
                        <h3>{p.name}</h3>
                        <p>{p.subtitle}</p>
                        <span>{money(p.price)}</span>
                        <button
                          className="text-button"
                          onClick={() => s.add(id)}
                        >
                          Add to bag <Plus size={14} />
                        </button>
                      </div>
                      <button
                        className="icon-button"
                        aria-label={`Remove ${p.name} from wishlist`}
                        onClick={() => s.toggleWish(id)}
                      >
                        <X size={17} />
                      </button>
                    </div>
                  )
                );
              })
            ) : (
              s.bag.map((item) => {
                const p = products.find((x) => x.id === item.id)!;
                return (
                  <div className="bag-item" key={`${item.id}-${item.size}`}>
                    <Link
                      to={`/shop/${p.id}`}
                      onClick={() => s.setDrawer(null)}
                    >
                      <ProductArt product={p} />
                    </Link>
                    <div>
                      <h3>{p.name}</h3>
                      <p>
                        {item.size} · {money(itemPrice(item.id, item.size))}
                      </p>
                      <Quantity
                        value={item.quantity}
                        onChange={(q) => s.update(item.id, item.size, q)}
                      />
                    </div>
                    <div className="bag-item-end">
                      <button
                        className="icon-button"
                        aria-label={`Remove ${p.name} from bag`}
                        onClick={() => s.update(item.id, item.size, 0)}
                      >
                        <X size={16} />
                      </button>
                      <span>
                        {money(itemPrice(item.id, item.size) * item.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {!wish && s.bag.length > 0 && (
            <div className="bag-summary">
              <div className="shipping-progress">
                <Leaf size={16} />
                <span>
                  {total >= 75
                    ? "A little extra: shipping is on us."
                    : `${money(75 - total)} away from complimentary shipping`}
                </span>
              </div>
              <div className="progress-track">
                <i style={{ width: `${Math.min(100, (total / 75) * 100)}%` }} />
              </div>
              <div className="bag-totals">
                <span>Subtotal</span>
                <strong>{money(total)}</strong>
              </div>
              <div className="bag-totals">
                <span>Shipping</span>
                <span>{total >= 75 ? "Complimentary" : money(6)}</span>
              </div>
              <button className="button" onClick={() => setCheckout(true)}>
                Continue to checkout <ArrowRight size={18} />
              </button>
              <small>A demonstration checkout. A real moment of calm.</small>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
export function Accordion({
  title,
  children,
  open = false,
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details className="accordion" open={open}>
      <summary>
        {title}
        <ChevronDown size={18} />
      </summary>
      <div>{children}</div>
    </details>
  );
}
