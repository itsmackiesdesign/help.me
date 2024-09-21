import { ID, ModelType } from "@core/types.ts"

export type SignInType = {
    phone: string
}

export type CheckInType = {
    phone?: string
    code: string
}

export type UserType = ModelType & {
    firstName: string
    lastName: string
}

export type UserUpdateType = Omit<UserType, "id">

export type CheckInResponseType = {
    token: string
    refresh: string
    user: Omit<UserType, "phone">
}

export type MemberType = ModelType & {
    birthdate: string | Date
    user: UserType
    address: string
    extra: string
}

export type MemberCreateType = Omit<MemberType, "id" | "user"> & {
    firstName: string
    lastName: string
}

export type CallType = ModelType & {
    member: ID
    status: "initialized" | "called" | "canceled" | "ambulance_requested" | "finished"
    initiatedAt: string
    longitude: number
    latitude: number
    calledAt: string
    cancelledAt?: string
    ambulanceRequestedAt: string
    finishedAt?: string
}

export type ContactRelationshipType =
    | "father"
    | "mother"
    | "brother"
    | "sister"
    | "wife"
    | "husband"
    | "friend"
    | "son"
    | "doughter"
    | "other"

export type ContactType = ModelType & {
    fullName: string
    phone: string
    relationship: ContactRelationshipType
    member: ID
}

export type ContactCreateType = Omit<ContactType, "id" | "member">

export type RefreshTokenType = {
    token: string
}
