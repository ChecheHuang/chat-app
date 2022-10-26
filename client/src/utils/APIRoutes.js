const production = process.env.REACT_APP_PRODUCTION === 'true'
const domain = production ? 'localhost' : '52.72.12.227'
const host = `http://${domain}:8080`
export const registerRoute = `${host}/api/register`
export const loginRoute = `${host}/api/login`
export const logoutRoute = `${host}/api/logout`
export const sendMessageRoute = `${host}/api/sendMessage`
export const getMessagesRoute = `${host}/api/getMessages`

export const ws = `ws://${domain}:8080`
