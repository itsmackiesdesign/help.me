import { useState, useEffect, useRef } from "react"
import { StyleSheet, Animated, Easing } from "react-native"

const LoadingDots = ({ dots = 4, color = "#D32F2F", size = 8, bounceHeight = 8, borderRadius = 0 }) => {
    const [animations, setAnimations] = useState<Animated.Value[]>([])
    const [reverse, setReverse] = useState(false)

    const opacity: Animated.Value = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const dotAnimations: Animated.Value[] = []
        for (let i = 0; i < dots; i++) {
            dotAnimations.push(new Animated.Value(0))
        }
        setAnimations(dotAnimations)
    }, [dots])

    useEffect(() => {
        if (animations.length === 0) return
        loadingAnimation(animations, reverse)
        appearAnimation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animations])

    const appearAnimation = () => {
        Animated.timing(opacity, {
            toValue: 1,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start()
    }

    const floatAnimation = (node: Animated.Value | Animated.ValueXY, reverseY: boolean, delay: number) => {
        return Animated.sequence([
            Animated.timing(node, {
                toValue: reverseY ? bounceHeight : -bounceHeight,
                easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(node, {
                toValue: reverseY ? -bounceHeight : bounceHeight,
                easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(node, {
                toValue: 0,
                delay,
                useNativeDriver: true,
            }),
        ])
    }

    const loadingAnimation = (nodes: Animated.Value[], reverseY: boolean): void => {
        Animated.parallel(nodes.map((node, index) => floatAnimation(node, reverseY, index * 100))).start(() => {
            setReverse(!reverse)
        })
    }

    useEffect(() => {
        if (animations.length === 0) return
        loadingAnimation(animations, reverse)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reverse, animations])

    return (
        <Animated.View style={[styles.loading, { opacity }]}>
            {animations.map((animation, index) => (
                <Animated.View
                    key={`loading-anim-${index}`}
                    style={[
                        {
                            width: size,
                            height: size,
                            borderRadius: borderRadius || size / 2,
                        },
                        { backgroundColor: color || "#4dabf7" },
                        { transform: [{ translateY: animation }] },
                    ]}
                />
            ))}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    loading: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
})

export default LoadingDots
