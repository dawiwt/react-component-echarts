import hashCode from './hashCode'
export default function(parent, name, child) {
    const options = parent[name]
    if (options) {
        // 当前配置是个数组
        if (Array.isArray(options)) {
            // 查找数组中是不是已存在该项
            const option = options.find(opt => opt.optid === child.optid)
            if (option) {
                if (hashCode(option) === hashCode(child)) {
                    return false
                }
                Object.assign(option, child)
            } else {
                options.push(child)
            }
        } else {
            // 非数组，更新或赋值
            if (options.optid == child.optid) {
                if (hashCode(options) === hashCode(child)) {
                    return false
                }
                Object.assign(options, child)
            } else {
                parent[name] = [options, child]
            }
        }
    } else {
        parent[name] = child
    }
    return parent
}
