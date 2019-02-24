import fastDeepEqual from 'fast-deep-equal'
import extract from './extract'

export default function isEqual(a, b, opt = {}) {
    return fastDeepEqual(extract(a, opt), extract(b, opt))
}
