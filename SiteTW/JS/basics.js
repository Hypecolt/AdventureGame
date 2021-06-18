var score = 0;

var monsters = [
    '/images/bigaxeguy.png',
    '/images/goblin.png',
    '/images/golem.png',
    '/images/mummy.png',
    '/images/zombie.png'
]

let items = [];

function readXML() {
    parser = new DOMParser();
    var file = "/items_mobs/items.xml";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                xmlDoc = parser.parseFromString(allText, "text/xml");
                var sword = xmlDoc.getElementsByTagName("sword");
                var armor = xmlDoc.getElementsByTagName("armor");
                var legs = xmlDoc.getElementsByTagName("legs");
                var helmet = xmlDoc.getElementsByTagName("helmet");
                var boots = xmlDoc.getElementsByTagName("boots");
                var shield = xmlDoc.getElementsByTagName("shield");
                itemJSONformat(sword);
                itemJSONformat(armor);
                itemJSONformat(legs);
                itemJSONformat(helmet);
                itemJSONformat(boots);
                itemJSONformat(shield);
                return items;
            }
        }
    }
    rawFile.send(null);
}

function itemJSONformat(item) {
    var i;
    var itm;

    for (i = 0; i < item.length; i++) {
        itm = {
            "name": item[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
            "hp": item[i].getElementsByTagName("hp")[0].childNodes[0].nodeValue,
            "mp": item[i].getElementsByTagName("mp")[0].childNodes[0].nodeValue,
            "str": item[i].getElementsByTagName("str")[0].childNodes[0].nodeValue,
            "int": item[i].getElementsByTagName("int")[0].childNodes[0].nodeValue,
            "def": item[i].getElementsByTagName("def")[0].childNodes[0].nodeValue
        };
        items.push(itm);
    }
}

function addItem() {

    const idx = Math.floor(Math.random() * items.length) + 0;

    var name = items[idx].name;
    var hp = items[idx].hp;
    var mp = items[idx].mp;
    var str = items[idx].str;
    var int = items[idx].int;
    var def = items[idx].def;

    var data = {
        hp: hp,
        mp: mp,
        str: str,
        int: int,
        def: def
    };

    var itm = document.createElement("p");
    itm.classList.add("equipped-items");
    itm.innerHTML = name;

    var itm_desc = itm.appendChild(document.createElement("span"));
    itm_desc.classList.add("equipped-items-text");

    var name_desc = itm_desc.appendChild(document.createElement("p"));
    name_desc.innerHTML = name;
    name_desc.classList.add("item-desc");

    var hp_desc = itm_desc.appendChild(document.createElement("p"));
    hp_desc.innerHTML = "HP - " + hp;
    hp_desc.classList.add("item-desc");

    var mp_desc = itm_desc.appendChild(document.createElement("p"));
    mp_desc.innerHTML = "MP - " + mp;
    mp_desc.classList.add("item-desc");

    var str_desc = itm_desc.appendChild(document.createElement("p"));
    str_desc.innerHTML = "STR - " + str;
    str_desc.classList.add("item-desc");

    var int_desc = itm_desc.appendChild(document.createElement("p"));
    int_desc.innerHTML = "INT - " + int;
    int_desc.classList.add("item-desc");

    var def_desc = itm_desc.appendChild(document.createElement("p"));
    def_desc.innerHTML = "DEF - " + def;
    def_desc.classList.add("item-desc");

    document.getElementById("inventory").appendChild(itm);

    return data;
}

function fCanvas() {

    var randomMob = monsters[Math.floor(Math.random() * monsters.length)];
    var canvas = document.getElementById("gameScreen"),
    context = canvas.getContext("2d");

    base_image = new Image();
    base_image.src = randomMob;

    context.clearRect(50, -15, 200, 150);
    context.drawImage(base_image, 50, -15, 200, 150);
    
}

function test() {
    var itm = addItem();
    console.log(itm);
}

readXML();

$(window).on('load', function () {

    var i;
    var canvas = document.getElementById("gameScreen"),
        context = canvas.getContext("2d");

    for(i = 0 ; i < 20; i++){

        var randomMob = monsters[Math.floor(Math.random() * monsters.length)];

        base_image = new Image();
        base_image.src = randomMob;

        context.clearRect(50, -15, 200, 150);
        context.drawImage(base_image, 50, -15, 200, 150);
    }

});