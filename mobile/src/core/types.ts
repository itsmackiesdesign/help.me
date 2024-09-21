import { StackNavigationProp } from "@react-navigation/stack"
import { Theme } from "@emotion/react"

export type RootStackParamListType = {
    SplashScreen: undefined
    SignIn: undefined
    ConfirmCode: { phone: string }
    UserInformation: undefined
    MemberInformation: undefined
    ClosePeople: undefined
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

export type ID = number
export type ModelType = { id: ID }
export type StylesPropsType = { theme: Theme }
