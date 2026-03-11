import { scrapeHtmlWeb } from "scrape-html-web";

// const options = {
//     url: "https://nodejs.org/en/blog/",
//     bypassCors: true, // avoids running errors in esm
//     mainSelector: ".blog-index",
//     childrenSelector: [
//         { key: "date", selector: "time", type: "text" },
//         // by default, the first option that is taken into consideration is att
//         { key: "version", selector: "a", type: "text" },
//         { key: "link", selector: "a", attr: "href" },
//     ],
// };
//
// (async () => {
//     const data = await scrapeHtmlWeb(options);
//     console.log(data);
// })();

export async function getRecipe(url) {
    const options = {
        url: `https://cooked.wiki/${url}`,
        bypassCors: true,
        mainSelector: "#recipe-content",
        childrenSelector: [
            { key: "ingredients", selector: ".ingredients", type: "text"},
            { key: "steps", selector: ".steps", type: "text"}
        ]
    };

    console.log(options);

    const data = await scrapeHtmlWeb(options);
    console.log(data);
    //
    // (async () => {
    //     const data = await scrapeHtmlWeb(options);
    //     console.log(data);
    // })();
}