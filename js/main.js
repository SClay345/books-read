document.querySelector('button').addEventListener('click', getFetch)
window.onload = displayStored()

function displayStored(){
let booksStorage = localStorage.getItem('books')
let isbnStorage = localStorage.getItem('isbn')
bookArr = booksStorage.split(";")
        console.log(bookArr)
        isbnArr = isbnStorage.split(';')
        console.log(isbnArr)
        bookArr.forEach(obj => {
          const h2 = document.createElement('h2')
          const img = document.createElement('img')
          h2.textContent = obj
          let index =bookArr.indexOf(obj)
          
          img.src = `https://covers.openlibrary.org/b/isbn/${isbnArr[index]}-L.jpg`
          document.querySelector('section').appendChild(h2)
          document.querySelector('section').appendChild(img)
        
        })
}
if(localStorage.getItem('pages')){
document.querySelector('h3').innerHTML = 'Pages Read: ' + localStorage.getItem('pages')
}

function getFetch(){
  const choice = document.querySelector('input').value
  
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if(!data.error){
          if(!localStorage.getItem('books')){
            localStorage.setItem('books' , data.title)
            localStorage.setItem('pages', Number(data.number_of_pages))
            localStorage.setItem('isbn', choice)
          } else {
            
            let books = localStorage.getItem('books') + ";" + data.title 
            let newPages = parseInt(localStorage.getItem('pages')) + Number(data.number_of_pages)
            let newIsbn = localStorage.getItem('isbn') + ";" + choice
            localStorage.setItem('books', books)
            localStorage.setItem('pages', newPages)
            localStorage.setItem('isbn', newIsbn)
          }
      
        
       
       // document.querySelector('h2').innerHTML = localStorage.getItem('books')
        document.querySelector('h3').innerHTML = 'Pages Read: ' + localStorage.getItem('pages')
        location.reload()
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

