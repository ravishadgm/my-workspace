import getFBInfo from "@xaviabot/fb-downloader";

export const config = {
    runtime: "nodejs",
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "Missing Facebook URL" });
        }

        if (
            !/^https?:\/\/(www\.|m\.|web\.)?facebook\.com/i.test(url) &&
            !/^https?:\/\/fb\.watch/i.test(url)
        ) {
            return res.status(400).json({ error: "Invalid Facebook URL" });
        }

        // 🔧 normalize (critical for reels)
        const normalizedUrl = normalizeFacebookUrl(url);

        const cookies = process.env.FB_COOKIES || undefined; // optional but helps for reels
        const userAgent =
            process.env.FB_USER_AGENT ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

        const fbData = await getFBInfo(normalizedUrl, cookies, userAgent);
        const mediaArray = Array.isArray(fbData) ? fbData : [fbData];

        if (!mediaArray.length || !mediaArray[0]) {
            return res.status(404).json({ error: "No media found" });
        }

        const first = mediaArray[0];

        const videoUrl = first.hd || first.sd || first.url || null;
        const isMp4 = typeof videoUrl === "string" && /\.mp4(\?|$)/i.test(videoUrl);

        let type = /\/reel\//i.test(url) ? "reel" : "video";
        if (!videoUrl) {
            type = "photo";
        }

        const media = [];
        if (videoUrl) {
            media.push({
                quality: first.hd ? "HD" : "SD/auto",
                url: videoUrl,
                proxyUrl: `/api/proxy?url=${encodeURIComponent(videoUrl)}`,
                isMp4,
            });
        } else if (first.url) {
            media.push({
                quality: "original",
                url: first.url,
                proxyUrl: `/api/proxy?url=${encodeURIComponent(first.url)}`,
            });
        }

        if (!media.length) {
            return res.status(404).json({ error: "No downloadable media" });
        }

        return res.status(200).json({
            ok: true,
            type, // "reel" | "video" | "photo"
            title: first.title || null,
            thumbnail: first.thumbnail || null,
            media,
            normalizedUrl,
        });
    } catch (err) {
        console.error("FB Downloader Error:", {
            message: err?.message,
            stack: err?.stack,
            status: err?.response?.status,
        });
        return res.status(500).json({ error: err?.message || "Internal server error" });
    }
}

function normalizeFacebookUrl(input) {
    try {
        const u = new URL(input.trim());
        if (/^(m|web)\.facebook\.com$/i.test(u.hostname)) u.hostname = "www.facebook.com";
        const reelMatch = u.pathname.match(/\/reel\/(\d+)/i);
        if (reelMatch?.[1]) {
            u.pathname = "/watch/";
            u.search = "";
            u.searchParams.set("v", reelMatch[1]);
        }
        return u.toString();
    } catch {
        return input;
    }
}
