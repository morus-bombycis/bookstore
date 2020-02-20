//-----Data Retrieval
let data;

fetch('https://api.myjson.com/bins/zyv02')
.then((response) => response.json())
.then(books => {
    data = books.books;
    // createBookList("")
    console.log("test")

    document.getElementById('search').addEventListener('input', function() {
        let searchInput = document.getElementById('search').value
        console.log(searchInput)
        // console.log("test");
        createBookList(searchInput)
    })
})

// fetchUserData().then(books => {
//     data = books.books;
//     createBookList("")
//     document.getElementById('search').addEventListener('input', function() {
//         let searchInput = document.getElementById('search').value
//         console.log(searchInput)
//         // console.log("test");
//         createBookList(searchInput)
//     })

// })


//-----Bookshelf
function createBookList(searchInput) {
    var booklist = document.getElementById('booklist')
    booklist.innerHTML = "";

    let newBookList = [];

    if (searchInput === "") {
        newBookList = data;
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.includes(searchInput)) {
                console.log("book match " + data[i].title)
                newBookList.push(data[i])
            }
        }
    }

    for(var i = 0; newBookList.length; i++){
    var flipcard = document.createElement('div')
    flipcard.setAttribute('class', 'flip-card row justify-content-md-center col-sm-3')

    var flipcardInner = document.createElement('div')
    flipcardInner.setAttribute('class', 'flip-card-inner')

    var flipcardFront = document.createElement('div')
    flipcardFront.setAttribute('class', 'flip-card-front')

    var bookImage = document.createElement('img')
    bookImage.setAttribute('src', newBookList[i].cover)
    bookImage.setAttribute('class', 'img')

    var flipcardBack = document.createElement('div')
    flipcardBack.setAttribute('class', 'flip-card-back')

    var description = document.createElement('p')
    description.setAttribute('class', 'description')
    description.innerHTML = newBookList[i].description

    var button = document.createElement('button')
    button.setAttribute('id', 'button')
    button.innerHTML = 'More Info'
    button.setAttribute('value', newBookList[i].detail)
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
    span.onclick = function() { 
        modal.style.display = "none";
    }
}

//-----Search Engine
// function searchBook() {
//     var searchInput = document.getElementById('search').value.toLowerCase();
//     console.log(searchInput)
// }



// function filter() {
//     let searchResult = []
//     let searchedTitle = searchBook()
//     let titles = booksData[i].title

//     for(var i = 0; booksData.length; i++){
//         if(titles.includes(searchedTitle)){
//             searchResult.push(titles)
//         }
//     }
//     console.log(searchResult)
//     createBookList(searchResult)
// }

//     var input = document.getElementById('search');
//     var filterValue = input.value().toUpperCase();
//     ul = document.getElementById('bookslist');
//     li = document.getElementsByTagName('booksData')

//     for(var i = 0; i < booksData.length; i++) {
//         var description = booksData[i].getElementsByClassName('description')[0];
//         if(description.innerHTML.toLowerCase().indexOf(filterValue) > -1) {
//             li[i].style.display = "";
//         }else{
//             li[i].style.display = "none";
//         }
//     }

// }

