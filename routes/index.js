module.exports = (app) => {
    //app.use('/', ctrlIndex.index)
    app.use('/', require("./web"))
    app.use('/api', require("./api"))
    app.use('/admin', require("./admin"))
}
