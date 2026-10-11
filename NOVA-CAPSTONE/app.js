import { products, categories, formatPrice } from "./data.js";
import { getRoute, onRouteChange } from "./router.js";

const app = document.querySelector("#app");
const cartCount = document.querySelector("#cart-count");
const toast = document.querySelector("#toast");
const searchDialog = document.querySelector("#search-dialog");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");
const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");

const CART_KEY = "nova-capstone-cart";
let cart = loadCart();
let toastTimer;

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

        if (!Array.isArray(saved)) return [];

        return saved.filter(item =>
            products.some(product => product.id === item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    } catch {
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
        showToast("Browser storage is unavailable.");
    }

    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = String(count);

    document.querySelector(".bag-link")?.setAttribute(
        "aria-label",
        `Shopping bag, ${count} item${count === 1 ? "" : "s"}`
    );
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 2500);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function productArt(product) {
    return `
        <div
            class="product-art ${product.art}"
            style="
                --shape-light: ${product.light};
                --shape-dark: ${product.dark};
            "
            aria-hidden="true"
        >
            <div class="product-shape"></div>
        </div>
    `;
}

function productCard(product) {
    return `
        <article class="product-card">
            <div
                class="product-visual"
                style="--product-bg: ${product.bg}"
            >
                <span class="product-badge">
                    ${escapeHTML(product.tag)}
                </span>

                <a
                    href="/product/${product.id}"
                    data-link
                    aria-label="View ${escapeHTML(product.name)}"
                >
                    ${productArt(product)}
                </a>

                <button
                    type="button"
                    class="quick-add"
                    data-add="${product.id}"
                    aria-label="Add ${escapeHTML(product.name)} to bag"
                >+</button>
            </div>

            <div class="product-meta">
                <div>
                    <h3 class="product-name">
                        ${escapeHTML(product.name)}
                    </h3>
                    <p class="product-category">
                        ${escapeHTML(product.category)}
                    </p>
                </div>

                <span class="product-price">
                    ${formatPrice(product.price)}
                </span>
            </div>
        </article>
    `;
}

function productGrid(list) {
    if (list.length === 0) {
        return `
            <div class="empty-state">
                <h2>No objects found.</h2>
                <p>Try another search or category.</p>
                <button class="button button-dark" data-reset type="button">
                    View all products
                </button>
            </div>
        `;
    }

    return `
        <div class="product-grid">
            ${list.map(productCard).join("")}
        </div>
    `;
}

function homePage() {
    return `
        <section class="container hero">
            <div class="hero-layout">
                <div class="hero-copy">
                    <p class="eyebrow">
                        DESIGNED FOR THE EVERYDAY · VOL. 01
                    </p>

                    <h1>Less, but<br><em>better.</em></h1>

                    <p>
                        Considered objects for the rituals, routines,
                        and little moments that make a life.
                    </p>

                    <div class="hero-actions">
                        <a class="button button-dark"
                           href="/collection" data-link>
                            Explore collection ↗
                        </a>

                        <a class="text-link" href="/story" data-link>
                            Why NOVA?
                        </a>
                    </div>
                </div>

                <div class="hero-art"
                     role="img"
                     aria-label="Abstract sculptural lamp in a sunlit studio">
                    <div class="hero-object" aria-hidden="true">
                        <div class="hero-orb"></div>
                        <div class="hero-stem"></div>
                        <div class="hero-base"></div>
                    </div>

                    <div class="hero-sticker">
                        MADE FOR<br>REAL LIFE<br>✳
                    </div>
                </div>
            </div>
        </section>

        <div class="marquee"
             aria-label="Thoughtful design, made for everyday">
            <div class="marquee-track" aria-hidden="true">
                ${Array.from({ length: 4 }, () => `
                    <span>
                        Thoughtful by design ✳ Built to be used ✳
                        Made for everyday ✳ Objects with purpose ✳
                    </span>
                `).join("")}
            </div>
        </div>

        <section class="container section">
            <div class="section-head">
                <div>
                    <p class="eyebrow">THE EDIT</p>
                    <h2>Everyday icons.</h2>
                </div>

                <p>
                    Small upgrades. Better rituals. Meet the pieces
                    we reach for every single day.
                </p>
            </div>

            ${productGrid(products.slice(0, 4))}

            <div class="center-action">
                <a class="button button-outline"
                   href="/collection" data-link>
                    View all objects ↗
                </a>
            </div>
        </section>

        <section class="container section">
            <div class="value-band">
                <div class="value-item">
                    <strong>01 / Useful first</strong>
                    <p>Form follows function. Every detail earns its place.</p>
                </div>

                <div class="value-item">
                    <strong>02 / Made to stay</strong>
                    <p>Timeless shapes and considered details over passing trends.</p>
                </div>

                <div class="value-item">
                    <strong>03 / Less noise</strong>
                    <p>A quieter, more intentional approach to the everyday.</p>
                </div>
            </div>
        </section>

        <section class="newsletter">
            <div class="container newsletter-inner">
                <div>
                    <p class="eyebrow" style="color:var(--lime)">
                        THE NOVA NOTE
                    </p>
                    <h2>A little less noise.<br>A little more good.</h2>
                    <p>
                        Occasional notes on thoughtful design and
                        everyday inspiration.
                    </p>
                </div>

                <form class="newsletter-form" id="newsletter-form">
                    <label class="visually-hidden" for="newsletter-email">
                        Email address
                    </label>
                    <input id="newsletter-email"
                           type="email"
                           autocomplete="email"
                           placeholder="Your email address"
                           required>
                    <button class="button button-lime" type="submit">
                        Count me in ↗
                    </button>
                </form>
            </div>
        </section>
    `;
}

