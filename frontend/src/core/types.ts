import { FC } from "react"

// Utils
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>
export type Optional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys]

// UI common Types
export type IconType = FC<{ className?: string }>

// Data Types
export type EmptyResponse = { [K in string | number]: never }
export type Params<T = string> = Record<string, string | number | boolean | undefined | null | Array<T | null> | T>

export type ID = number
export type ModelType = { id: ID }
export type Pagination<T> = { count: number; results: T[] }
export type Permissions = string[]
