import hash from 'object-hash'

// ignore key
const keys = ['children', 'triggerPushOption']

export default function hashCode(obj) {
    return hash(obj, {
        ignoreUnknown: true,
        excludeKeys: key => {
            return keys.includes(key)
        }
    })
}
