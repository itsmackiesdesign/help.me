import Navbar from "@core/components/Navbar.tsx"
import Drawer from "@core/components/Drawer.tsx"
import Icon from "@core/components/Icon.tsx"
import Group from "@core/components/Group.tsx"
import Tooltip from "@core/components/Tooltip.tsx"
import Button from "@core/components/Button.tsx"
import { ReactNode } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { ArrowLeftStartOnRectangleIcon, ChartPieIcon, CogIcon } from "@heroicons/react/24/outline"
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
                    <ul className="menu p-4 w-60 min-h-full border-r border-r-base-200 text-base-content gap-1 ">
                        <li>
                            <NavLink className="nav-btn" to="/calls">
                                <Icon icon={ChartBarIcon} className="w-4 h-4" />
                                <span>Calls</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-btn" to="/members" end>
                                <Icon icon={UsersIcon} className="w-4 h-4" />
                                <span>Members</span>
                            </NavLink>
                        </li>
                        <li>
                            <p aria-disabled={true} className="text-gray-400">
                                <Icon icon={ChartPieIcon} className="w-4 h-4" />
                                <span>
                                    Statistics{" "}
                                    <span className="badge badge-accent badge-sm text-gray-400">soon...</span>
                                </span>
                            </p>
                        </li>
                        <li>
                            <p aria-disabled={true} className="text-gray-400">
                                <Icon icon={CogIcon} className="w-4 h-4" />
                                <span>
                                    Settings <span className="badge badge-accent badge-sm text-gray-400">soon...</span>
                                </span>
                            </p>
                        </li>
                    </ul>
                }
            >
                <div className="py-2 px-3 bg-base-100 flex-1">{children}</div>
            </Drawer>
        </main>
    )
}