function collectionPage() {
    return `
        <section class="container page-heading">
            <p class="eyebrow">THE FULL LINEUP / 2026</p>
            <h1>Objects with<br>intention.</h1>
            <p>
                Useful, durable, and quietly distinctive.
                Find the pieces that fit your everyday.
            </p>
        </section>

        <section class="container" style="padding-bottom:80px">
            <div class="collection-toolbar">
                <div class="filter-list" aria-label="Product categories">
                    ${categories.map((category, index) => `
                        <button
                            class="filter-chip"
                            type="button"
                            data-category="${escapeHTML(category)}"
                            aria-pressed="${index === 0}"
                        >
                            ${escapeHTML(category)}
                        </button>
                    `).join("")}
                </div>

                <label class="visually-hidden" for="sort-products">
                    Sort products
                </label>

                <select class="sort-select" id="sort-products">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="name">Name: A to Z</option>
                </select>
            </div>

            <p id="result-count" class="muted small" aria-live="polite"></p>
            <div id="collection-results"></div>
        </section>
    `;
}

function detailPage(id) {
    const product = products.find(item => item.id === id);

    if (!product) return notFoundPage();

    return `
        <section class="container">
            <div class="product-detail">
                <div class="detail-visual"
                     style="--product-bg:${product.bg}">
                    ${productArt(product)}
                    <span class="product-badge">
                        ${escapeHTML(product.tag)}
                    </span>
                </div>

                <div class="detail-copy">
                    <p class="eyebrow">
                        ${escapeHTML(product.category)} / NOVA OBJECT
                    </p>

                    <h1>${escapeHTML(product.name)}</h1>
                    <p class="detail-price">${formatPrice(product.price)}</p>

                    <p class="product-description">
                        ${escapeHTML(product.description)}
                    </p>

                    <div class="detail-actions">
                        <button class="button button-dark"
                                type="button"
                                data-add="${product.id}">
                            Add to bag — ${formatPrice(product.price)} ↗
                        </button>

                        <a class="button button-outline"
                           href="/collection" data-link>
                            Back to collection
                        </a>
                    </div>

                    <p class="detail-note">
                        Thoughtfully selected. Designed for daily use.
                    </p>
                    <p class="detail-note">
                        Demo checkout — no payment is collected.
                    </p>
                </div>
            </div>
        </section>
    `;
}

