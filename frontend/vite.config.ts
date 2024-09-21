import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
    plugins: [react()],
    server: { port: 3000 },
    resolve: {
        alias: {
            "@core": `${path.resolve(__dirname, "./src/core/")}`,
            "@users": `${path.resolve(__dirname, "./src/users/")}`,
            "@members": `${path.resolve(__dirname, "./src/members/")}`,
            "@call": `${path.resolve(__dirname, "./src/call/")}`,
        },
    },
})
