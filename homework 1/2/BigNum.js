export function bigSum(str1, str2) {
    let bignum1 = BigInt(str1)
    let bignum2 = BigInt(str2)
    return String(bignum1 + bignum2);
}

export function bigSubtraction(str1, str2) {
    let bignum1 = BigInt(str1)
    let bignum2 = BigInt(str2)
    return String(bignum1 - bignum2);
}

export function bigMultiplication(str1, str2) {
    let bignum1 = BigInt(str1)
    let bignum2 = BigInt(str2)
    return String(bignum1 * bignum2);
}

export function bigDivision(str1, str2) {
    let bignum1 = BigInt(str1)
    let bignum2 = BigInt(str2)
    return String(bignum1 / bignum2);
}
let big1 = "498273649872369876348273646982376482736589734689573469583746583742349823769283769823749827689236496492831231232131"
let big2 = "12341283498123782103728107392810792810379281037492108372134287281492172817482137927498213498137498294871239"

console.log(bigSum(big1, big2))
console.log(bigSubtraction(big1, big2))
console.log(bigMultiplication(big1, big2))
console.log(bigDivision(big1, big2))