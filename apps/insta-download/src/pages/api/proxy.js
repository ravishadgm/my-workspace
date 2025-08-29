export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Range, Content-Type");
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: "Missing URL parameter" });
    }

    if (!targetUrl.includes("scontent") && !targetUrl.includes("instagram")) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    try {
        const range = req.headers.range || "";
        const userAgent =
            req.headers["user-agent"] ||
            "Mozilla/5.0 (compatible; InstagramDownloader/1.0)";

        const response = await fetch(targetUrl, {
            headers: {
                Range: range,
                "User-Agent": userAgent,
                Referer: "https://www.instagram.com/",
            },
        });

        if (!response.ok) {
            throw new Error(`Upstream server responded with ${response.status}`);
        }

        // Forward relevant headers
        const relevantHeaders = [
            "content-type",
            "content-length",
            "accept-ranges",
            "content-range",
            "cache-control",
            "etag",
            "last-modified",
        ];

        relevantHeaders.forEach((h) => {
            const v = response.headers.get(h);
            if (v) res.setHeader(h, v);
        });

        // Add CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Range, Content-Type");

        // Cache control
        if (!res.getHeader("cache-control")) {
            res.setHeader("Cache-Control", "public, max-age=86400");
        }

        response.body.pipe(res);
    } catch (err) {
        res
            .status(500)
            .json({ error: "Failed to fetch media", details: err.message });
    }
}
