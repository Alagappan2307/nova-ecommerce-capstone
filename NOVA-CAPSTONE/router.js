const listeners = new Set();
 
export function getRoute() {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";

    if (path === "/index.html") {
        return "/";
    }

    return path;
}

export function navigate(path) {
    if (path === window.location.pathname) {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
    }

    history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "auto" });
}

export function onRouteChange(callback) {
    listeners.add(callback);

    return () => {
        listeners.delete(callback);
    };
}

window.addEventListener("popstate", () => {
    listeners.forEach(callback => callback(getRoute()));
});

document.addEventListener("click", event => {
    const link = event.target.closest("a[data-link]");

    if (!link) return;

    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return;
    }

    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin) {
        return;
    }

    event.preventDefault();
    navigate(url.pathname + url.search);
});
