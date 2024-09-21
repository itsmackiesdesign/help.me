import { integersOnly } from "./number"

function empty(value: string | null | undefined) {
    return value === "" || value === null || value === undefined || value.length === 0
}

export function required(value?: string | null | undefined) {
    if (empty(value)) {
        return "Это обязательное поле"
    }
}

export function maxNumber(limit: number) {
    return (value: number) => {
        if (value > limit) {
            return `Максимальное значение ${limit}`
        }
    }
}

export function minTime(startTime: string) {
    return (endTime: string) => {
        const valueStartTime = new Date(`2018.01.01 ${startTime}`).getTime()
        const valueEndTime = new Date(`2018.01.01 ${endTime}`).getTime()
        if (valueStartTime > valueEndTime) {
            return "Урок не может закончиться прежде чем начаться."
        }
    }
}

export function email(value: string) {
    if (!value) return
    const regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (empty(value)) {
        return
    }

    if (!regx.test(value)) {
        return "Неправильный email-адрес"
    }
}

export function phone(value: string) {
    if (!value) return
    const integers = integersOnly(value)

    if (integers.length !== 12) {
        return "Номер телефона должен состоять из 12 цифр"
    }
}

function isNumber(value: string) {
    return /^-?\d*(\.\d+)?$/.test(value)
}

export function number(value: string) {
    if (!isNumber(value)) {
        return "This field should be number"
    }
}

export function max(size: number) {
    return (value: string) => {
        if (isNumber(value) && parseFloat(value) > size) {
            return `This field should be less then "${size}"`
        }
    }
}

export function min(size: number) {
    return (value: string) => {
        if (isNumber(value) && parseFloat(value) < size) {
            return `This field should be greater then "${size}"`
        }
    }
}

export function maxLength(size: number) {
    return (value: string) => {
        if (value.length > size) {
            return `This field should contain less then "${size}" chars.`
        }
    }
}

export function minLength(size: number) {
    return (value: string) => {
        if (value.length < size) {
            return `This field should contain more then "${size}" chars.`
        }
    }
}

/*
export function validateForm(rules) {
    return (data) => {
        const errors = {}
        for (const key of Object.keys(rules)) {
            const message = rules[key](data[key])
            if (message) {
                errors[key] = message
            }
        }
        return errors
    }
}
*/
