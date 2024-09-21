export function currencyFormat(sum: number, replacer = " ") {
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, replacer)
}
