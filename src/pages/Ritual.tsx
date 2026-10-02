import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Droplets,
  Flower2,
  Moon,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Sun,
} from "lucide-react";
import { products, money } from "../data";
import { Image, ProductArt } from "../components";
import { useStore } from "../store";
type Prefs = { length: number; texture: string; moment: string };
const defaults = { length: 3, texture: "balanced", moment: "both" };
function initial(): Prefs {
  try {
    const value = JSON.parse(localStorage.getItem("serene-ritual") || "null");
    return value &&
      [2, 3, 4].includes(value.length) &&
      ["light", "balanced", "rich"].includes(value.texture) &&
      ["morning", "evening", "both"].includes(value.moment)
      ? value
      : defaults;
  } catch {
    return defaults;
  }
}
export default function Ritual() {
  const s = useStore();
  const reduced = useReducedMotion();
  const [prefs, setPrefs] = useState<Prefs>(initial);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const update = (patch: Partial<Prefs>) => {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    try {
      localStorage.setItem("serene-ritual", JSON.stringify(next));
    } catch {
      /* optional storage */
    }
  };
  const choices =
    step === 0
      ? [
          {
            value: 2,
            icon: <Droplets />,
            title: "Keep it simple",
            text: "Two everyday essentials. A fresh start and a soft finish.",
            badge: "2 steps",
          },
          {
            value: 3,
            icon: <Flower2 />,
            title: "A little more care",
            text: "Our everyday trio, with one extra moment for your skin.",
            badge: "3 steps",
          },
          {
            value: 4,
            icon: <Sparkles />,
            title: "The full slow-down",
            text: "A complete collection, with a little extra for the evening.",
            badge: "4 steps",
          },
        ]
      : step === 1
        ? [
            {
              value: "light",
              icon: <Droplets />,
              title: "Light & fresh",
              text: "Airy layers, quick absorption, a barely-there feel.",
              badge: "Water-gel",
            },
            {
              value: "balanced",
              icon: <Flower2 />,
              title: "Soft & cushiony",
              text: "The sweet spot between featherlight and richly comforting.",
              badge: "Soft cream",
            },
            {
              value: "rich",
              icon: <Moon />,
              title: "Rich & comforting",
              text: "Plush textures and a nourishing finishing layer.",
              badge: "Balm-cream",
            },
          ]
        : [
            {
              value: "morning",
              icon: <Sun />,
              title: "A morning moment",
              text: "A fresh start before the day begins.",
              badge: "AM",
            },
            {
              value: "evening",
              icon: <Moon />,
              title: "An evening exhale",
              text: "Wash away the day, ease into the night.",
              badge: "PM",
            },
            {
              value: "both",
              icon: <Clock3 />,
              title: "A little of both",
              text: "Familiar favourites, morning and evening.",
              badge: "AM + PM",
            },
          ];
  const current =
    step === 0 ? prefs.length : step === 1 ? prefs.texture : prefs.moment;
  const titles = [
    "How much time feels like you?",
    "What textures do you love?",
    "When is your moment of calm?",
  ];
  const descriptions = [
    "There’s no perfect number of steps. Choose the space you want to make.",
    "Follow the feeling. We’ll help you find a combination that fits.",
    "A small ritual can be a lovely beginning — or a softer end to the day.",
  ];
  const recommended =
    prefs.length === 2
      ? [products[0], products[2]]
      : prefs.length === 3 &&
          prefs.texture === "rich" &&
          prefs.moment !== "morning"
        ? [products[0], products[2], products[3]]
        : products.slice(0, prefs.length);
  const result = step === 3;
  const selectedProducts = recommended.filter((p) => selected.includes(p.id));
  const total = selectedProducts.reduce((n, p) => n + p.price, 0);
  return (
    <>
      <section className="page-intro ritual-page-intro">
        <span className="eyebrow">A routine with room for you</span>
        <h1>
          Your skin. Your pace.
          <br />
          Your <em>little ritual.</em>
        </h1>
        <p>
          A few thoughtful questions. A considered combination.
          <br />
          Let’s find your everyday essentials.
        </p>
      </section>
      <section
        className={`ritual-builder section ${result ? "ritual-results" : ""}`}
      >
        {!result ? (
          <>
            <div className="builder-main">
              <div
                className="builder-progress"
                aria-label={`Step ${step + 1} of 3`}
              >
                {["Your routine", "Your textures", "Your moment"].map(
                  (x, i) => (
                    <button
                      key={x}
                      className={
                        step === i ? "active" : step > i ? "complete" : ""
                      }
                      disabled={i > step}
                      onClick={() => setStep(i)}
                    >
                      <span>
                        {i < step ? (
                          <Check size={13} />
                        ) : (
                          String(i + 1).padStart(2, "0")
                        )}
                      </span>
                      {x}
                    </button>
                  ),
                )}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="eyebrow">
                    A little about you · 0{step + 1}
                  </span>
                  <h2>{titles[step]}</h2>
                  <p className="muted">{descriptions[step]}</p>
                  <fieldset className="ritual-options">
                    <legend className="sr-only">{titles[step]}</legend>
                    {choices.map((c) => (
                      <label
                        key={c.value}
                        className={`ritual-option ${current === c.value ? "selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`ritual-${step}`}
                          checked={current === c.value}
                          onChange={() =>
                            update(
                              step === 0
                                ? { length: c.value as number }
                                : step === 1
                                  ? { texture: c.value as string }
                                  : { moment: c.value as string },
                            )
                          }
                        />
                        <span className="ritual-option-icon">{c.icon}</span>
                        <span className="ritual-option-copy">
                          <strong>{c.title}</strong>
                          <span>{c.text}</span>
                        </span>
                        <span className="option-badge">{c.badge}</span>
                        <span className="radio-visual">
                          {current === c.value && <span />}
                        </span>
                      </label>
                    ))}
                  </fieldset>
                </motion.div>
              </AnimatePresence>
              <div className="builder-actions">
                <button
                  className="text-button"
                  disabled={step === 0}
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft size={17} /> Back
                </button>
                <button
                  className="button"
                  onClick={() => {
                    if (step === 2) setSelected(recommended.map((p) => p.id));
                    setStep(step + 1);
                  }}
                >
                  {step === 2 ? "Meet your ritual" : "A little further"}
                  <ArrowRight size={17} />
                </button>
              </div>
              <span className="builder-note">
                <LeafNote />
                No quiz scores. No perfect answers. Just your preferences.
              </span>
            </div>
            <aside className="builder-aside">
              <Image
                src="/images/hero-refined.webp"
                alt="Our considered collection of skincare essentials"
              />
              <div>
                <span className="eyebrow">A gentle reminder</span>
                <h3>
                  Less pressure.
                  <br />
                  More <em>pleasure.</em>
                </h3>
                <p>The best routine is the one you look forward to.</p>
                <span className="aside-flower">✳</span>
              </div>
            </aside>
          </>
        ) : (
          <>
            <div className="result-heading">
              <span className="result-check">
                <Check size={22} />
              </span>
              <span className="eyebrow">Considered for your everyday</span>
              <h2>
                Your{" "}
                {prefs.length === 2
                  ? "simple"
                  : prefs.texture === "rich"
                    ? "comforting"
                    : "everyday"}{" "}
                <em>ritual.</em>
              </h2>
              <p>
                {prefs.length} steps ·{" "}
                {prefs.texture === "light"
                  ? "Light & fresh"
                  : prefs.texture === "rich"
                    ? "Rich & comforting"
                    : "Soft & cushiony"}{" "}
                ·{" "}
                {prefs.moment === "both"
                  ? "Morning & evening"
                  : prefs.moment === "morning"
                    ? "Morning moment"
                    : "Evening exhale"}
              </p>
              <p className="result-description">
                {prefs.length === 2
                  ? "A gentle cleanse and a comfortable finish. Sometimes, that’s all you need."
                  : prefs.texture === "rich"
                    ? "A considered mix of gentle cleansing and soft, comforting layers."
                    : "A fresh beginning, a little hydration, and a comfortable finish. Your routine, without the rush."}
              </p>
            </div>
            <div className="result-products">
              {recommended.map((p, i) => (
                <article
                  className={`result-product ${selected.includes(p.id) ? "included" : ""}`}
                  key={p.id}
                >
                  <div className="result-step">
                    0{i + 1}{" "}
                    <span>
                      {p.category === "Mask"
                        ? "Evening extra"
                        : p.category === "Cleanser"
                          ? "Cleanse"
                          : p.category === "Serum"
                            ? "Hydrate"
                            : "Comfort"}
                    </span>
                  </div>
                  <Link to={`/shop/${p.id}`}>
                    <ProductArt product={p} />
                  </Link>
                  <div className="result-product-title">
                    <h3>{p.name}</h3>
                    <span>{money(p.price)}</span>
                  </div>
                  <p>{p.subtitle}</p>
                  <label className="include-check">
                    <input
                      type="checkbox"
                      checked={selected.includes(p.id)}
                      onChange={() =>
                        setSelected((prev) =>
                          prev.includes(p.id)
                            ? prev.filter((x) => x !== p.id)
                            : [...prev, p.id],
                        )
                      }
                    />
                    Include in my ritual
                  </label>
                </article>
              ))}
            </div>
            <div className="result-bottom">
              <div>
                <span className="eyebrow">Your little collection</span>
                <h3>
                  {selectedProducts.length} essentials{" "}
                  <span>{money(total)}</span>
                </h3>
                <p>
                  {total >= 75
                    ? "Complimentary shipping included."
                    : "Shipping is complimentary on orders $75+."}
                </p>
              </div>
              <button
                className="button"
                disabled={!selectedProducts.length}
                onClick={() => {
                  selectedProducts.forEach((p) => s.add(p.id));
                  s.notify("Your considered ritual is in the bag.");
                  s.setDrawer("bag");
                }}
              >
                Add my ritual to bag <ShoppingBag size={18} />
              </button>
            </div>
            <div className="result-advice">
              <Sun size={18} />
              <p>
                {prefs.moment === "evening"
                  ? "Use Moon Rest two or three evenings a week, as an optional final layer."
                  : "Finish your morning ritual with your own sunscreen. Keep Moon Rest for the evening."}{" "}
                These suggestions reflect your preferences and are not a skin
                assessment.
              </p>
            </div>
            <button className="text-button restart" onClick={() => setStep(0)}>
              <RefreshCw size={15} /> Find another little ritual
            </button>
          </>
        )}
      </section>
      <div className="ritual-under-note">
        <Flower2 size={27} />
        <h3>A starting point, never a rule.</h3>
        <p>
          Your skin and your days can change. Keep what feels good, adjust what
          doesn’t,
          <br />
          and give new products a gentle introduction with a patch test.
        </p>
      </div>
    </>
  );
}
function LeafNote() {
  return <Flower2 size={14} />;
}
