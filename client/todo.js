let listContainer = document.querySelector('.list-container')
let submitForm = document.querySelector('form')
let inputAction = document.querySelector('input')
let clearBtn = document.querySelector('.clear-list')

submitForm.addEventListener('submit', addAction)
clearBtn.addEventListener('click', clearList)

const getList = () =>{
    axios.get('http://localhost:4000/api/list')
    .then(displayList).catch((error)=> console.log(`Error with retrieving the list`))
}

function addAction (event) {
    event.preventDefault()
    axios.post('http://localhost:4000/api/list', {action: inputAction.value})
    .then(displayList).catch((error)=> alert('Youre doing too much!'))
    inputAction.value = ""
}


function toggleCompleteAction (id) {
    axios.put(`http://localhost:4000/api/list/${id}`)
    .then(displayList).catch((error)=> console.log(`Error with toggling an action`))
}

function clearList (res) {
    axios.delete(`http://localhost:4000/api/list/`)
    .then(displayList).catch((error)=> console.log(`Error with clearing list`))
}

function deleteAction (id) {
    axios.delete(`http://localhost:4000/api/list/?id=${id}`)
    .then(displayList).catch((error)=> console.log(`Error with deleting an item`, error))
}

function displayList (res) {
    const data = res.data
    listContainer.textContent = ''
    data.forEach(element => {
        let listBtnAndItemContainer = document.createElement('div')
        let listItem = document.createElement('li')
        let listButton = document.createElement('button')
        listItem.textContent = element.action
        listButton.textContent = 'X'
        listContainer.appendChild(listBtnAndItemContainer).appendChild(listButton)
        listBtnAndItemContainer.appendChild(listItem)
        listBtnAndItemContainer.className = 'list-button-and-item-container'
        listItem.addEventListener('click', ()=> toggleCompleteAction(element.id))
        listButton.addEventListener('click', ()=> deleteAction(element.id))
        if(element.isCompleted){
            listItem.style.textDecoration = 'line-through'
        }
    });
    
}

getList()