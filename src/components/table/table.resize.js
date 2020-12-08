import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  const heightProp = type === 'col' ? 'width' : 'height'
  let value

  $resizer.css({
    'opacity': 1,
    [sideProp]: '-5000px',
    [heightProp]: '4px',
    'user-select': 'none',
  })

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: -delta + 'px',
        width: '1px',
        cursor: 'col-resize'
      })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: -delta + 'px',
        height: '1px'
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      const elem = $root
        .findAll(`[data-col="${$parent.data.col}"]`)
      $parent.css({width: value + 'px'})
      elem.forEach(el => el.style.width = value + 'px')
      $resizer.css({
        opacity: 0,
        [heightProp]: '4px',
        right: '-2px'
      })
    } else {
      $parent.css({height: value + 'px'})
      $resizer.css({
        opacity: 0,
        [heightProp]: '4px',
        bottom: '-2px'
      })
    }
  }
}
