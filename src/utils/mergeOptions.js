import isEqual from '../utils/isEqual'

export default function(oldOption, newOption) {
    if (oldOption) {
        // 当前配置是个数组
        if (Array.isArray(oldOption)) {
            for (let i = 0, l = oldOption.length; i < l; i++) {
                const option = oldOption[i]
                if (option.optid === newOption.optid) {
                    return isEqual(option, newOption) ? false : ((oldOption[i] = newOption), oldOption)
                }
            }
            return oldOption.concat(newOption)
        } else {
            if (oldOption.optid !== newOption.optid) {
                return [oldOption, newOption]
            }
        }
    }
    return newOption
}
