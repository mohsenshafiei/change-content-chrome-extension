let state
const toggleDesignMode = () => broadcast({ type: 'toggle-designmode' })
const takeScreenshot = () => broadcast({ type: 'capture' })
const broadcast = message => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      const element = document.getElementById('toggle-design-mode-btn')
      if (!response) return
      switch (response.type) {
        case 'toggle-designmode':
          element.innerHTML = response.payload === 'on' ? 'Disable' : 'Enable'
          break
        case 'get-state':
          state = response.payload
          element.innerHTML = state.designMode === 'on' ? 'Disable' : 'Enable';
          break
        default:
          break
      }
    })
  })
}
const init = () => broadcast({ type: 'get-state' });
document.getElementById('toggle-design-mode-btn').onclick = toggleDesignMode
window.onload = () => init();
