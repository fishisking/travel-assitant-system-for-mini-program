

export function formatSceneStyle(cellValue) {
    if (cellValue == 1) {
        return '自然风光'
    } else if (cellValue == 2) {
        return '户外休闲'
    } else if (cellValue == 3) {
        return '城市生活'
    } else if (cellValue == 4) {
        return '热爱运动'
    } else if (cellValue == 5) {
        return '展馆演出'
    } else if (cellValue == 6) {
        return '其他'
    }
}
