import { ReactNode } from "react"

export type Props = {
    on: ReactNode
    off: ReactNode
    value?: boolean
    onChange?: (state: boolean) => void
}

export default function Swap({ value = false, on, off, onChange }: Props) {
    return (
        <label className="btn btn-circle btn-ghost swap swap-rotate">
            <input type="checkbox" checked={value} onChange={(e) => onChange?.(e.target.checked)} />
            <div className="swap-on">{on}</div>
            <div className="swap-off">{off}</div>
        </label>
    )
}
