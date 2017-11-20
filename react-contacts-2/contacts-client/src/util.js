
export function cancelBubble(e) {
  let evt = e ? e : window.event;
  if (evt.stopPropagation) evt.stopPropagation();
  if (evt.cancelBubble != null) evt.cancelBubble = true;
}
