// html element
const html = {
    ctaQuote: () => document.querySelector(".cta--quote"),
    quoteEl: () => document.querySelector(".quote"),
    loader: () => document.querySelector(".loader"),
}

// quote Model
class Quote {
    text = null;
    author = null;

    async getNew() {
        const apiURL = "https://type.fit/api/quotes";

        // get random quote
        const responseData = await fetch(apiURL).then(resp => resp.json());
        const {text, author} = responseData[Math.floor(Math.random() * responseData.length)]

        this.text = text;
        this.author = author;
    }
}

const addText = (el, text) => el.textContent = text;

const loading = (loaderEl, otherEl, isLoading) => {
    const loadingMap = {
        true: () => {
            loaderEl.style.display = "block";
            otherEl.style.display = "none";
        },
        false: () => {
            loaderEl.style.display = "none";
            otherEl.style.display = "block";
        }
    }

    loadingMap[isLoading]();
}

const loadingQuote = loading.bind(null, html.loader(), html.quoteEl());

const ctaQuoteClickHandler = async () => {
    // render loader
    loadingQuote(true)

    // get new quote from API
    const quote = new Quote();
    await quote.getNew();

    // hide loader
    loadingQuote(false);

    // render quote
    addText(html.quoteEl().querySelector(".quote__text"), `\"${quote.text}\"`);
    addText(html.quoteEl().querySelector(".quote__author"), quote.author);
}

html.ctaQuote().addEventListener("click", ctaQuoteClickHandler)

































