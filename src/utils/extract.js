export default function extract(o, opt = {}) {
    const _o = {}
    const { include, exclude } = opt
    if (include) {
        for (let i = 0, l = include.length; i < l; i++) {
            const key = include[i]
            _o[key] = o[key]
        }
    } else {
        Object.assign(_o, o)
    }
    if (exclude) {
        for (let i = 0, l = exclude.length; i < l; i++) {
            delete _o[exclude[i]]
        }
    }
    return _o
}
