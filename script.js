
let vvod = document.querySelector('.vvod')             // ввод названия фильма

let btn = document.getElementById('btn')               // кнопка Найти

let poster = document.querySelector('.poster')         // обёртка постеров

let imgOld = document.getElementsByTagName('img')      // предыдущие постеры

let info = document.getElementsByClassName('info')[0]  // вывод результата


// очищение предыдущего
function clean() {
    // очищение описания
    info.innerHTML = ''

    // удаление предыдущих постеров
    for (let elem of imgOld) {
        elem.remove();
    }
}

// слушатель события click на кнопку Найти
btn.addEventListener('click', function() {
    if (vvod.value) {
        console.log("Введено название фильма: ", vvod.value)
        seek(vvod.value)
    }
    else {
        clean()
        console.log("НЕ Введено название фильма!")
        info.innerHTML = "НЕ Введено название фильма!"
    }
})


// показ результата на экране
function renderInfo(data) {
    clean()

    // вывод описания фильма
    for (let key in data) {
        info.innerHTML += `${key}: ${data[key]}<br>`

        // if (key == "Ratings") {
        //     console.log(data[key]);
        //     for (let key2 in data[key]) {
        //         info.innerHTML += ` ${key2}: ${data[key]}${[key2]}<br>`
        //         console.log( `911 ${key2}: ${data[key]}${[key2]}<br>`)
        //     }
        // }
    }
    
    // вывод постера
    img = document.createElement("IMG")
    // img.src = "https://m.media-amazon.com/images/M/MV5BYTU1ZTI0YjUtZGRlMS00MDU1LWFmZmItZWRiYTg5NTExMmRjXkEyXkFqcGdeQXVyMTUzMDg3MTQw._V1_SX300.jpg"
    let p = data["Poster"] // адрес постера
    img.src = `${p}`
    img.alt = 'Здесь должен быть постер, но его нет ('
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