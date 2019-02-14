import fastDeepEqual from 'fast-deep-equal'

export default function isEqual(a, b, opt = {}) {
    const _a = {}
    const _b = {}
    const { include, exclude } = opt
    if (include) {
        include.forEach(key => ((_a[key] = a[key]), (_b[key] = b[key])))
    } else {
        Object.assign(_a, a)
        Object.assign(_b, b)
    }
    if (exclude) {
        exclude.forEach(key => (delete _a[key], delete _b[key]))
    }
    return fastDeepEqual(_a, _b)
}
