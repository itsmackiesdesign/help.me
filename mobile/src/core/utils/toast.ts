import Toast from "react-native-toast-message"

type ShowToastProps = {
    type: "success" | "warning" | "error"
    title: string
    subtitle?: string
    onPress?: () => void
    visibilityTime?: number
    position?: "top" | "bottom"
}

export const showToast = ({
    type,
    title,
    subtitle,
    visibilityTime = 3000,
    onPress,
    position = "top",
}: ShowToastProps) => {
    Toast.show({
        type,
        text1: title,
        text2: subtitle,
        onPress,
        visibilityTime,
        position,
    })
}
