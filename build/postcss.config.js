module.exports = {
    plugins: [
        require('autoprefixer')({browsers:["last 2 versions", "ie 8", "ie 9", "> 1%"]}),
        require('postcss-pxtorem')({
            rootValue: 75,
            minPixelValue: 2,
            propWhiteList: [],
        })
    ]
}