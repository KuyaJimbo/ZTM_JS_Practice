const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
    
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
    
}

// Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Math.random() returns a random number between 0 (inclusive),  and 1 (exclusive)

    // Check Quote Length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    // (textContent accesses the text of the element)
    
    // Add the Quote:
    quoteText.textContent = quote.text;
    
    // If Author is blank, add 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        // Remove ", type.fit" from author
        const comma = quote.author.indexOf(',');
        const name = quote.author.slice(0, comma);
        // Add the Author:
        authorText.textContent = name;
    }
    complete();    
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    
    // Open a new tab
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

