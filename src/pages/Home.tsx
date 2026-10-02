import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Droplets,
  Flower2,
  Leaf,
  Sparkles,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";
import { articles, products } from "../data";
import type { Product } from "../data";
import { ArrowLink, Image, ProductCard, QuickView } from "../components";
export default function Home() {
  const [quick, setQuick] = useState<Product | null>(null);
  return (
    <>
      <section className="hero">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">
            <span className="tiny-line" /> Less noise. More nourishment.
          </span>
          <h1>
            A little care.
            <br />A little <em>calm.</em>
          </h1>
          <p>
            Thoughtful skincare. Simple rituals.
            <br />
            For your skin, and a moment that’s just yours.
          </p>
          <div className="hero-buttons">
            <Link className="button" to="/shop">
              Explore the essentials <ArrowRight size={17} />
            </Link>
            <Link className="text-button" to="/ritual">
              Find your ritual <ArrowRight size={16} />
            </Link>
          </div>
          <div className="hero-foot">
            <span className="hero-flower">✳</span>
            <span>
              Good things come
              <br />
              in simple routines.
            </span>
            <a
              href="#essentials"
              className="scroll-hint"
              aria-label="Scroll to essentials"
            >
              <ArrowDown size={18} />
            </a>
          </div>
        </motion.div>
        <div className="hero-image">
          <Image
            src="/images/hero-refined.webp"
            alt="Serene Skin essentials arranged on sculptural ivory stone plinths against a sunlit sage backdrop"
            loading="eager"
          />
          <div className="hero-image-note">
            <span>YOUR DAILY EXHALE</span>
            <span>
              Simple by nature.
              <br />
              Serene by choice.
            </span>
          </div>
          <div className="image-caption">THE EVERYDAY COLLECTION — 01</div>
        </div>
      </section>
      <div className="values-strip">
        <span>
          <Leaf size={19} /> Thoughtfully chosen ingredients
        </span>
        <span>
          <Droplets size={19} /> Textures your skin will love
        </span>
        <span>
          <Flower2 size={19} /> Fewer steps. More intention.
        </span>
        <span>
          <Sun size={19} /> Made for everyday moments
        </span>
      </div>
      <section className="section essentials" id="essentials">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              Small collection. Everyday companions.
            </span>
            <h2>
              Meet your <em>essentials.</em>
            </h2>
          </div>
          <ArrowLink to="/shop">Shop the collection</ArrowLink>
        </div>
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onQuick={setQuick} />
          ))}
        </div>
      </section>
      <section className="ritual-home section">
        <div className="ritual-intro">
          <span className="eyebrow">Your skin. Your pace.</span>
          <h2>
            A good day starts
            <br />
            with a small <em>ritual.</em>
          </h2>
          <p>
            No complicated routines. Just a few considered steps that fit
            naturally into your day.
          </p>
          <Link className="button" to="/ritual">
            Build your ritual <ArrowRight size={17} />
          </Link>
          <span className="ritual-time">A minute to find your everyday.</span>
        </div>
        <div className="ritual-steps">
          {[
            {
              icon: <Droplets />,
              n: "01",
              title: "A fresh beginning",
              text: "A gentle cleanse. A clean slate.",
              name: "Soft Start",
              id: "soft-start",
            },
            {
              icon: <Sparkles />,
              n: "02",
              title: "A little hydration",
              text: "A few drops. A dewy moment.",
              name: "Daily Dew",
              id: "daily-dew",
            },
            {
              icon: <Flower2 />,
              n: "03",
              title: "A layer of comfort",
              text: "Softness that stays with you.",
              name: "Cloud Comfort",
              id: "cloud-comfort",
            },
          ].map((x) => (
            <Link to={`/shop/${x.id}`} className="ritual-step" key={x.n}>
              <span className="step-number">{x.n}</span>
              <div className="step-icon">{x.icon}</div>
              <div>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
                <span>
                  {x.name} <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <span className="ritual-decoration" aria-hidden="true">
          ✳
        </span>
      </section>
      <section className="section ingredients-section">
        <div className="ingredient-photo">
          <Image
            src="/images/botanical.webp"
            alt="Soft sunlight filtering through fresh green leaves"
            loading="lazy"
          />
          <span className="photo-note">A little closer to nature.</span>
        </div>
        <div className="ingredient-copy">
          <span className="eyebrow">Nothing extra. Everything considered.</span>
          <h2>
            Good ingredients.
            <br />
            <em>Simply understood.</em>
          </h2>
          <p>
            We choose each ingredient for the part it plays. Familiar names,
            beautiful textures, and a little less guesswork.
          </p>
          <div className="ingredient-list">
            <div>
              <span>01</span>
              <div>
                <h3>Oat extract</h3>
                <p>A comforting touch for a gentle start.</p>
              </div>
              <Leaf size={23} />
            </div>
            <div>
              <span>02</span>
              <div>
                <h3>Hyaluronic acid</h3>
                <p>A little help holding onto hydration.</p>
              </div>
              <Droplets size={23} />
            </div>
            <div>
              <span>03</span>
              <div>
                <h3>Squalane</h3>
                <p>For that soft, comfortable feeling.</p>
              </div>
              <Sparkles size={23} />
            </div>
          </div>
          <ArrowLink to="/story">Our considered approach</ArrowLink>
        </div>
      </section>
      <section className="story-band">
        <span className="eyebrow">A gentler perspective</span>
        <h2>
          Skincare doesn’t need to be more.
          <br />
          It just needs to feel <em>right.</em>
        </h2>
        <p>
          We’re here for fewer products, thoughtful choices, and the quiet joy
          of taking care.
        </p>
        <ArrowLink to="/story">A little about us</ArrowLink>
        <Flower2 className="story-band-flower" size={120} strokeWidth={0.6} />
      </section>
      <section className="section journal-home">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A moment to pause</span>
            <h2>
              The slow <em>journal.</em>
            </h2>
          </div>
          <ArrowLink to="/journal">All our stories</ArrowLink>
        </div>
        <div className="journal-grid">
          {articles.map((a) => (
            <Link
              className="journal-card"
              to={`/journal/${a.slug}`}
              key={a.slug}
            >
              <div className="journal-image">
                <Image src={a.image} alt={a.title} loading="lazy" />
                <span className="article-arrow">
                  <ArrowRight size={19} />
                </span>
              </div>
              <div className="journal-meta">
                <span>{a.category}</span>
                <span>{a.read}</span>
              </div>
              <h3>{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      {quick && <QuickView product={quick} onClose={() => setQuick(null)} />}
    </>
  );
}
