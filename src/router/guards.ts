import { NavigationGuardWithThis, NavigationHookAfter } from "vue-router";

const before: NavigationGuardWithThis<any> = (to, from, next) => {
    next()
}

const after: NavigationHookAfter = (to, from, failure) => {

}

export {
    before,
    after
}