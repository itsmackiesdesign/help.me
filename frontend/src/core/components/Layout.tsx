import Navbar from "@core/components/Navbar.tsx"
import Drawer from "@core/components/Drawer.tsx"
import Icon from "@core/components/Icon.tsx"
import Group from "@core/components/Group.tsx"
import Tooltip from "@core/components/Tooltip.tsx"
import Button from "@core/components/Button.tsx"
import { ReactNode } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Cog8ToothIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { signOut } from "@users/utils/auth.ts"
import { useQueryClient } from "react-query"
import { ChartBarIcon, UsersIcon } from "@heroicons/react/20/solid"

type Props = {
    children: ReactNode
}

export default function Layout({ children }: Props) {
    const navigate = useNavigate()
    const client = useQueryClient()
    return (
        <main className="w-full h-screen flex flex-col">
            <Navbar
                className="bg-white"
                title="Help me"
                end={
                    <Group className="items-center">
                        <Tooltip tip="Settings" position="bottom">
                            <Button to="/settings" icon={Cog8ToothIcon} size="sm" color="ghost" circle />
                        </Tooltip>

                        <Tooltip tip="Logout" position="bottom">
                            <Button
                                onClick={() => signOut(navigate, () => client.invalidateQueries())}
                                icon={ArrowLeftStartOnRectangleIcon}
                                size="sm"
                                color="ghost"
                                circle
                            />
                        </Tooltip>
                    </Group>
                }
            />

            <Drawer
                className="flex-1"
                sidebar={
                    <ul className="menu p-4 w-60 min-h-full border-r border-r-base-200 text-base-content gap-1">
                        <li>
                            <NavLink className="nav-btn" to="/">
                                <Icon icon={ChartBarIcon} className="w-4 h-4" />
                                <span>Calls</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-btn" to="/members" end>
                                <Icon icon={UsersIcon} className="w-4 h-4" />
                                <span>Clients</span>
                            </NavLink>
                        </li>
                    </ul>
                }
            >
                <div className="py-2 px-3 bg-base-100 flex-1">{children}</div>
            </Drawer>
        </main>
    )
}