function cartPage() {
    const items = cart.map(item => ({
        ...item,
        product: products.find(product => product.id === item.id)
    })).filter(item => item.product);

    if (items.length === 0) {
        return `
            <section class="container page-heading">
                <p class="eyebrow">YOUR BAG</p>
                <h1>A little room<br>for good things.</h1>
            </section>

            <section class="container" style="padding-bottom:80px">
                <div class="empty-state">
                    <h2>Your bag is taking a breather.</h2>
                    <p>Explore the collection and add something useful.</p>
                    <a class="button button-dark"
                       href="/collection" data-link>
                        Explore collection ↗
                    </a>
                </div>
            </section>
        `;
    }

    const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return `
        <section class="container page-heading">
            <p class="eyebrow">YOUR BAG / ${items.length} PRODUCT(S)</p>
            <h1>Good choices.</h1>
            <p>This is a demonstration cart. No real order is processed.</p>
        </section>

        <section class="container cart-layout">
            <div class="cart-list">
                ${items.map(({ product, quantity }) => `
                    <article class="cart-row">
                        <div class="cart-thumb"
                             style="--product-bg:${product.bg}">
                            ${productArt(product)}
                        </div>

                        <div>
                            <h3>${escapeHTML(product.name)}</h3>
                            <p>${escapeHTML(product.category)}</p>

                            <div class="quantity-control">
                                <button type="button"
                                        data-quantity="${product.id}"
                                        data-change="-1"
                                        aria-label="Decrease quantity">
                                    −
                                </button>

                                <span>${quantity}</span>

                                <button type="button"
                                        data-quantity="${product.id}"
                                        data-change="1"
                                        aria-label="Increase quantity">
                                    +
                                </button>
                            </div>

                            <button class="remove-link"
                                    type="button"
                                    data-remove="${product.id}">
                                Remove
                            </button>
                        </div>

                        <strong class="product-price">
                            ${formatPrice(product.price * quantity)}
                        </strong>
                    </article>
                `).join("")}
            </div>

            <aside class="cart-summary">
                <h2>Order summary</h2>

                <div class="summary-line">
                    <span>Subtotal</span>
                    <strong>${formatPrice(subtotal)}</strong>
                </div>

                <div class="summary-line">
                    <span>Shipping</span>
                    <span>Calculated later</span>
                </div>

                <div class="summary-line summary-total">
                    <span>Total</span>
                    <strong>${formatPrice(subtotal)}</strong>
                </div>

                <button class="button button-dark"
                        style="width:100%;margin-top:18px"
                        type="button"
                        data-checkout>
                    Continue to checkout ↗
                </button>

                <p class="muted small">
                    Demo only. Payments are not enabled.
                </p>
            </aside>
        </section>
    `;
}

function storyPage() {
    return `
        <section class="container page-heading">
            <p class="eyebrow">A DIFFERENT KIND OF EVERYDAY</p>
            <h1>Good design<br>gets out of the way.</h1>
            <p>
                NOVA is a concept storefront built around a simple idea:
                everyday objects should be useful, enduring, and a
                pleasure to live with.
            </p>
        </section>

        <section class="container story-grid">
            <div class="story-art" role="img"
                 aria-label="NOVA brand graphic">
                <span>N.</span>
            </div>

            <div class="story-copy">
                <p class="eyebrow">OUR POINT OF VIEW</p>
                <h2>Buy fewer things.<br>Choose them well.</h2>

                <p>
                    We believe the best objects do not demand attention.
                    They earn a place in your life through thoughtful
                    details, intuitive design, and forms that feel right.
                </p>

                <p>
                    This capstone demonstrates product discovery,
                    client-side navigation, filtering, sorting, and
                    browser-based cart persistence. It does not collect
                    payment information or place real orders.
                </p>

                <a class="button button-dark"
                   href="/collection" data-link>
                    Explore the collection ↗
                </a>
            </div>
        </section>

        <section class="newsletter">
            <div class="container newsletter-inner">
                <div>
                    <p class="eyebrow" style="color:var(--lime)">
                        OUR PRINCIPLES
                    </p>
                    <h2>Purpose over noise.</h2>
                    <p>
                        Clear choices, considered details, and a better
                        everyday experience.
                    </p>
                </div>

                <a class="button button-lime" href="/" data-link>
                    Back to NOVA ↗
                </a>
            </div>
        </section>
    `;
}

function notFoundPage() {
    return `
        <section class="container not-found">
            <p class="eyebrow">404 / WRONG TURN</p>
            <h1>Nothing here.</h1>
            <p class="muted">That page seems to have wandered off.</p>
            <a class="button button-dark" href="/" data-link>
                Return home ↗
            </a>
        </section>
    `;
}

