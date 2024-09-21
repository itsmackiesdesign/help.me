import { StackNavigationProp } from "@react-navigation/stack"

export type RootStackParamListType = {
    Call: undefined
}

export type StackNavigationType = StackNavigationProp<RootStackParamListType>

export type NavigationType = {
    navigation: StackNavigationType
}

export type Pagination<T> = {
    count: number
    results: T[]
}

export type ModelType = {
    id: number
}
