export function trimSlashes(value: string) {
    return value.replace(/^\/+|\/+$/g, "")
}

export function trimRightSlashes(value: string) {
    return value.replace(/\/$/, "")
}

export function trimLeftSlashes(value: string) {
    return value.replace(/^\/+/, "")
}
