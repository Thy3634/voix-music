const collections = [403065, 1068, 1891877, 3819449, 527617, 968726, 541348, 472894, 1587410, 269404, 3575988, 2538707, 4673512, 3807567, 1590942, 244735, 1213870, 2595946, 1777609]

function* random() {
    while (true) {
        yield `https://source.unsplash.com/collection/${collections[Math.round(Math.random() * collections.length)]}/${document.body.clientWidth}x${document.body.clientHeight}`
    }
}

export default {
    random
}