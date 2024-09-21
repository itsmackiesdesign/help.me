import { ModelType } from "@core/types.ts"

export type SignInFormData = {
    phone: string
}

export type SignInType = {
    message: string
} & SignInFormData

export type CheckInFormData = {
    code: string
    phone?: string
}

export type CheckInUserType = {
    id: number
    phone: string
}

export type CheckInType = {
    user: CheckInUserType
    token: string
}

export type BaseUserType = ModelType & {
    firstName: string
    lastName: string
    sex: "male" | "female"
    city: string
    region: string
    birthday: string
    description: string
    speciality: number
    avatar?: string
    passport?: string
}
