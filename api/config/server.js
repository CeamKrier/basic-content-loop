require("@babel/register")({
    ignore: [/(node_modules)/],
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-transform-runtime"]
});

require("../index.js");
