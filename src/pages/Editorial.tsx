import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Flower2,
  Leaf,
  Package,
  Sparkles,
} from "lucide-react";
import { articles } from "../data";
import { ArrowLink, Image } from "../components";
export function Story() {
  return (
    <>
      <section className="story-hero">
        <div>
          <span className="eyebrow">A little about Serene Skin</span>
          <h1>
            Good care.
            <br />A quieter
            <br />
            <em>perspective.</em>
          </h1>
          <p>
            We believe the things you use every day deserve a little thought.
            And that taking care of yourself should feel like a pleasure.
          </p>
        </div>
        <div className="story-hero-image">
          <Image
            src="/images/hero-refined.webp"
            alt="Thoughtfully imagined Serene Skin packaging in a natural, sunlit setting"
          />
          <span className="photo-note">
            Considered from the very beginning.
          </span>
        </div>
      </section>
      <section className="section story-manifesto">
        <span className="eyebrow">Our approach</span>
        <div>
          <h2>
            Less, with a little
            <br />
            more <em>intention.</em>
          </h2>
          <div>
            <p>
              Serene Skin began with a simple idea: make a little space in the
              everyday. A smaller shelf. A familiar texture. A quiet moment
              before the day starts, or as it comes to a close.
            </p>
            <p>
              Our fictional collection brings together four essentials, each
              with a clear role. We focus on comfortable textures,
              understandable ingredient notes, and routines you can make your
              own.
            </p>
            <p>
              No complicated promises. Just considered skincare and the simple
              pleasure of a ritual that feels right.
            </p>
          </div>
        </div>
      </section>
      <section className="story-principles section">
        {[
          {
            icon: <Leaf />,
            n: "01",
            title: "Every ingredient has a place",
            text: "We choose with purpose and explain with clarity. Ingredient notes help you understand the feel and role of each product.",
          },
          {
            icon: <Sparkles />,
            n: "02",
            title: "A routine, not a rulebook",
            text: "Two steps or four. Morning or evening. A routine should leave room for the way you actually live.",
          },
          {
            icon: <Package />,
            n: "03",
            title: "The details matter",
            text: "Soft colours, tactile materials, and comfortable shapes. Everyday objects can be a small source of joy.",
          },
        ].map((p) => (
          <div key={p.n}>
            <span className="principle-number">{p.n}</span>
            {p.icon}
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </section>
      <section className="section packaging-section">
        <div className="packaging-image">
          <Image
            src="/images/products.webp"
            alt="The four Serene Skin packaging concepts, with ivory, sage and peach finishes"
          />
        </div>
        <div>
          <span className="eyebrow">Beauty in the little things</span>
          <h2>
            A place on your shelf.
            <br />A moment in <em>your day.</em>
          </h2>
          <p>
            Warm ivory. Muted sage. A hint of peach. Our packaging takes its
            cues from the quiet colours of nature, with simple labels and softly
            rounded shapes.
          </p>
          <p>
            These are concept products for a frontend demonstration. Packaging
            materials and ingredient descriptions are imagined, with no
            certification or performance claims.
          </p>
          <ArrowLink to="/shop">Meet the collection</ArrowLink>
        </div>
      </section>
      <section className="story-band">
        <Flower2 size={35} strokeWidth={1} />
        <h2>
          A little care goes
          <br />a <em>lovely</em> way.
        </h2>
        <ArrowLink to="/ritual">Make a moment for you</ArrowLink>
      </section>
    </>
  );
}
export function Journal() {
  const [category, setCategory] = useState("All stories");
  const filtered =
    category === "All stories"
      ? articles
      : articles.filter((a) => a.category === category);
  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">Notes for a quieter everyday</span>
        <h1>
          The slow <em>journal.</em>
        </h1>
        <p>
          A few thoughts on good care, simple rituals,
          <br />
          and finding a little calm in the ordinary.
        </p>
      </section>
      <section className="section journal-section">
        <div className="filter-tabs journal-tabs" aria-label="Journal category">
          {["All stories", "Rituals", "Everyday calm", "Skin notes"].map(
            (c) => (
              <button
                key={c}
                aria-pressed={category === c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <div className="journal-editorial-grid">
          {filtered.map((a, i) => (
            <Link
              className={`journal-card ${i === 0 && category === "All stories" ? "featured-article" : ""}`}
              to={`/journal/${a.slug}`}
              key={a.slug}
            >
              <div className="journal-image">
                <Image src={a.image} alt={a.title} loading="lazy" />
                <span className="article-arrow">
                  <ArrowRight size={20} />
                </span>
              </div>
              <div className="journal-card-copy">
                <div className="journal-meta">
                  <span>{a.category}</span>
                  <span>{a.read}</span>
                </div>
                <h2>{a.title}</h2>
                <p>{a.intro}</p>
                <span className="arrow-link">
                  Take a moment to read <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="story-band">
        <span className="eyebrow">From reading to ritual</span>
        <h2>
          A small moment.
          <br />A soft <em>beginning.</em>
        </h2>
        <ArrowLink to="/ritual">Find your everyday ritual</ArrowLink>
      </section>
    </>
  );
}
export function Article() {
  const { slug } = useParams();
  const a = articles.find((x) => x.slug === slug);
  if (!a)
    return (
      <div className="empty-state section">
        <h1>This page has wandered.</h1>
        <Link className="button" to="/journal">
          Back to the journal
        </Link>
      </div>
    );
  return (
    <>
      <section className="article-title section">
        <Link className="text-button" to="/journal">
          <ArrowLeft size={15} /> Back to the slow journal
        </Link>
        <div className="journal-meta">
          <span>{a.category}</span>
          <span>{a.read}</span>
        </div>
        <h1>{a.title}</h1>
        <p>{a.intro}</p>
        <span className="article-byline">
          Words from Serene Skin · The everyday collection
        </span>
      </section>
      <div className="article-cover">
        <Image src={a.image} alt={a.title} loading="eager" />
      </div>
      <article className="article-body">
        <p className="article-lead">{a.paragraphs[0]}</p>
        {a.paragraphs.slice(1).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <Flower2 size={30} strokeWidth={1} />
        <div className="article-cta">
          <span className="eyebrow">A thought to take with you</span>
          <h3>Make room for what feels good.</h3>
          <ArrowLink to="/ritual">Find your ritual</ArrowLink>
        </div>
      </article>
      <section className="section article-related">
        <div className="section-heading">
          <h2>
            A little more <em>reading.</em>
          </h2>
          <ArrowLink to="/journal">All stories</ArrowLink>
        </div>
        <div className="journal-grid">
          {articles
            .filter((x) => x.slug !== slug)
            .map((x) => (
              <Link
                className="journal-card"
                key={x.slug}
                to={`/journal/${x.slug}`}
              >
                <div className="journal-image">
                  <Image src={x.image} alt={x.title} loading="lazy" />
                </div>
                <div className="journal-meta">
                  <span>{x.category}</span>
                  <span>{x.read}</span>
                </div>
                <h3>{x.title}</h3>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
