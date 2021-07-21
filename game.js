const MULTIPLIIER = 1.07;
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
let coinIsSilver = false;
let coinIsGold = false;

class Upgrade {
    constructor(options) {
        this.BASE_COST = options.BASE_COST;
        this.quantity = 0;
        this.perClick = options.perClick;
    }
    price(){
        return this.BASE_COST * (MULTIPLIIER**this.quantity);
    }
}

let support = new Upgrade(
    {
        BASE_COST: 50,
        quantity: 0,
        perClick: 1,
    }
)

let shop = new Upgrade(
    {
        BASE_COST: 1000,
        quantity: 0,
        perClick: 5,
    }
)

let bank = new Upgrade(
    {
        BASE_COST: 5000,
        quantity: 0,
        perClick: 10,
    }
)

let oil = new Upgrade(
    {
        BASE_COST: 10000,
        quantity: 0,
        perClick: 25,
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
	
	document.querySelector('.score_perSecond').innerHTML = autoClick.toFixed(0)+ ' &#8381' ;
}


canvas.onclick  = function (){
    counter++;
    update();
}

saveBut.onclick = function () {
localStorage.setItem('counter',counter);


localStorage.setItem('quantitySupport',support.quantity);
localStorage.setItem('quantityShop',shop.quantity);
localStorage.setItem('quantityBank',bank.quantity);
localStorage.setItem('quantityOil',oil.quantity);

localStorage.setItem('coinIsSilver',coinIsSilver);
localStorage.setItem('coinIsGold',coinIsGold);

}

loadBut.onclick = function () {
    counter = +localStorage.getItem('counter');

    support.quantity = +localStorage.getItem('quantitySupport');
    shop.quantity = +localStorage.getItem('quantityShop');
    bank.quantity = +localStorage.getItem('quantityBank');
    oil.quantity = +localStorage.getItem('quantityOil');



    autoClick = (support.quantity * support.perClick) + (shop.quantity  * shop.perClick) + (bank.quantity * bank.perClick)+ (oil.quantity * oil.perClick);
    if (localStorage.getItem('coinIsSilver')) {
        autoClick *= 2;
        coinImage.src = 'img/silver-coin-sprite.png';
    }
    if (localStorage.getItem('coinIsGold')) {
        autoClick *= 3;
        coinImage.src = 'img/gold-coin-sprite.png';
    }
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

    coinIsSilver = false;
    coinIsGold = false;
    update();
}


function counterUpdate() {
    counter = counter + autoClick;
    update();
}



buySupportBut.onclick = function () {
    if (counter >= support.price()){
        counter  = counter - support.price();
        autoClick+= support.perClick;
        support.quantity++;
        update();
    }
}

buyShopBut.onclick = function () {
    if (counter >= shop.price()){
        counter  = counter - shop.price();
        autoClick += shop.perClick;
        shop.quantity++;
        update();
    }
}

buyBankBut.onclick = function () {
    if (counter >= bank.price()){
        counter  = counter - bank.price();
        autoClick+= bank.perClick;
        bank.quantity++;
        update();
    }
}

buyOilBut.onclick = function () {
    if (counter >= oil.price()){
        counter  = counter - oil.price();
        autoClick+= oil.perClick;
        oil.quantity++;
        update();
    }
}

silverUpgrade.onclick = function () {
    if (counter>=SILVER_COIN_COST){
        if(!coinIsSilver)
        {
            coinImage.src = 'img/silver-coin-sprite.png';
            counter = counter- SILVER_COIN_COST;
            autoClick *= 2;
            coinIsSilver = true;
            update();
        }
    }
}


goldUpgrade.onclick = function () {
    if (counter>=GOLD_COIN_COST){
        if(!coinIsGold)
        {
            coinImage.src = 'img/gold-coin-sprite.png';
            counter = counter- GOLD_COIN_COST;
            autoClick *= 3;
            coinIsGold = true;
            update();
        }
    }
}

setInterval(counterUpdate,1000);