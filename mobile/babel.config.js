module.exports = {
    presets: ["module:@react-native/babel-preset"],
    plugins: [
        "react-native-reanimated/plugin",
        [
            "module-resolver",
            {
                extensions: [
                    ".ios.js",
                    ".android.js",
                    ".ios.jsx",
                    ".android.jsx",
                    ".js",
                    ".jsx",
                    ".json",
                    ".ts",
                    ".tsx",
                ],
                root: ["."],
                alias: {
                    "@core": "./src/core",
                    "@home": "./src/home",
                    "@user": "./src/user",
                    "@category": "./src/category",
                },
            },
        ],
        [
            "module:react-native-dotenv",
            {
                allowlist: ["API_URL"],
                envName: "APP_ENV",
                moduleName: "@env",
                path: ".env",
                safe: false,
                verbose: false,
            },
        ],
    ],
}
