// $('.search-button').on('click' , function(){

//     $.ajax({
//         url:'http://www.omdbapi.com/?apikey=dca61bcc&s=' + $('.input-keyword').val(),
//         success: results => {
//             const movies = results.Search;
//             let cards ='';
//             movies.forEach(m => {
//                 cards += showCard(m);
//             });
//             $('.movie-container').html(cards)
    
    
//             $('.modal-detail-btn').on('click' , function(){
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=dca61bcc&i=' + $(this).data('imdbid'),
//                     success: m => {
//                         const movieDetail = showMovieDetails(m);
//                         $('.modal-body').html(movieDetail)
//                     },
//                     error: (e) => {
//                         console.log(e.responseText)
//                     }
//                 })
//             })
//         } , 
//         error: (e) => {
//             console.log(e.responseText)
//         }
//     });

// })

// fetch
const searchBtn = document.querySelector('.search-button')
searchBtn.addEventListener("click" , function(){
    const inputKeyword = document.querySelector(".input-keyword")
    fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + inputKeyword.value)
    .then(response => response.json())
    .then(response => {
        const movies = response.Search
        let cards = ""
        movies.forEach(m => cards += showCard(m))
        const movieContainer = document.querySelector('.movie-container')
        movieContainer.innerHTML = cards


        //ketika tombol detail di-klik
        const modalDetailBtn = document.querySelectorAll(".modal-detail-btn")
        modalDetailBtn.forEach(btn => {
            btn.addEventListener("click" , function(){
                const imdbid = this.dataset.imdbid
                fetch('http://www.omdbapi.com/?apikey=dca61bcc&i=' + imdbid)
                .then(response => response.json())
                .then(m => {
                    const movieDetail = showMovieDetails(m)
                    const modalBody = document.querySelector(".modal-body")
                    modalBody.innerHTML = movieDetail

                })
            })
        })
    })
})

function showCard(m){
    return `
    <div class="col-md-4 my-3">
        <div class="card">
            <img src="${m.Poster}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary modal-detail-btn" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show details</a>
            </div>
        </div>
    </div>
`
}

function showMovieDetails(m){
    return `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <img src="${m.Poster}" alt="" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
                    <li class="list-group-item"><strong>Director: </strong> ${m.Director}</li>
                    <li class="list-group-item"><strong>Actors</strong> ${m.Actors}</li>
                    <li class="list-group-item"><Strong>Writer: </Strong> ${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot: </strong> ${m.Plot}</li>
                </ul>
            </div>
        </div>
    </div>

`
}
