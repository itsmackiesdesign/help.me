import * as React from "react"
import Svg, { G, Path, Circle, Defs, ClipPath } from "react-native-svg"

function SvgComponent({ width = 24, height = 24, fill = "#000" }) {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <G clipPath="url(#clip0_1_19705)" stroke={fill} strokeWidth={2}>
                <Path d="M4 18a4 4 0 014-4h8a4 4 0 014 4v0a2 2 0 01-2 2H6a2 2 0 01-2-2v0z" strokeLinejoin="round" />
                <Circle cx={12} cy={6.99997} r={3} />
            </G>
            <Defs>
                <ClipPath id="clip0_1_19705">
                    <Path fill="#fff" d="M0 0H24V24H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default SvgComponent
