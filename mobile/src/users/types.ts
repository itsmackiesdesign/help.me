import { ModelType } from "@core/types.ts"

export type SignInType = {
    phone: string
}

export type CheckInType = {
    phone?: string
    code: string
}

export type UserType = {
    firstName: string
    lastName: string
    phone: string
}

export type LocationType = ModelType & {
    name: string
    location: string
    latitude: number
    longitude: number
}
