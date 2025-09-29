import { INotice } from "../Component/UserPanelNotification/UserPanelMainModeNotification";

export const delay = (wait: number) => new Promise(resolve => setTimeout(resolve, wait));
export const goToUp = (): any => document?.querySelector('.goto') && document?.querySelector('.goto')?.scrollIntoView({ block: "start", behavior: "smooth" });
export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
// Функция для перемещения изменившихся статусов в конец списка
export const moveChangedStatusToEnd = (array: INotice[], statusToMove: string) => {
  const unchangedItems = array.filter(
    (item: INotice) => item.status !== statusToMove
  );
  const changedItems = array.filter(
    (item: INotice) => item.status === statusToMove
  );
  return [...unchangedItems, ...changedItems];
}

export function setLocaleStoreObj(data: []) {
  for (const key in data) {
    setLocaleStore(key, data[key]);
  }
}

export const autoRefuseTimer = function (time: number, f?: any): any {

  return () => (
    time = time - 1,
    f = autoRefuseTimer(time - 1)
  );
}

export const isKeyPresentInHash = function (table: Record<any, any> | undefined, key: string | null): boolean {
  if (table === undefined) return false;
  if (key === null) return !!Object.keys(table).length;
  return Object.prototype.hasOwnProperty.call(table, key) && (table[key] !== undefined);
}

export function removeLocaleStore(key: string) {
  window.localStorage.removeItem(key);
}

export function getLocaleStore(key: string) {
  let res: null | undefined | boolean | number | string =
    window.localStorage.getItem(key);
  if (res === "null" || res === "") res = null;
  if (res === "undefined") res = undefined;
  if (res === "true") res = true;
  if (res === "false") res = false;
  return res;
}

export function setLocaleStore(key: string, value: string) {
  window.localStorage.setItem(key, value);
  return true;
}
export function setSessionStore(key: string, value: string) {
  window.sessionStorage.setItem(key, value);
  return true;
}
export function getSessionStore(key: string) {
  let res: null | undefined | boolean | number | string =
    window.sessionStorage.getItem(key);
  if (res === "null" || res === "") res = null;
  if (res === "undefined") res = undefined;
  if (res === "true") res = true;
  if (res === "false") res = false;
  return res;
}

export const initDataParamsPostOrGet = (params: {
  [key: string]: any | FormData
}) => {
  if(params instanceof FormData) return params;
  let newParams = {};
  const listExcept = [
    "",
  ];
  for (let key in params) {
    if (
      params[key] === undefined ||
      params[key] === null ||
      params[key] === "" ||
      (typeof params[key] === "object" && !params[key]?.length) ||
      typeof params[key] === "function" ||
      listExcept.includes(key)
    ) {
    } else {
      newParams = { ...newParams, [key]: params[key] };
    }
  }
  return newParams;
};

export const getPriceTaxesFromHouses = (amountHouses: number, listHouses: any[]): {
  price: number;
  name: string;
} => {
  if (!!!listHouses) return {
    price: 0,
    name: 'Error: нет списка домов',
  };
  if ((amountHouses < 1 || amountHouses > listHouses.length)) {
    return {
      price: 0,
      name: 'Error: некорректное количество домов',
    };
  }
  // Получаем цену для указанного количества домов
  const element = listHouses[--amountHouses];
  const keyElement = Object.keys(element)[0];
  return {
    price: element[keyElement],
    name: `${keyElement} ${keyElement === 'hotel' ? '' : keyElement === 1 + '' ? 'дом' : 'домами'}`,
  };
}

// засветляем цвет
export const adjustColorBrightness = (color: string, percent: number) => {
  if(!color) return ''
  let num = parseInt(color.slice(1), 16),
    r = (num >> 16) + percent,
    g = ((num >> 8) & 0x00ff) + percent,
    b = (num & 0x0000ff) + percent;

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `rgb(${r}, ${g}, ${b})`;
};
// делаем цвет прозрачный
export const rgbToRgba = function (rgb: string, alpha: number) {
  return rgb.replace("rgb", "rgba").replace(")", `, ${alpha})`);
}

export function connectWebSocket(socket: WebSocket, callback: (res: any) => any, action: string = 'pending') {
  if (socket === undefined) return
  socket.onopen = () => {
    console.warn("WebSocket open: ");
  }
  socket.onerror = (error: any) => {
    console.error("ReadyState = ", error?.target?.readyState, "WebSocket error: ", error);
    if (error?.target?.readyState === WebSocket.CLOSED) {
      return
    }
    socket.close(); // Закрываем соединение при ошибке
  }
  socket.onclose = (e: CloseEvent) => {
    console.warn("WebSocket close code: ", e?.code, typeof e?.code);
    if (e?.code === 1006) {
      // Попробуем переподключиться через 2 секунды
      // setTimeout(connectWebSocket, 2000);
      return console.log('close websocket error 1006')
    }
    if (e?.code === 1000) {
      return console.log('close from client websocket code 1000')
    }
    // setTimeout(connectWebSocket, 2000);  
  }
  socket.onmessage = (event: MessageEvent) => {
    callback(JSON.parse(event.data));
    if (action === 'close') {
      // принудительно закрываем
      console.log('принудительно закрываем Websocket')
      socket.close();
    }
    return
  }
}

export function getUrlWebsocket(url: string, payload: any) {
  url += `?token=${getLocaleStore("token")}`;
  if (Object.keys(payload).length) {
    url += `&${Object.keys(payload)?.map(key => `${key}=${payload[key]}`).join('&')}`;  // append query params to the URL if provided in data object.
  }
  return url;

}

export const temporaryDisableBtn = function (time: number, f: Function) {
  f(true);
  setTimeout(() => {
    f(false);
  }, time);
};