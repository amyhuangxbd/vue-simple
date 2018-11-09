export default function (element, html) {
  if (element !== document.activeElement) {
    element.innerHTML = element.innerHTML + html
    return
  }
  let sel, range
  if (window.getSelection) {
    sel = window.getSelection()
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0)
      range.deleteContents()
      let el = document.createElement('div')
      el.innerHTML = html
      let frag = document.createDocumentFragment()
      let node
      let lastNode
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node)
      }
      range.insertNode(frag)
      if (lastNode) {
        range = range.cloneRange()
        range.setStartAfter(lastNode)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
  } else if (document.selection && document.selection.type !== 'Control') {
    document.selection.createRange().pasteHTML(html)
  }
}
