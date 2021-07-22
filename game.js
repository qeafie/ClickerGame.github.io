const MULTIPLIIER = 1.15;
let counter = 0;
let autoClick = 0;
let counterElem = document.querySelector("#counter");

let saveBut = document.querySelector('#saveBut');
let loadBut = document.querySelector('#loadBut');
let resetBut = document.querySelector('#resetBut');

let buySupportBut = document.querySelector('#buySupportBut');
let buyShopBut = document.querySelector('#buyShopBut');
let buyBankBut = document.querySelector('#buyBankBut');
let buyOilBut = document.querySelector('#buyOilBut');

let silverUpgrade = document.querySelector('#silverCoin');
const SILVER_COIN_COST = 1000000;
let goldUpgrade = document.querySelector('#goldCoin');
const GOLD_COIN_COST = 1000000000;
let coinIsSilver = 0;
let coinIsGold = 0;

let audioBuyUpdate = new Audio('audio/buy_update.mp3');
let audioWrongBuyUpdate = new Audio('audio/wrong.mp3');
let audioCoin = new Audio('audio/money_sound.mp3');


class Upgrade {
    constructor(options) {
        this.BASE_COST = options.BASE_COST;
        this.quantity = 0;
        this.perClick = options.perClick;
    }
    price(){
        return this.BASE_COST * (MULTIPLIIER**this.quantity);
    }

    getPerClick() {
        return this.perClick * (MULTIPLIIER**this.quantity);
    }
}

let support = new Upgrade(
    {
        BASE_COST: 15,
        quantity: 0,
        perClick: 0.1,
    }
)

let shop = new Upgrade(
    {
        BASE_COST: 100,
        quantity: 0,
        perClick: 1,
    }
)

let bank = new Upgrade(
    {
        BASE_COST: 1100,
        quantity: 0,
        perClick: 8,
    }
)

let oil = new Upgrade(
    {
        BASE_COST: 12000,
        quantity: 0,
        perClick: 47,
    }
)



function update(){
    counterElem.innerHTML = counter.toFixed(2) + ' &#8381' ;


    document.querySelector('#support').innerHTML = support.quantity ;
    document.querySelector('#shop').innerHTML = shop.quantity ;
    document.querySelector('#bank').innerHTML = bank.quantity ;
	document.querySelector('#oil').innerHTML = oil.quantity ;

    document.querySelector('#costSupport').innerHTML = support.price().toFixed(2)  + ' &#8381';
    document.querySelector('#costShop').innerHTML = shop.price().toFixed(2)  + ' &#8381';
    document.querySelector('#costBank').innerHTML = bank.price().toFixed(2)  + ' &#8381';
	document.querySelector('#costOil').innerHTML = oil.price().toFixed (2) + ' &#8381';

    document.querySelector('#supportPerclick').innerHTML = support.getPerClick().toFixed(2);
    document.querySelector('#shopPerclick').innerHTML = shop.getPerClick().toFixed(2);
    document.querySelector('#bankPerclick').innerHTML = bank.getPerClick().toFixed(2);
    document.querySelector('#oilPerclick').innerHTML = oil.getPerClick().toFixed(2);

	document.querySelector('.score_perSecond').innerHTML = autoClick.toFixed(2)+ ' &#8381' ;
}


canvas.onclick  = function (){
    counter++;
    audioCoin.play();
    update();
}

saveBut.onclick = function () {
localStorage.setItem('counter',counter);


localStorage.setItem('quantitySupport',support.quantity);
localStorage.setItem('quantityShop',shop.quantity);
localStorage.setItem('quantityBank',bank.quantity);
localStorage.setItem('quantityOil',oil.quantity);


localStorage.setItem('perClickSupport',support.perClick);
localStorage.setItem('perClickShop',shop.perClick);
localStorage.setItem('perClickBank',bank.perClick);
localStorage.setItem('perClickOil',oil.perClick);


localStorage.setItem('coinIsSilver',coinIsSilver);
localStorage.setItem('coinIsGold',coinIsGold);

localStorage.setItem('autoClick',autoClick);
}

