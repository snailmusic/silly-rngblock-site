let data = []
let elements = []
let names = [
    "Passive",
    "Common",
    "Basic",
    "Uncommon",
    "Rare",
    "Great",
    "Epic",
    "Insane",
    "Fantastic",
    "Legendary",
    "Exotic",
    "Shiny",
    "Sparkling",
    "Cataclysmic",
    "Universal",
    "Silent",
    "Tarsorado",
    "Impossible",
    "Darkness",
    "Epiphany",
    "Ascendance",
    "Godlike",
    "Astronomical",
    "Unbelievable",
    "Prodigious",
    "Monumental",
    "Inconceivable"
]

function roll() {
    check(0)
}

function check(i) {
    var idx = Math.min(i, names.length - 1)
    if (Math.random() > 0.5) {
        data[idx] += 1
        update_text(idx)
    }
    else {
        check(idx + 1)
    }
}

function set_shits_up() {
    if (JSON.parse(localStorage.getItem("data")) != undefined){
        data = JSON.parse(localStorage.getItem("data"))
    }
    for (let index = 0; index < names.length; index++) {
        const element = names[index];
        
        let container = document.createElement("div")
        container.className = "namecontainer"

        let name = document.createElement("span")
        name.innerText = `${element}:`

        let number = document.createElement("span")
        if (data[index] != undefined) {
            number.innerText = data[index]
        }
        else {
            data[index] = 0
            number.innerText = 0
        }
        elements.push(number)

        container.appendChild(name)
        container.appendChild(number)
        document.body.appendChild(container)
    }
    
}

function update_text(idx) {
    console.log(data);
    
    elements[idx].innerText = data[idx]
    localStorage.setItem("data", JSON.stringify(data))
}

