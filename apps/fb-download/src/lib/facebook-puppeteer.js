import puppeteer from "puppeteer";

export async function callFacebookPuppeteer(url) {
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const videos = await page.$$eval("video", els => els.map(v => v.src).filter(Boolean));
    const images = await page.$$eval("img", els => els.map(i => i.src).filter(s => s.includes("scontent")));

    const caption = await page.$eval("div[dir='auto']", el => el.innerText).catch(() => null);

    await browser.close();

    const media = videos.length ? videos : images;
    return {
        type: videos.length ? "video" : "photo",
        caption: caption || null,
        media: media.map((url) => ({ url })),
    };
}
