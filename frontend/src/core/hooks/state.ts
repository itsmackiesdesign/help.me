import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { parseJSON, stringifyJSON } from "@core/utils/json.ts"

export function usePersistState<S>(key: string, defaultValue?: S): [S, Dispatch<SetStateAction<S>>] {
    const [state, setState] = useState(() => {
        const value = localStorage.getItem(key)

        if (value === null || value === undefined) {
            return defaultValue
        }

        try {
            return parseJSON(value)
        } catch (e) {
            return value
        }
    })

    useEffect(() => {
        const value = typeof state === "object" ? stringifyJSON(state) : state
        localStorage.setItem(key, value)
    }, [key, state])

    return [state, setState]
}
