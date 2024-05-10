// window.console.log("testing"); all js happen in the window. not needed.

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];
// get quotes from api

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check author exsists
  if (!quote.author) {
    authorText.textContent = 'unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // check quote length
  if (quote.text > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.text;
}

async function getQuotes() {
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const reponse = await fetch(apiURL);
    apiQuotes = await reponse.json();
    newQuote();
  } catch (error) {
    // catch error here
  }
}

// tweet quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}


// event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();
