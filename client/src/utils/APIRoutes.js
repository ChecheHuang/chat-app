const production = true
const domain = production ? 'localhost' : 'cheche.ga'
const port = production ? '8080' : '80'
const host = `http://${domain}:${port}`
export const registerRoute = `${host}/api/register`
export const loginRoute = `${host}/api/login`
export const logoutRoute = `${host}/api/logout`
export const sendMessageRoute = `${host}/api/sendMessage`
export const getMessagesRoute = `${host}/api/getMessages`

export const ws = `ws://${domain}:${port}`
