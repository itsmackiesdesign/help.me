import { QueryClient, QueryClientProvider } from "react-query"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ThemeProvider } from "@emotion/react"
import { RootStackParamListType } from "@core/types.ts"
import { getTheme } from "@core/utils/theme.ts"
import Call from "@call/screens/Call.tsx"

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
                    <Stack.Navigator initialRouteName="Call" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Call" component={Call} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default Router
