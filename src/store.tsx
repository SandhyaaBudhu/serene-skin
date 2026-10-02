import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { products } from "./data";
export type BagItem = { id: string; size: string; quantity: number };
function read<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}
function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => read(key, initial));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }, [key, value]);
  return [value, setValue] as const;
}
export function itemPrice(id: string, size: string) {
  const p = products.find((x) => x.id === id)!;
  return size === p.mini ? Math.round(p.price * 0.45) : p.price;
}
type Store = {
  bag: BagItem[];
  wishlist: string[];
  theme: string;
  drawer: "bag" | "wishlist" | null;
  toast: string;
  toggleTheme: () => void;
  setDrawer: (v: "bag" | "wishlist" | null) => void;
  toggleWish: (id: string) => void;
  add: (id: string, size?: string, quantity?: number) => void;
  update: (id: string, size: string, q: number) => void;
  clear: () => void;
  notify: (text: string) => void;
};
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = usePersisted<BagItem[]>("serene-bag", []);
  const [wishlist, setWish] = usePersisted<string[]>("serene-wishlist", []);
  const [theme, setTheme] = usePersisted<string>("serene-theme", "light");
  const [drawer, setDrawer] = useState<Store["drawer"]>(null);
  const [toast, setToast] = useState("");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const add = (id: string, size?: string, quantity = 1) => {
    const p = products.find((p) => p.id === id)!;
    const chosen = size || p.size;
    setBag((items) => {
      const exists = items.find((i) => i.id === id && i.size === chosen);
      return exists
        ? items.map((i) =>
            i === exists
              ? { ...i, quantity: Math.min(20, i.quantity + quantity) }
              : i,
          )
        : [...items, { id, size: chosen, quantity }];
    });
    setToast(`${p.name} added to your bag`);
  };
  const toggleWish = (id: string) =>
    setWish((items) =>
      items.includes(id) ? items.filter((i) => i !== id) : [...items, id],
    );
  return (
    <Context.Provider
      value={{
        bag,
        wishlist,
        theme,
        drawer,
        toast,
        toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
        setDrawer,
        toggleWish,
        add,
        update: (id, size, q) =>
          setBag((items) =>
            q <= 0
              ? items.filter((i) => !(i.id === id && i.size === size))
              : items.map((i) =>
                  i.id === id && i.size === size
                    ? { ...i, quantity: Math.min(q, 20) }
                    : i,
                ),
          ),
        clear: () => setBag([]),
        notify: setToast,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStore() {
  const s = useContext(Context);
  if (!s) throw Error("StoreProvider required");
  return s;
}
