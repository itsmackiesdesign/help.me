import { Dimensions } from "react-native"

const dimensions = Dimensions.get("window")

const windowWidth = dimensions.width
const windowHeight = dimensions.height

export { windowWidth, windowHeight }
