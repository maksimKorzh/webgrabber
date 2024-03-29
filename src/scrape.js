function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

infiniteScroll(document).then(
  chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
  })
)
function infiniteScroll(document_root) {
  let oldY = window.scrollY
  let limit = document.documentElement.scrollHeight
  window.scrollBy(0, limit)
  let newY = window.scrollY
  if (newY == oldY) {
    chrome.runtime.sendMessage({
      action: "getSource",
      source: DOMtoString(document)
    })
    return
  }
  else setTimeout(infiniteScroll, 1000);
}
