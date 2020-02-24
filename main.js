//-----Data Retrieval
let data;

fetch('https://api.myjson.com/bins/zyv02')
    .then((response) => response.json()).then(books => {
        data = books.books;
        createBookList("")

        document.getElementById('search').addEventListener('input', function () {
            let searchInput = document.getElementById('search').value
            console.log(searchInput)
            createBookList(searchInput)
        })
    })

function titleContainsString(title, searchInput) {
    return title.toLowerCase().includes(searchInput.toLowerCase());
}

//-----Bookshelf
function createBookList(searchInput) {
    var booklist = document.getElementById('booklist')
    booklist.innerHTML = "";

    var newBookList = data;

    if (searchInput !== "") {
        newBookList = data.filter(book => titleContainsString(book.title, searchInput))
    }

    newBookList.forEach(book => createBookList(book))

    for (const book of newBookList) {
        var flipcard = document.createElement('div')
        flipcard.setAttribute('class', 'flip-card row justify-content-md-center col-sm-3')

        var flipcardInner = document.createElement('div')
        flipcardInner.setAttribute('class', 'flip-card-inner')

        var flipcardFront = document.createElement('div')
        flipcardFront.setAttribute('class', 'flip-card-front')

        var bookImage = document.createElement('img')
        bookImage.setAttribute('src', book.cover)
        bookImage.setAttribute('class', 'img')

        var flipcardBack = document.createElement('div')
        flipcardBack.setAttribute('class', 'flip-card-back')

        var description = document.createElement('p')
        description.setAttribute('class', 'description')
        description.innerHTML = book.description

        var button = document.createElement('button')
        button.setAttribute('id', 'button')
        button.innerHTML = 'More Info'
        button.setAttribute('value', book.detail)
        button.addEventListener('click', (event) => getDetail(event))

        flipcardFront.appendChild(bookImage)
        flipcardInner.appendChild(flipcardFront)
        flipcardInner.appendChild(flipcardBack)
        flipcard.appendChild(flipcardInner)
        booklist.appendChild(flipcard)
        flipcardBack.appendChild(description)
        description.appendChild(button)
    }
}

//-----Get Details (Modal Display)
function getDetail(event) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    modal.style.display = "block"; //Refers to the fullscreen
    console.log(event.target.value)
    //Retrieves the value of the input it was called on
    modalImg.setAttribute('src', event.target.value)
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
}