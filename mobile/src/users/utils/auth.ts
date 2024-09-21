import { storage } from "@core/utils/storage.ts"

export function auth() {
    return {
        headers: {
            Authorization: `Token ${storage.getString("token")}`,
        },
    }
}

export function checkAuth() {
    return Boolean(storage.getString("token"))
}

export function signOut() {
    storage.set("token", "")
}

export function signIn(token: string) {
    storage.set("token", token)
}
