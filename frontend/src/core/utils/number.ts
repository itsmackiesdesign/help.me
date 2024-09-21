export function format(number: number | string) {
    return typeof number === "number" ? number.toLocaleString("fr") : number
}

export function integersOnly(value: string) {
    return value.replace(/[^0-9]/gim, "")
}

export default function random(from: number, to: number) {
    return Math.ceil(from + Math.random() * (to - from))
}
