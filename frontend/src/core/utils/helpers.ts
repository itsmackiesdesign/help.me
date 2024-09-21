export const uniqueId = ((counter) => {
    return (str = "") => `${str}${++counter}`
})(0)

export function range(start: number, stop: number, step: number = 1) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step)
}

export function randomlyPick<T>(array: T[]): T {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}

// allowing any because we may check any type of data
// eslint-disable-next-line
export function isPrimitive(data: any) {
    return !["array", "object", "function"].includes(typeof data)
}
