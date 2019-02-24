import isEqual from '../utils/isEqual'

export default function(oldOption, newOption) {
    if (oldOption) {
        // 当前配置是个数组
        if (Array.isArray(oldOption)) {
            for (let i = 0, l = oldOption.length; i < l; i++) {
                const option = oldOption[i]
                if (option.__rechartId === newOption.__rechartId) {
                    return isEqual(option, newOption) ? false : ((oldOption[i] = newOption), oldOption)
                }
            }
            return oldOption.concat(newOption)
        } else {
            if (oldOption.__rechartId !== newOption.__rechartId) {
                return [oldOption, newOption]
            }
        }
    }
    return newOption
}
