import { MemberType } from "@users/types.ts"
import { ModelType } from "@core/types.ts"

export type CallCreateType = {
    status: "initiated"
    longitude: number
    latitude: number
}

export type CallType = ModelType & {
    member: MemberType
    status: string
    initiatedAt: string
    longitude: number
    latitude: number
    calledAt: string
    canceledAt: string
    ambulanceRequestedAt: string
    finishedAt: string
}

export type JoinStreamType = {
    userId: string
    callId: string
    token: string
}
