import clsx from "clsx"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
}

export default function CarouselItem({ children, className }: Props) {
    return <div className={clsx("carousel-item ml-4", className)}>{children}</div>
}
