import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../../utils/types';
import { TWSActions, TWSStoreActions } from '../actions/wsActions';


// export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      // const { user } = getState().user;
      if (type === wsInit) {
        console.log(action.url)
        // socket = new WebSocket(`${wsUrl}?token=${user.token}`);
        // socket = new WebSocket(`${wsUrl}`);
        socket = new WebSocket(action.url);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          // const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: parsedData});
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        // if (type === wsSendMessage) {
        //   const payload = action.payload;
        //   const message = { ...(payload as IMessage), token: user?.token };
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
  }) as Middleware;
};