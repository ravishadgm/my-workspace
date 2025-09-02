import puppeteer from "puppeteer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ ok: false, error: "URL is required" });
        }

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        // Extract only facebook "scontent" images
        const images = await page.evaluate(() => {
            const imgElements = document.querySelectorAll("img");
            const imgUrls = [];
            imgElements.forEach((img) => {
                if (img.src && img.src.includes("scontent")) {
                    imgUrls.push(img.src);
                }
            });
            return Array.from(new Set(imgUrls));
        });

        await browser.close();

        return res.status(200).json({
            ok: true,
            type: "photo",
            media: images.map((url) => ({ url })),
        });
    } catch (err) {
        console.error("Scraping failed:", err);
        return res.status(500).json({ ok: false, error: err.message });
    }
}
