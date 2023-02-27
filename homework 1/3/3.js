class Product {
    constructor(name, price = 0, quantity = 0, description = "") {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}

let products = []
products.push(new Product("This", 10, 1, "This is it."))
products.push(new Product("That", 27, 11, "This and that."))
products.push(new Product("Magazines", 10, 100, "Magazines"))
products.push(new Product("Toothpaste", 15, 20, "Toothpaste"))
products.push(new Product("Food", 5, 200, "Food"))
products.push(new Product("Candy", 20, 30, "Candy"))
products.push(new Product("Laundry detergent", 40, 15, "Laundry detergent"))
products.push(new Product("Shampoo", 30, 50, "Shampoo"))
products.push(new Product("fdShampoo", 30, 5, "abc"))
products.push(new Product("Laundry detergent fd", 2, 15, "xyzabc"))

function filterByString(arr, str) {
    words = str.split("-");
    let result = arr.slice();
    if (words[1].startsWith("<=")) result = arr.filter(item => item[words[0]] <= parseFloat(words[1].slice(2)))
    else if (words[1].startsWith(">=")) result = arr.filter(item => item[words[0]] >= parseFloat(words[1].slice(2)))
    else if (words[1].startsWith("<")) result = arr.filter(item => item[words[0]] < parseFloat(words[1].slice(1)))
    else if (words[1].startsWith(">")) result = arr.filter(item => item[words[0]] > parseFloat(words[1].slice(1)))
    else if (words[1].startsWith("=")) result = arr.filter(item => item[words[0]] == parseFloat(words[1].slice(1)))
    else if (words[1] === "contains") result = arr.filter(item => item[words[0]].includes(words[2]))
    else if (words[1] === "starts") result = arr.filter(item => item[words[0]].startsWith(words[2]))
    else if (words[1] === "ends") result = arr.filter(item => item[words[0]].endsWith(words[2]))
    return result;
}
function queryByString(arr, str) {
    let queries = str.split("&")
    let result = arr.slice();
    for (let query of queries) {
        result = filterByString(result, query)
    }
    return result
}
query = "name-contains-fd&price-=2-&quantity->5&description-ends-abc"
console.log(queryByString(products, query))