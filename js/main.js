    let gameDetails = document.getElementById("gamedes")
let mypage = document.getElementById("mypage")
let searchInbut = document.querySelector('#searchKey')
let list = Array.from(document.querySelectorAll(".nav-link"))
let myList = []


let cate = "mmorpg"
let pageSize = 16
let totalPages
let currentPage = 1;


let btn1 = document.querySelector('#x1')
let btn2 = document.querySelector('#x2')



console.log(list);
list.forEach(ele => {
    ele.addEventListener("click", function () {
        list.forEach(ele => {
            ele.classList.remove("active")
        })
        cate = this.getAttribute("cate");
        currentPage = 1
        btn1.classList.replace('d-inline', 'd-none')

        this.classList.add("active")
        getGame(cate, currentPage)
    })
})


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4acf3ba50bmsh9a2ee31538f4bd2p11af91jsn5491a039c04b',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};
async function getGame(categ, page) {
    let res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categ}`, options)
    let data = await res.json()
    myList = data
    totalPages = Math.ceil(data.length / pageSize)

    if (totalPages == 1) {
        btn2.classList.replace('d-inline', 'd-none')

    } else if (currentPage == totalPages) {
        btn2.classList.replace('d-inline', 'd-none')

    } else {
        btn2.classList.replace('d-none', 'd-inline')

    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageItems = data.slice(startIndex, endIndex);
    displayData(pageItems)

}

searchInbut.addEventListener("keyup", () => {
    
    let searchKey=searchInbut.value.toLowerCase()
    let mysearch = myList.filter((ele) => {
        return ele.title.toLowerCase().includes(searchKey)
    })

    if (searchInbut.value.length > 0) {
        btn1.classList.replace('d-inline', 'd-none')
        btn2.classList.replace('d-inline', 'd-none')
        } else {
            getGame(cate, currentPage)
        }
    displayData(mysearch)
})


function startVideo(event) {
    const videoEl = event.target.querySelector("video"); // card ---> video
    videoEl.classList.remove("d-none");
    videoEl.muted = true;
    videoEl.play();
}

function stopVideo(event) {
    const videoEl = event.target.querySelector("video");
    videoEl.classList.add("d-none");
    videoEl.muted = true;
    videoEl.pause();
}


function displayData(list) {
    temp = ``

    list.forEach(ele => {
        let videoPath = ele.thumbnail.replace("thumbnail.jpg", "videoplayback.webm")
        temp += `<div class="col-xl-3 mx-auto col-lg-4   col-md-6 col-8 mycard" gameID="${ele.id}" onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)">
                    <div class="item wow bounceIn border bg-white shadow  p-2 rounded-4">
                        <div class="pb-3 position-relative">
                            <img src="${ele.thumbnail}" class="w-100 h-50" alt="">
                            <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                            <source src="${videoPath}?">
                        </video>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6 class="text-truncate text-dark">${ele.title.split(' ').slice(0,3).join(" ")}</h6>
                        </div>
                        <div>
                            <span class="btn btn-outline-dark btn-sm">free</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-muted text-truncate">${ele.short_description}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                    <div>
                        <span class="btn btn-sm btn-outline-dark">${ele.genre}</span>
                    </div>
                    <div>
                        <span class="btn btn-sm btn-outline-dark">${ele.platform}</span>
                    </div>
                  </div>
              </div>
            </div>
    `
    })

    document.getElementById("myRow").innerHTML = temp
    let cards = Array.from(document.querySelectorAll(".mycard"))
    mody(cards)
}

getGame(cate, currentPage)


function mody(cards) {
    cards.forEach(ele => {
        ele.addEventListener("click", function () {
            let gameID = this.getAttribute("gameID")
            // console.log(gameId);
            getgamedata(gameID)
            mypage.classList.add("d-none")
            gameDetails.classList.replace("d-none", "d-flex")
        })
    })
}

async function getgamedata(gameID) {
    let res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`, options)
    let data = await res.json()
    console.log(data);
    displayGameData(data)
}
function displayGameData(data) {
    let temp = `

    <img src="${data.screenshots[0].image}" class="card-img w-100 h-100" alt="...">
    <div class="card-img-overlay  d-flex align-items-center justify-content-center">
    <div
            class="icon fs-2 bg-secondary bg-opacity-75 rounded-circle mx-auto d-flex justify-content-center align-items-center ">
            <i class="fa-solid fa-xmark"></i>
        </div>
      <div class="col-12 col-md-10 col-lg-8 bg-opacity-75 bg-black text-white p-5">
      <h5 class="card-title fs-1 pb-4 fw-lighter">Title:${data.title}</h5>
      <p class="card-text">Category: <span class="btn btn-sm btn-info">${data.genre}</span></p>
      <p class="card-text">Platform: <span class="btn btn-sm btn-info">${data.platform}</span></p> 
      <p class="card-text">Status: <span class="btn btn-sm btn-info">${data.status}</span></p>            
      <p class="card-text">${data.description}</p>
      <a href="${data.game_url}" class="btn btn-outline-info">click</a>
      </div>
    </div>
    `
    gameDetails.innerHTML = temp
    icon = document.querySelector(".icon")
    exiet(icon)
}

function exiet(icon) {
    icon.addEventListener("click", function () {
        mypage.classList.replace("d-none", "d-block")
        gameDetails.classList.replace("d-flex", "d-none")
    })
}


//---------------page------------//


btn1.addEventListener('click', () => {
    showPreviousPage()
})
btn2.addEventListener('click', () => {
    showNextPage()
})


function showNextPage() {
    if (currentPage < totalPages) {

        currentPage++;
        console.log(totalPages);

        getGame(cate, currentPage)
        btn1.classList.replace('d-none', 'd-inline')

    }



}

function showPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        getGame(cate, currentPage)
    }

    if (currentPage + 1 == totalPages) {
        btn2.classList.replace('d-none', 'd-inline')

    }
    if (currentPage == 1) {
        btn1.classList.replace('d-inline', 'd-none')

    }
}


