export const phoneMask = ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]

export const formatPhoneNumber = (value: string) => {
    const cleaned = ("" + value).replace(/\D/g, "")
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/)
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`
    }
    return value
}

export const formatFullPhoneNumber = (value: string) => {
    const match = value
    return `${match.slice(0, 4)} ${match.slice(4, 6)}-${match.slice(6, 9)}-${match.slice(9, 11)}-${match.slice(11)}`
}
