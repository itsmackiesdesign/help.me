import { ReactNode } from "react"
import Button from "./Button"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { clsx } from "clsx"
import Container from "@core/components/Container.tsx"
import { Link } from "react-router-dom"

export type Props = {
    title?: string
    backTo?: string
    start?: ReactNode
    middle?: ReactNode
    end?: ReactNode
    className?: string
}

export default function Navbar({ title, start, middle, end, backTo, className }: Props) {
    return (
        <div className={clsx("w-full z-50 bg-white shadow-md sticky top-0", className)}>
            <Container className="navbar h-16 flex items-center justify-between">
                {/* Navbar Start */}
                <div className="flex items-center space-x-4">
                    {backTo ? (
                        <Button
                            to={backTo}
                            icon={ArrowLeftIcon}
                            color="ghost"
                            size="sm"
                            className="mr-2 hover:bg-gray-100 transition ease-in-out duration-200"
                        />
                    ) : null}
                    {start}
                    {title && (
                        <Link to="/" className="text-lg text-gray-800 font-semibold hover:text-primary transition">
                            {title}
                        </Link>
                    )}
                </div>

                {/* Navbar Middle */}
                <div className="navbar-center hidden md:flex justify-center">{middle}</div>

                {/* Navbar End */}
                <div className="flex items-center space-x-4">{end}</div>
            </Container>
            {/* Bottom accent bar */}
            <div className="w-full bg-primary h-1 transition-all" />
        </div>
    )
}
