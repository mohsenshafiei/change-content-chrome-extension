const getState = () => {
  const state = sessionStorage.getItem('state')
  return {
    type: 'get-state',
    payload: state ? JSON.parse(state) : { designMode: document.designMode }
  }
}

const saveState = payload => sessionStorage.setItem('state', JSON.stringify(payload))

const toggleDesignMode = () => {
  document.designMode = document.designMode === 'off' ? 'on' : 'off'
  saveState({ designMode: document.designMode })
  return { type: 'toggle-designmode', payload: document.designMode }
}

const actions = {
  'toggle-designmode': toggleDesignMode,
  'get-state': getState,
}

chrome.runtime.onMessage.addListener((request, sender, response) => {
  const reply = actions[request.type] && actions[request.type](request.payload)
  reply && response(reply)
})
