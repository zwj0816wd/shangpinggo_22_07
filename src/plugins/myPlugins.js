
let myPlugins = {}

myPlugins.install = function (Vue,options) {
    Vue.directive(options.name, (element, params) => {
        console.log(params);
        element.value=params.value
    })
}
export default myPlugins