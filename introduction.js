function sum (x, y) {
    return x + y; 
}
// Nuolifunktion => oikeanpuoleisessa ei tarvitse erikseen määritellä returnia
(x, y) => {
    x + y;
}

// yksi parametri ei tarvitse sulkuja
x => x /10; 

// ilman parametreja 
() => 2+100;

// takaisinkutsu- eli callback funktiot välitetään toiseen funktioon 

// ES6 merkkijonot, backtickit ja muuttujat dollari-aaltosulkuihin 
let fn = 'John'; let ln = 'Johnson';
console.log(`Hello ${fn} ${ln}`);
