module.exports = api => {
    if (api.env("test")) {
        api.cache.forever();
        return {
            presets: [
                "@babel/preset-react",
                ["@babel/preset-env", {targets: {node: "current"}}]
            ]
        };
    }
    api.cache.forever();
    return {};
};
