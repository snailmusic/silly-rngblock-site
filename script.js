let data = {}
let elements = {
    "normal": [],
    "antique": [],
    "amt": undefined,
}
let version = "3"
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
    data.clickamt += 1
    check(0)
}

function check(i) {
    var idx = Math.min(i, names.length - 1)
    if (Math.random() > 0.5) {
        data.normal[idx] += 1
        if (Math.random() < 0.01) {
            data.antique[idx] += 1
        }
        update_text(idx)
    }
    else {
        check(idx + 1)
    }
}

function init_data() {
    if (localStorage.getItem("version") == undefined) {
        let normaldata = []
        let antiquedata = []
        for (let index = 0; index < names.length; index++) {
            normaldata[index] = 0
            antiquedata[index] = 0
        }
        data["normal"] = normaldata
        data["antique"] = antiquedata
        data["clickamt"] = 0

        save_data()
    }
    else {
        init_localstorage()
    }
}

function init_localstorage() {
    data = JSON.parse(localStorage.getItem("data"))
    if (localStorage.getItem("version") != version) {
        migrate_versions(localStorage.getItem("version"))
        return
    }
}

function migrate_versions(versionfrom) {
    switch (versionfrom) {
        case "2":
            let sum = 0
            data.normal.forEach(val => {
                sum += val
            });
            data.clickamt = sum
            save_data()
            break;
        default:
            localStorage.clear()
            break;
    }
}

function set_shits_up() {
    init_data()
    let footer = document.getElementById("footer")
    footer.innerText = `version: ${version}
    made by snail inspired by zedneon's level silly rngblock level id 100950762`
    elements.amt = document.createElement("div")
    elements.amt.innerText = `clicks: ${data.clickamt}`
    footer.appendChild(elements.amt)
    let body = document.getElementById("main")
    for (let index = 0; index < names.length; index++) {
        const element = names[index];
        
        let container = document.createElement("tr")
        container.className = "namecontainer"

        let name = document.createElement("td")
        name.innerText = `${element}`
        name.className = "rarity"
        name.id = element

        let number = document.createElement("td")
        number.innerText = data.normal[index]

        let antique = document.createElement("td")
        antique.innerText = data.antique[index]
        antique.className = "antique"

        let nrarity = document.createElement("td")
        nrarity.innerText = `1/${Math.pow(2, index + 1)}`
        let ararity = document.createElement("td")
        ararity.innerText = `1/${Math.pow(2, index + 1) * 100}`


        elements.normal.push(number)
        elements.antique.push(antique)

        container.appendChild(name)
        container.appendChild(number)
        container.appendChild(antique)
        container.appendChild(nrarity)
        container.appendChild(ararity)
        body.appendChild(container)
    }
    
}

function update_text(idx) {
    // console.log(data);
    
    elements.normal[idx].innerText = data.normal[idx]
    elements.antique[idx].innerText = data.antique[idx]
    elements.amt.innerText = `clicks: ${data.clickamt}`
    save_data()
}

function save_data() {
    localStorage.setItem("data", JSON.stringify(data))
    localStorage.setItem("version", version)
}

function reset() {
    localStorage.clear()
    data = {}
    init_data()

    for (let idx = 0; idx < names.length; idx++) {
        update_text(idx)        
    }
}