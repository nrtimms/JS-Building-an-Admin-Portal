//Fetching list of books
async function main() {
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()
    books.forEach(renderBook)
}

function renderBook(book) {
    let root = document.querySelector('#root')
    //create new elements
    let li = document.createElement('li')
    li.textContent = book.title
    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity
    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'

    //update quantitiy of book when save button is clicked
    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })
    //add new elements to the div with id=root
    li.append(quantityInput, saveButton)
    root.append(li)
}

main();