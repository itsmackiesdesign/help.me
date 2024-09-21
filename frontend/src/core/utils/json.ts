export function parseJSON(json?: string) {
    if (json === undefined || json === null || json === "") {
        return null
    }

    try {
        return JSON.parse(json)
    } catch (ex) {
        console.error("JSON parse error", ex)
        return null
    }
}

// eslint-disable-next-line
export function stringifyJSON(obj: any) {
    try {
        return JSON.stringify(obj)
    } catch (ex) {
        console.error("JSON stringify error", ex)
        return ""
    }
}
