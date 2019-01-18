export default function(parent, name, child) {
    const options = parent[name]
    if (options) {
        // 当前配置是个数组
        if (Array.isArray(options)) {
            // 查找数组中是不是已存在该项
            const option = options.find(opt => opt.id === child.id)
            if (option) {
                Object.assign(option, child)
            } else {
                options.push(child)
            }
        } else {
            // 非数组，更新或赋值
            if (options.id == child.id) {
                Object.assign(options, child)
            } else {
                parent[name] = [options, child]
            }
        }
    } else {
        parent[name] = child
    }
}
