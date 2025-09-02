import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { getInstagramMedia } = require("../../lib/instagram-helper.js");
import { fetchStoryFromRapidAPI } from "../../lib/instagram-story-helper.js";
import { callRapidAPI } from "../../lib/rapidapi.js";
import { callApify } from "../../lib/apify.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { url } = req.body;

        if (!url || !/^https?:\/\/(www\.)?instagram\.com\//.test(url)) {
            return res.status(400).json({ error: "Invalid Instagram URL" });
        }

        // --- STORIES ---
        if (url.includes("/stories/")) {
            const username = extractUsernameFromUrl(url);
            let result = await fetchStoryFromRapidAPI(username);
            if (!hasMedia(result)) result = await callApify(url);
            return respondOr404(result, res);
        }

        // --- POSTS / REELS / IGTV ---
        let results;
        try {
            results = await getInstagramMedia(url);

        } catch {
            results = null;
        }

        console.log("getInstagramMedia------------------", results);

        if (!hasMedia(results)) results = await callRapidAPI(url);
        if (!hasMedia(results)) results = await callApify(url);

        return respondOr404(results, res);
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Internal server error", details: err.message });
    }
}

/* ---------- helpers ---------- */
function respondOr404(result, res) {
    if (!hasMedia(result)) {
        return res.status(404).json({ error: "No media found." });
    }

    const mediaUrls = result.mediaUrls || result.url_list || [];
    const first = result.mediaUrl || mediaUrls[0];
    const mediaDet = result.media_details?.[0] || {};
    const postInfo = result.post_info || {};

    let type = result.type || mediaDet.type || "viewer";
    if (type.includes("video") && result.requestUrl?.includes("/reel"))
        type = "reel";
    else if (type.includes("video") && result.requestUrl?.includes("/tv"))
        type = "igtv";
    else if (mediaDet.is_carousel) type = "carousel";
    else if (type.includes("image")) type = "photo";

    return res.json({
        type,
        mediaUrl: first,
        mediaUrls: mediaUrls.length ? mediaUrls : first ? [first] : [],
        thumbnail: result.thumbnail || mediaDet.thumbnail || first,
        quality: result.quality || [],
        username: result.username || postInfo.owner_username || "instagram_user",
        fullName: result.fullName || postInfo.owner_fullname || null,
        isVerified: result.isVerified ?? postInfo.is_verified ?? false,
        caption: result.caption || postInfo.caption || null,
        likes: result.likes ?? postInfo.likes ?? 0,
        comments: result.comments ?? postInfo.comment_count ?? null,
        views: result.views ?? mediaDet.video_view_count ?? 0,
        postedAt: result.postedAt || postInfo.timestamp || null,
    });
}

function hasMedia(obj) {
    if (!obj || obj.error) return false;
    return Boolean(
        obj.mediaUrl ||
        (Array.isArray(obj.mediaUrls) && obj.mediaUrls.length) ||
        (Array.isArray(obj.url_list) && obj.url_list.length)
    );
}

function extractUsernameFromUrl(u) {
    const m = u.match(/instagram\.com\/stories\/([^/]+)/);
    return m?.[1] ?? null;
}
