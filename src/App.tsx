import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { BagDrawer, Footer, Header } from "./components";
import { useStore } from "./store";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Ritual from "./pages/Ritual";
import { Article, Journal, Story } from "./pages/Editorial";
export default function App() {
  const { toast } = useStore();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const title =
      pathname === "/ritual"
        ? "Build your ritual"
        : pathname === "/story"
          ? "Our story"
          : pathname.startsWith("/journal")
            ? "The slow journal"
            : pathname.startsWith("/shop")
              ? "The essentials"
              : "A little care. A little calm.";
    document.title = `${title} — Serene Skin`;
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product key={pathname} />} />
          <Route path="/ritual" element={<Ritual />} />
          <Route path="/story" element={<Story />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<Article />} />
          <Route
            path="*"
            element={
              <div className="section empty-state">
                <h1>A little off the path.</h1>
                <p>Let’s find your way back to something lovely.</p>
                <Link className="button" to="/">
                  Back home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
      <BagDrawer />
      <div
        className={`toast ${toast ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Check size={18} />
            {toast}
          </>
        )}
      </div>
    </>
  );
}