function renderRoute(route = getRoute()) {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    document.querySelectorAll("[data-nav]").forEach(link => {
        link.removeAttribute("aria-current");
    });

    if (route === "/") {
        app.innerHTML = homePage();
    } else if (route === "/collection") {
        app.innerHTML = collectionPage();
        setupCollection();
    } else if (route === "/story") {
        app.innerHTML = storyPage();
    } else if (route === "/cart") {
        app.innerHTML = cartPage();
    } else if (route.startsWith("/product/")) {
        app.innerHTML = detailPage(route.split("/")[2]);
    } else {
        app.innerHTML = notFoundPage();
    }

    const navKey =
        route === "/" ? "home" :
        route === "/collection" || route.startsWith("/product/") ? "collection" :
        route === "/story" ? "story" : "";

    if (navKey) {
        document.querySelector(`[data-nav="${navKey}"]`)
            ?.setAttribute("aria-current", "page");
    }

    const titles = {
        "/": "NOVA — Objects for Better Living",
        "/collection": "Collection — NOVA",
        "/story": "Our Story — NOVA",
        "/cart": "Your Bag — NOVA"
    };

    const product = route.startsWith("/product/")
        ? products.find(item => item.id === route.split("/")[2])
        : null;

    document.title = product
        ? `${product.name} — NOVA`
        : titles[route] || "NOVA — Objects for Better Living";

    updateCartCount();
}

function setupCollection() {
    const results = document.querySelector("#collection-results");
    const resultCount = document.querySelector("#result-count");
    const sort = document.querySelector("#sort-products");

    let selectedCategory = "All";

    const query = new URLSearchParams(window.location.search).get("q") || "";

    function renderProducts() {
        let visible = products.filter(product => {
            const categoryMatches =
                selectedCategory === "All" ||
                product.category === selectedCategory;

            const searchText =
                `${product.name} ${product.category} ${product.description}`
                    .toLowerCase();

            return categoryMatches &&
                searchText.includes(query.toLowerCase());
        });

        if (sort.value === "price-low") {
            visible.sort((a, b) => a.price - b.price);
        } else if (sort.value === "price-high") {
            visible.sort((a, b) => b.price - a.price);
        } else if (sort.value === "name") {
            visible.sort((a, b) => a.name.localeCompare(b.name));
        }

        results.innerHTML = productGrid(visible);

        resultCount.textContent =
            `${visible.length} object${visible.length === 1 ? "" : "s"}` +
            (query ? ` matching "${query}"` : "");
    }

    document.querySelectorAll("[data-category]").forEach(button => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;

            document.querySelectorAll("[data-category]").forEach(item => {
                item.setAttribute(
                    "aria-pressed",
                    String(item === button)
                );
            });

            renderProducts();
        });
    });

    sort.addEventListener("change", renderProducts);

    results.addEventListener("click", event => {
        if (event.target.closest("[data-reset]")) {
            selectedCategory = "All";
            sort.value = "featured";

            document.querySelectorAll("[data-category]").forEach(item => {
                item.setAttribute(
                    "aria-pressed",
                    String(item.dataset.category === "All")
                );
            });

            renderProducts();
        }
    });

    renderProducts();
}

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }

    saveCart();
    showToast(`${product.name} added to your bag.`);
}

function changeQuantity(id, amount) {
    const item = cart.find(entry => entry.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(entry => entry.id !== id);
    }

    saveCart();
    renderRoute("/cart");
}

app.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add]");

    if (addButton) {
        addToCart(addButton.dataset.add);
        return;
    }

    const quantityButton = event.target.closest("[data-quantity]");

    if (quantityButton) {
        changeQuantity(
            quantityButton.dataset.quantity,
            Number(quantityButton.dataset.change)
        );
        return;
    }

    const removeButton = event.target.closest("[data-remove]");

    if (removeButton) {
        cart = cart.filter(item => item.id !== removeButton.dataset.remove);
        saveCart();
        renderRoute("/cart");
        showToast("Item removed from your bag.");
        return;
    }

    if (event.target.closest("[data-checkout]")) {
        showToast("Demo checkout only — no payment was taken.");
    }
});

document.querySelector("#search-open").addEventListener("click", () => {
    if (typeof searchDialog.showModal === "function") {
        searchDialog.showModal();
    } else {
        searchDialog.setAttribute("open", "");
    }

    searchInput.focus();
});

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) return;

    searchDialog.close();

    history.pushState(
        {},
        "",
        `/collection?q=${encodeURIComponent(query)}`
    );

    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "auto" });
});

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    navigation.classList.toggle("is-open", isOpen);
});

document.addEventListener("submit", event => {
    if (event.target.id !== "newsletter-form") return;

    event.preventDefault();

    const email = document.querySelector("#newsletter-email");

    if (email.checkValidity()) {
        event.target.reset();
        showToast("Thanks! The demo form works locally.");
    }
});

document.querySelector("#year").textContent =
    new Date().getFullYear();

onRouteChange(renderRoute);

saveCart();
renderRoute();