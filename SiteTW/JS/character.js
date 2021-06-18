var mana_spent = 0;

class Character {
    constructor(chp, hp, mp, str, int, def) {
        this.chp = chp;
        this.hp = hp;
        this.mp = mp;
        this.str = str;
        this.int = int;
        this.def = def;
    }

    initialize() {
        document.getElementById("chp").innerHTML = this.chp;
        document.getElementById("hp").innerHTML = this.hp;
        document.getElementById("mp").innerHTML = this.mp;
        document.getElementById("str").innerHTML = this.str;
        document.getElementById("int").innerHTML = this.int;
        document.getElementById("def").innerHTML = this.def;
    }

    newGame() {
        this.chp = 100;
        this.hp = 100;
        this.mp = 50;
        this.str = 5;
        this.int = 5;
        this.def = 5;
        this.initialize();

        document.getElementById("inventory").innerHTML = "";

    }

    save() {
        var data = {
            chp: this.chp,
            hp: this.hp,
            mp: this.mp,
            str: this.str,
            int: this.int,
            def: this.def
        };

        var data_but_in_json = JSON.stringify(data);
        localStorage.setItem("gameSave", data_but_in_json);
        document.cookie = "mp = " + this.mp + ";"
    }

    load() {
        var obj = JSON.parse(localStorage.getItem("gameSave"));
        
        this.chp = obj.chp;
        this.hp = obj.hp;
        this.mp = obj.mp;
        this.str = obj.str;
        this.int = obj.int;
        this.def = obj.def;
        this.initialize();
    }

    trainHP() {

        if (this.mp > 0) {

            this.hp = this.hp + 10;
            this.chp = this.chp + 10;
            document.getElementById("chp").innerHTML = this.chp;
            document.getElementById("hp").innerHTML = this.hp;
        }
        this.spendMana();
    }

    trainSTR() {

        if (this.mp > 0) {

            this.str = this.str + 1;
            document.getElementById("str").innerHTML = this.str;
        }
        this.spendMana();
    }

    trainINT() {

        if (this.mp > 0) {

            this.int = this.int + 1;
            document.getElementById("int").innerHTML = this.int;
            document.getElementById("mp").innerHTML = this.manaIncrease();
        }
        this.spendMana();
    }

    trainDEF() {

        if (this.mp > 0) {

            this.def = this.def + 1;
            document.getElementById("def").innerHTML = this.def;
        }
        this.spendMana();
    }

    manaIncrease() {
        this.mp = this.mp + 2;
        return this.mp;
    }

    spendMana() {

        var x = document.getElementById("no_mana");

        if (this.mp === 0) {
            x.style.visibility = "visible";
        } else {
            this.mp = this.mp - 1;
            x.style.visibility = "hidden";
            document.getElementById("mp").innerHTML = this.mp;

            mana_spent = mana_spent + 1;
            document.getElementById("mana-spent").innerHTML = mana_spent;
            sessionStorage.setItem("mana_spent", mana_spent);
        }
    }

    recoverMana() {

        var x = document.getElementById("no_mana");

        this.mp = this.mp + 5;
        x.style.visibility = "hidden";
        document.getElementById("mp").innerHTML = this.mp;
        fCanvas();
    }

    addItemStats() {

        fCanvas();

        let item = addItem();

        var hp = parseInt(item.hp);
        var mp = parseInt(item.mp);
        var str = parseInt(item.str);
        var int = parseInt(item.int);
        var def = parseInt(item.def);


        this.chp = this.chp + hp;
        this.hp = this.hp + hp;
        this.mp = this.mp + mp;
        this.str = this.str + str;
        this.int = this.int + int;
        this.def = this.def + def;

        this.initialize();

    }

}

let charac = new Character();

$(window).on('load', function () {
    try {
        charac.load();
    }
    catch (err) {
        charac.newGame();
    }

    if (sessionStorage.getItem('mana_spent')) {
        document.getElementById("mana-spent").innerHTML = sessionStorage.getItem('mana_spent');
        mana_spent = parseInt(sessionStorage.getItem('mana_spent'));
        console.log(mana_spent);
    }
    else {
        document.getElementById("mana-spent").innerHTML = mana_spent;
        console.log(mana_spent);
    }

});