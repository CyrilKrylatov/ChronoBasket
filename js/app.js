const TEMPLATE = document.querySelector('#template')
const ITEMS = 10
let ITERATOR = 0

for (ITERATOR; ITERATOR < ITEMS; ITERATOR++) {
    const TEMPLATE_CONTENT = TEMPLATE.content.cloneNode(true)
    document.body.append(TEMPLATE_CONTENT)
}