loadBut.onclick = function () {
    counter = +localStorage.getItem('counter');

    support.perClick = +localStorage.getItem('perClickSupport');
    shop.perClick= +localStorage.getItem('perClickShop');
    bank.perClick = +localStorage.getItem('perClickBank');
    oil.perClick = +localStorage.getItem('perClickOil');

    support.quantity = +localStorage.getItem('quantitySupport');
    shop.quantity = +localStorage.getItem('quantityShop');
    bank.quantity = +localStorage.getItem('quantityBank');
    oil.quantity = +localStorage.getItem('quantityOil');


    autoClick = +localStorage.getItem('autoClick');


    //autoClick = (support.quantity * support.perClick) + (shop.quantity  * shop.perClick) + (bank.quantity * bank.perClick)+ (oil.quantity * oil.perClick);
    // if (+localStorage.getItem('coinIsSilver')) {
    //     autoClick *= 2;
    //     coinImage.src = 'img/silver-coin-sprite.png';
    // }
    // if (+localStorage.getItem('coinIsGold')) {
    //     autoClick *= 3;
    //     coinImage.src = 'img/gold-coin-sprite.png';
    // }
    update();
}


resetBut.onclick = function () {
    counter = 0;
    autoClick = 0;
    coinImage.src = 'img/bronze-coin-sprite.png';

    support.quantity = 0;
    shop.quantity = 0;
    bank.quantity = 0;
    oil.quantity = 0;

    support.perClick = 0.1;
    shop.perClick = 1;
    bank.perClick = 8;
    oil.perClick = 47;


    coinIsSilver = 0;
    coinIsGold = 0;
    update();
}


function counterUpdate() {
    counter = counter + autoClick;
    update();
}



buySupportBut.onclick = function () {
    if (counter >= support.price()){
        counter  = counter - support.price();
        support.perClick = support.getPerClick();
        autoClick+= support.perClick;
        support.quantity++;
        audioBuyUpdate.play();
        update();
    }
    else {
        audioWrongBuyUpdate.play();
    }
}

buyShopBut.onclick = function () {
    if (counter >= shop.price()){
        counter  = counter - shop.price();
        shop.perClick = shop.getPerClick();
        autoClick += shop.perClick;
        shop.quantity++;
        audioBuyUpdate.play();
        update();
    }
    else {
        audioWrongBuyUpdate.play();
    }
}

buyBankBut.onclick = function () {
    if (counter >= bank.price()){
        counter  = counter - bank.price();
        bank.perClick = bank.getPerClick();
        autoClick+= bank.perClick;
        bank.quantity++;
        audioBuyUpdate.play();
        update();
    }
    else {
        audioWrongBuyUpdate.play();
    }
}

buyOilBut.onclick = function () {
    if (counter >= oil.price()){
        counter  = counter - oil.price();
        oil.perClick = oil.getPerClick();
        autoClick+= oil.perClick;
        oil.quantity++;
        audioBuyUpdate.play();
        update();
    }
    else {
        audioWrongBuyUpdate.play();
    }
}

silverUpgrade.onclick = function () {
    if (counter>=SILVER_COIN_COST){
        if(!coinIsSilver)
        {
            coinImage.src = 'img/silver-coin-sprite.png';
            counter = counter- SILVER_COIN_COST;
            autoClick *= 2;
            coinIsSilver = 1;
            update();
        }
        else {
            audioWrongBuyUpdate.play();
        }
    }
    else {
        audioWrongBuyUpdate.play();
    }
}


goldUpgrade.onclick = function () {
    if (counter>=GOLD_COIN_COST){
        if(!coinIsGold)
        {
            coinImage.src = 'img/gold-coin-sprite.png';
            counter = counter- GOLD_COIN_COST;
            autoClick *= 3;
            coinIsGold = 1;
            update();
        }
        else {
            audioWrongBuyUpdate.play();
        }
    }
    else {
        audioWrongBuyUpdate.play();
    }
}

setInterval(counterUpdate,1000);