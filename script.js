let data = {}
let elements = {
    "normal": [],
    "antique": [],
}
let version = "2"
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

        save_data()
    }
    else {
        init_localstorage()
    }
}

function init_localstorage() {
    if (localStorage.getItem("version") != version) {
        migrate_versions(localStorage.getItem("version"))
        return
    }
    data = JSON.parse(localStorage.getItem("data"))
}

function migrate_versions(versionfrom) {
    switch (versionfrom) {
        default:
            localStorage.clear()
            break;
    }
}

function set_shits_up() {
    let footer = document.getElementById("footer")
    footer.innerText = `version: ${version}
    made by snail inspired by zedneon's level silly rngblock level id 100950762`
    let body = document.getElementById("main")
    init_data()
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

        elements.normal.push(number)
        elements.antique.push(antique)

        container.appendChild(name)
        container.appendChild(number)
        container.appendChild(antique)
        body.appendChild(container)
    }
    
}

function update_text(idx) {
    // console.log(data);
    
    elements.normal[idx].innerText = data.normal[idx]
    elements.antique[idx].innerText = data.antique[idx]
    save_data()
}

function save_data() {
    localStorage.setItem("data", JSON.stringify(data))
    localStorage.setItem("version", version)
}