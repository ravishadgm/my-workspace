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
            return res.status(400).json({ error: "Missing Facebook story URL" });
        }

        const response = await fetch(
            "https://facebook-media-api.p.rapidapi.com/media/stories",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //"x-rapidapi-key": process.env.RAPIDAPI_KEY,
                    "x-rapidapi-key": 'ecfb71dbc6msh2db6058090453a8p1e7ff6jsna42d93ce4e1b',
                    // "x-rapidapi-key": "c34d95927dmsh166eff8f28923b3p1ea15ajsn0f2a81eab998", ---- not workable    
                    "x-rapidapi-host": "facebook-media-api.p.rapidapi.com",
                },
                body: JSON.stringify({
                    url,
                    cookie: "",
                    proxy: "",
                }),
            }
        );

        const storyData = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: "RapidAPI request failed",
                details: storyData,
            });
        }

        // --- Collect Media Recursively ---
        function collectMedia(obj, collected = []) {
            if (!obj || typeof obj !== "object") return collected;

            if (obj.playable_url_quality_hd || obj.playable_url) {
                collected.push(obj.playable_url_quality_hd || obj.playable_url);
            }

            if (obj.image?.uri) {
                collected.push(obj.image.uri);
            }

            if (Array.isArray(obj)) {
                obj.forEach((item) => collectMedia(item, collected));
            } else {
                for (const key of Object.keys(obj)) {
                    collectMedia(obj[key], collected);
                }
            }

            return collected;
        }

        const mediaList = collectMedia(storyData);

        if (!mediaList || mediaList.length === 0) {
            return res.status(404).json({
                error: "No stories found",
                debug: storyData,
            });
        }

        const firstNode = storyData?.data?.nodes?.[0];
        const accountInfo = firstNode?.story_bucket_owner || {};

        const accountName = accountInfo.name || "Unknown User";
        const accountId = accountInfo.id || null;
        const profilePic = accountInfo.profile_picture?.uri || null;
        const accountUrl = accountInfo.url || null;

        return res.status(200).json({
            ok: true,
            type: "story",
            account: {
                id: accountId,
                name: accountName,
                profilePic,
                url: accountUrl,
            },
            urls: mediaList,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
