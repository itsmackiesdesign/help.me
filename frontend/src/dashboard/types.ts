import { ID, ModelType } from "@core/types.ts"

export type UserType = ModelType & {
    username: string
    firstName: string
    lastName: string
    fullName?: string
    phone: string
    verifiedAt?: string
}

export type MemberType = ModelType & {
    birthdate: string
    user: ID | UserType
    address: string
    extra: string
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
    member: ID | MemberType
}
