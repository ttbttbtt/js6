// ввод названия фильма
let vvod = document.querySelector('.vvod')


// кнопка Найти
let btn = document.getElementById('btn')


// вывод результата
let info = document.getElementsByClassName('info')[0]


// постер
let poster = document.querySelector('.poster')


// слушатель события click на кнопку Найти
btn.addEventListener('click', function() {
    if (vvod.value) {
        console.log("Введено название фильма: ", vvod.value)
        seek(vvod.value)
    }
    else {
        console.log("НЕ Введено название фильма!")
        info.innerHTML = "НЕ Введено название фильма!"
    }
})


// показ результата на экране
function renderInfo(data) {
    info.innerHTML = ''

    for (let key in data) {
        info.innerHTML += `${key}: ${data[key]}<br>`
    }

    let p = data["Poster"] // адрес постера

    let imgOld = document.getElementsByTagName('img')

    for (let elem of imgOld) {
            elem.remove();
    }

    img = document.createElement("IMG")
    // img.src = "https://m.media-amazon.com/images/M/MV5BYTU1ZTI0YjUtZGRlMS00MDU1LWFmZmItZWRiYTg5NTExMmRjXkEyXkFqcGdeQXVyMTUzMDg3MTQw._V1_SX300.jpg"
    img.src = `${p}`
    poster.appendChild(img)

}


// родительская функция поиска
async function seek(vv) {
    try {
        const data = await sendRequest(vv)
        renderInfo(data)
        console.log("Результат поиска: ", data)
        return data
    }
    catch(err){
        throw err
    }
}


// функция поиска на OMDB API (80437e5b)
async function sendRequest(vv) {
    url = `https://www.omdbapi.com/?apikey=80437e5b&t=${vv}`

    let response = await fetch(url)
    response = await response.json()
    return response
}