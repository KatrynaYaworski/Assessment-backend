const complimentAlertBtn = document.getElementById("complimentAlertButton")
const fortuneAlertBtn = document.getElementById("fortuneAlertButton")
const motivationalQuoteAlertBtn = document.querySelector('#MotivationAlertButton')

const inputQuote = document.getElementById("quote-input")
const quoteContainer = document.querySelector('.quote-container')
const submitForm = document.querySelector('form')

submitForm.addEventListener('submit', addMotivationQuote)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const getMotivation = () => {
    axios.get("http://localhost:4000/api/motivation/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

function addMotivationQuote (event) {
    event.preventDefault()
    axios.post("http://localhost:4000/api/motivation/", {quote: inputQuote.value})
        .then(displayQuotes).catch((error) => console.error('Error with adding a quote'))
    inputQuote.value = ''
};

function deleteQuote (id) {
    axios.delete(`http://localhost:4000/api/motivation/${id}`)
    .then(displayQuotes).catch((error) => console.error('Error with deleting a quote'))
}

  function handleReactionClick (id, type) {
    axios.put(`http://localhost:4000/api/motivation/${id}/${type}`)
    .then(displayQuotes).catch((error) => console.error('Error with handling a reaction click'))
  }


function displayQuotes(res) {
    const data = res.data
    quoteContainer.textContent = ''
    data.forEach(element => {
        let quoteItem = document.createElement('li')
        let deleteButton = document.createElement('button')
        let quoteAndButtonContainer = document.createElement('div')
        let likeButton = document.createElement('button')
        likeButton.className = 'like-button'
        let dislikeButton = document.createElement('button')
        dislikeButton.className = 'dislike-button'
        dislikeButton.textContent = 'dislike'
        likeButton.textContent = 'like'
        deleteButton.textContent = 'X'
        deleteButton.style.color = 'red'
        deleteButton.className = 'delete-btn'
        quoteItem.textContent = element.quote
        let reactionsum = document.createElement('span')
        reactionsum.textContent = element.likes
        quoteItem.append(dislikeButton, reactionsum, likeButton)
        quoteAndButtonContainer.className = 'quote-and-button-container'
        quoteContainer.appendChild(quoteAndButtonContainer)
        quoteAndButtonContainer.appendChild(deleteButton)
        quoteAndButtonContainer.appendChild(quoteItem)
        deleteButton.addEventListener('click', ()=> deleteQuote(element.id))
        likeButton.addEventListener('click', ()=> handleReactionClick(element.id, 'like'))
        dislikeButton.addEventListener('click', ()=> handleReactionClick(element.id, 'dislike'))
    });
    
    
}
complimentAlertBtn.addEventListener('click', getCompliment)
fortuneAlertBtn.addEventListener('click', getFortune)
motivationalQuoteAlertBtn.addEventListener('click', getMotivation)