export type Product = {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  price: number;
  size: string;
  mini: string;
  texture: string;
  ingredients: { name: string; text: string }[];
  usage: string;
  tag?: string;
  cell: number;
};
export const products: Product[] = [
  {
    id: "soft-start",
    name: "Soft Start",
    category: "Cleanser",
    subtitle: "Gentle daily cleanser",
    description:
      "A fresh beginning. A soft, low-foam cleanser that washes away the day and leaves skin feeling comfortable.",
    price: 24,
    size: "150 ml",
    mini: "50 ml",
    texture: "Soft gel",
    ingredients: [
      {
        name: "Oat extract",
        text: "A comforting addition to a gentle daily cleanse.",
      },
      { name: "Glycerin", text: "Helps retain moisture as you wash." },
    ],
    usage:
      "Massage one pump onto damp skin. Take a moment, then rinse with lukewarm water. Use morning or evening.",
    tag: "Your first step",
    cell: 0,
  },
  {
    id: "daily-dew",
    name: "Daily Dew",
    category: "Serum",
    subtitle: "Lightweight hydrating serum",
    description:
      "A little drink for your skin. This featherlight serum layers easily and brings a dewy finish to your everyday ritual.",
    price: 32,
    size: "30 ml",
    mini: "10 ml",
    texture: "Silky water-gel",
    ingredients: [
      {
        name: "Hyaluronic acid",
        text: "A humectant that helps skin hold onto water.",
      },
      { name: "Aloe juice", text: "Adds a fresh, light feel to the formula." },
    ],
    usage:
      "Smooth two or three drops over clean, slightly damp skin. Follow with your favourite moisturiser.",
    tag: "Everyday favourite",
    cell: 1,
  },
  {
    id: "cloud-comfort",
    name: "Cloud Comfort",
    category: "Moisturiser",
    subtitle: "Soft daily moisturiser",
    description:
      "Comfort, in a little jar. A cushiony cream that settles beautifully into skin for a soft, supple finish.",
    price: 36,
    size: "50 ml",
    mini: "15 ml",
    texture: "Cushiony cream",
    ingredients: [
      {
        name: "Squalane",
        text: "An emollient for a smooth, comfortable feel.",
      },
      {
        name: "Shea butter",
        text: "Brings richness and softness to the texture.",
      },
    ],
    usage:
      "Warm a small amount between your fingers, then gently press into your face and neck. In the morning, finish with your own sunscreen.",
    tag: "A daily essential",
    cell: 2,
  },
  {
    id: "moon-rest",
    name: "Moon Rest",
    category: "Mask",
    subtitle: "Nourishing overnight mask",
    description:
      "Let the evening slow down. A rich finishing layer for nights when your skin could use a little extra comfort.",
    price: 42,
    size: "60 ml",
    mini: "20 ml",
    texture: "Rich balm-cream",
    ingredients: [
      {
        name: "Oat lipids",
        text: "Add a nourishing feel to your evening routine.",
      },
      {
        name: "Squalane",
        text: "Helps keep skin feeling soft and comfortable.",
      },
    ],
    usage:
      "Apply a thin layer as the final step in your evening routine, two or three nights a week. Rinse gently in the morning.",
    tag: "An evening exhale",
    cell: 3,
  },
];
export const articles = [
  {
    slug: "less-but-better",
    title: "Less, but better: finding your everyday ritual",
    category: "Rituals",
    read: "5 min read",
    image: "/images/journal-ritual.webp",
    intro:
      "There is something lovely about a routine you can return to. A few familiar textures, a quiet moment, and enough space to breathe.",
    paragraphs: [
      "A good ritual begins with what feels manageable. It might be a quick cleanse and a comfortable moisturiser, or a few extra minutes spent pressing in a serum. There is no perfect number of steps. There is only what makes sense for your day.",
      "Start with a gentle cleanser and a moisturiser you enjoy using. Give yourself time to get familiar with their textures. When your routine feels settled, you can decide whether an extra layer earns its place.",
      "Consistency can be easier when the ritual is pleasurable. Keep your essentials where you can reach them, use lukewarm water, and take your time. Your skincare does not need to turn your bathroom into a laboratory.",
      "In the morning, remember to finish with a suitable sunscreen. Introduce new products gradually and patch test first. If you have ongoing skin concerns, a qualified professional can help you find an approach that is right for you.",
    ],
  },
  {
    slug: "a-softer-evening",
    title: "A softer landing at the end of the day",
    category: "Everyday calm",
    read: "4 min read",
    image: "/images/journal-evening.webp",
    intro:
      "A small pause between the day you have had and the evening ahead. Sometimes, that is all a ritual needs to be.",
    paragraphs: [
      "Put your phone somewhere else for a moment. Turn on a warm light. Let the water run until it feels comfortable. These are small details, but they can help an ordinary task feel a little more considered.",
      "Take off the day with a gentle cleanse, then choose the texture that feels good tonight. A light moisturiser might be enough. On a slower evening, a richer finishing layer can be a lovely addition.",
      "You do not need an elaborate setting or an uninterrupted hour. Even a few minutes can be your own. Let the routine fit into your life, and let it change when your life does.",
    ],
  },
  {
    slug: "meet-your-textures",
    title: "A small guide to textures, from dew to cloud",
    category: "Skin notes",
    read: "3 min read",
    image: "/images/journal-texture.webp",
    intro:
      "Watery, silky, cushiony, rich. Texture is a personal thing — and a lovely place to start when choosing your skincare.",
    paragraphs: [
      "Light textures tend to feel fresh and disappear quickly into the skin. A water-gel serum is easy to layer and is a good companion to a simple morning routine.",
      "Creams feel softer and more substantial. Richer balm-creams offer a comforting finishing layer, especially in an evening ritual. Preferences can shift with the seasons, too.",
      "Try applying products from the lightest texture to the richest. You do not have to use everything at once: start small, listen to how your skin feels, and leave room to adjust.",
    ],
  },
];
export const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
