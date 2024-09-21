import { storage } from "@core/utils/storage.ts"

async function auth() {
    const token = storage.getString("token")
    return {
        headers: {
            Authorization: `Token ${token}`,
        },
    }
}

export function checkAuth() {
    const token = storage.getString("token")
    return Boolean(token)
}

export async function signOut() {
    storage.set("token", "")
}
