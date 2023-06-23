// eslint-disable-next-line max-len
export const REG_EMAIL = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const REG_LOGIN = new RegExp(/^[a-zA-Z][a-zA-Z0-9]{3,32}$/);
export const REG_PASSWORD = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/);
