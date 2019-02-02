import hash from 'object-hash'

// ignore key
const keys = []

export default function hashCode(obj) {
    return hash(obj, {
        ignoreUnknown: true,
        excludeKeys: key => {
            return keys.includes(key)
        }
    })
}
