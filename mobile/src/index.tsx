import { QueryClient, QueryClientProvider } from "react-query"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ThemeProvider } from "@emotion/react"
import { RootStackParamListType } from "@core/types.ts"
import { getTheme } from "@core/utils/theme.ts"
import Call from "@call/screens/Call.tsx"
import SplashScreen from "@core/screens/SplashScreen.tsx"
import SignIn from "@users/screens/SignIn.tsx"
import ConfirmCode from "@users/screens/ConfirmCode.tsx"
import ToastProvider from "@core/components/ToastProvider.tsx"

const Stack = createStackNavigator<RootStackParamListType>()
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 30000,
        },
    },
})

const Router = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={getTheme}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="SplashScreen" component={SplashScreen} />
                        <Stack.Screen name="SignIn" component={SignIn} />
                        <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
                        <Stack.Screen name="Call" component={Call} />
                    </Stack.Navigator>
                </NavigationContainer>
                <ToastProvider />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default Router
