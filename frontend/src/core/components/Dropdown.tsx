import { ReactNode } from "react"
import { clsx } from "clsx"
import Menu, { MenuItem, MenuItemProps } from "./Menu"

export type Props = {
    trigger: ReactNode
    children: ReactNode
    right?: boolean
    open?: boolean
    contentClassName?: string
    fullWidth?: boolean
}

export default function Dropdown({ trigger, children, right, open, contentClassName }: Props) {
    return (
        <div className={clsx("dropdown", { "dropdown-end": !right, "dropdown-open": open })}>
            <label className="pointer">{trigger}</label>

            <Menu className={clsx("dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52", contentClassName)}>
                {children}
            </Menu>
        </div>
    )
}

export type DropdownItemProps = MenuItemProps
export const DropdownItem = MenuItem
