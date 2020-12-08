module.exports = (data) => {
    global.siteTitle = data.title
    global.siteBreadcrumb = data.breadcrumb == undefined ? []: data.breadcrumb
}