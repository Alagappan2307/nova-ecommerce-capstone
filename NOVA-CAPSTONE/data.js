export const products = [
    {
        id: "arc-lamp",
        name: "Arc Table Lamp",
        category: "Lighting",
        price: 129,
        tag: "Bestseller",
        description: "A sculptural table lamp designed to bring a soft, warm glow to your favourite spaces.",
        bg: "#e4e0d4",
        light: "#f8f4e8",
        dark: "#92948a",
        art: "art-lamp" 
    },
    {
        id: "still-bottle",
        name: "Still Water Bottle",
        category: "On the go",
        price: 38,
        tag: "Everyday",
        description: "A minimal everyday bottle with a comfortable shape and a durable matte finish.",
        bg: "#dfe8e2",
        light: "#d4e8dc",
        dark: "#507667",
        art: "art-bottle"
    },
    {
        id: "form-tote",
        name: "Form Carry Tote",
        category: "Carry",
        price: 64,
        tag: "New",
        description: "A versatile everyday tote with a structured shape and space for your daily essentials.",
        bg: "#e9ded4",
        light: "#e8c8a8",
        dark: "#986d4b",
        art: "art-bag"
    },
    {
        id: "sound-one",
        name: "Sound One Headphones",
        category: "Technology",
        price: 189,
        tag: "Studio pick",
        description: "Minimal over-ear headphones imagined for focused work, journeys, and everyday listening.",
        bg: "#e1e1e5",
        light: "#d9d9e1",
        dark: "#565963",
        art: "art-headphones"
    },
    {
        id: "daily-cup",
        name: "Daily Ceramic Cup",
        category: "Home",
        price: 26,
        tag: "Small ritual",
        description: "A thoughtfully shaped ceramic cup for a better morning coffee or evening tea.",
        bg: "#e8dfd2",
        light: "#f5e9d8",
        dark: "#b58d65",
        art: "art-cup"
    },
    {
        id: "halo-lamp",
        name: "Halo Reading Light",
        category: "Lighting",
        price: 95,
        tag: "New",
        description: "A compact reading light with a calm silhouette, designed for desks and bedside tables.",
        bg: "#e4e5d9",
        light: "#f5f3db",
        dark: "#a0a38d",
        art: "art-lamp"
    },
    {
        id: "field-bottle",
        name: "Field Travel Flask",
        category: "On the go",
        price: 44,
        tag: "Popular",
        description: "A dependable travel flask for daily commutes, weekend adventures, and long days out.",
        bg: "#dce3e8",
        light: "#d6e1e8",
        dark: "#667e8e",
        art: "art-bottle"
    },
    {
        id: "studio-tote",
        name: "Studio Utility Tote",
        category: "Carry",
        price: 72,
        tag: "Limited",
        description: "A roomier carry tote for creative work, shopping, and everything in between.",
        bg: "#e7ded6",
        light: "#e9c6ae",
        dark: "#9b6047",
        art: "art-bag"
    }
];

export const categories = [
    "All",
    ...new Set(products.map(product => product.category))
];

export function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(price);
}
