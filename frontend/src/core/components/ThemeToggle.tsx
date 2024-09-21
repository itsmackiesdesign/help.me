import Icon from "./Icon"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import Swap from "./Swap"

export default function ThemeToggle() {
    return (
        <Swap
            // value={theme === 'light'}
            // onChange={(light) => setTheme(light ? 'light' : 'dark')}
            off={<Icon icon={SunIcon} />}
            on={<Icon icon={MoonIcon} />}
        />
    )
}
