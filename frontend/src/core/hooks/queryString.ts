import { useLocation, useParams as useBaseParams } from "react-router-dom"
import { useMemo } from "react"
import queryString, { ParsedQuery } from "query-string"

export function useQueryParams<T = ParsedQuery>() {
    const location = useLocation()
    return useMemo(() => queryString.parse(location.search), [location.search]) as unknown as T
}

export function useParams() {
    return useBaseParams<Record<string, string>>()
}
