const WEATHER_API_ORIGIN = "https://api.weatherapi.com";
const ROUTES = {
    forecast: "/v1/forecast.json",
    search: "/v1/search.json"
};

function getCorsHeaders(origin, allowedOrigins) {
    if (!origin || !allowedOrigins.has(origin)) {
        return {};
    }

    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
    };
}

function jsonResponse(body, status, headers = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...headers
        }
    });
}

export default {
    async fetch(request, env) {
        const requestUrl = new URL(request.url);
        const origin = request.headers.get("Origin");
        const allowedOrigins = new Set(
            (env.ALLOWED_ORIGINS || "")
                .split(",")
                .map(value => value.trim())
                .filter(Boolean)
        );
        const corsHeaders = getCorsHeaders(origin, allowedOrigins);

        if (origin && !allowedOrigins.has(origin)) {
            return jsonResponse({ error: "Origin is not allowed." }, 403);
        }

        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers: corsHeaders });
        }

        if (request.method !== "GET") {
            return jsonResponse({ error: "Method not allowed." }, 405, corsHeaders);
        }

        const routeName = requestUrl.pathname.replace(/^\/+|\/+$/g, "");
        const upstreamPath = ROUTES[routeName];
        if (!upstreamPath) {
            return jsonResponse({ error: "Not found." }, 404, corsHeaders);
        }

        const query = requestUrl.searchParams.get("q")?.trim();
        if (!query || query.length > 100) {
            return jsonResponse({ error: "Query must contain between 1 and 100 characters." }, 400, corsHeaders);
        }

        if (!env.WEATHER_API_KEY) {
            return jsonResponse({ error: "Weather service is not configured." }, 500, corsHeaders);
        }

        const upstreamUrl = new URL(upstreamPath, WEATHER_API_ORIGIN);
        upstreamUrl.searchParams.set("key", env.WEATHER_API_KEY);
        upstreamUrl.searchParams.set("q", query);

        if (routeName === "forecast") {
            const requestedDays = Number.parseInt(requestUrl.searchParams.get("days") || "3", 10);
            const days = Number.isNaN(requestedDays)
                ? 3
                : Math.min(Math.max(requestedDays, 1), 3);
            upstreamUrl.searchParams.set("days", String(days));
        }

        try {
            const upstreamResponse = await fetch(upstreamUrl, {
                headers: { "Accept": "application/json" }
            });
            const responseHeaders = new Headers(corsHeaders);
            responseHeaders.set("Content-Type", "application/json; charset=utf-8");
            responseHeaders.set(
                "Cache-Control",
                routeName === "forecast" ? "public, max-age=120" : "public, max-age=300"
            );

            return new Response(upstreamResponse.body, {
                status: upstreamResponse.status,
                headers: responseHeaders
            });
        } catch {
            return jsonResponse({ error: "Weather service is unavailable." }, 502, corsHeaders);
        }
    }
};
