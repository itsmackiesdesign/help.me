export function currencyFormatUZS(num: number) {
    return num
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
        .replace(/\.00$/, "")
}