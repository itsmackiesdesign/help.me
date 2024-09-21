import { NavigateFunction } from "react-router-dom"
import { CheckInType } from "@users/types.ts"
import { stringifyJSON } from "@core/utils/json.ts"

export function auth() {
    return {
        headers: {
            Authorization: `Token ${localStorage.token}`,
        },
    }
}

export function signIn({ user, token }: CheckInType) {
    localStorage.setItem("user", stringifyJSON(user))
    localStorage.setItem("token", token)
}

export function signOut(navigate: NavigateFunction, invalidate: () => void) {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/")
    invalidate()
}

export function isAuthenticated() {
    return localStorage.getItem("user") && localStorage.getItem("token")
}

let permissions: string[] | undefined

export function checkPermission(permission: string) {
    if (permissions === undefined) {
        permissions = JSON.parse(localStorage.getItem("permissions") || "[]") as string[]
    }

    return permissions.includes(permission)
}

export function clearPermissions() {
    permissions = undefined
}
