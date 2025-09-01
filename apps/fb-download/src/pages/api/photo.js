import puppeteer from "puppeteer";

export default async function handler(req, res) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.goto("https://example.com", { waitUntil: "networkidle2" });

        const images = await page.evaluate(() =>
            [...document.querySelectorAll("img")].map(img => img.src)
        );

        await browser.close();

        res.status(200).json({ ok: true, media: images });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
}
