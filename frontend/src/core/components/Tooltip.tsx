import { ReactNode } from "react"
import { clsx } from "clsx"

export type Props = {
    children: ReactNode
    tip: string
    position?: "top" | "bottom" | "right" | "left"
}

const tPositions = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
}

export default function Tooltip({ children, tip, position = "top" }: Props) {
    return (
        <div className={clsx("tooltip", tPositions[position])} data-tip={tip}>
            {children}
        </div>
    )
}
