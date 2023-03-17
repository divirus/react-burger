import { AnyAction, MiddlewareAPI } from 'redux'
import { wsSlice } from '../websocket';
import { feedSlice } from '../feed';
import { setCookie } from '../../utils/cookie';
import { refreshToken } from '../user';
import { USER_ORDERS_WS_URL } from '../../utils/api';
import { IRefreshTokenData, IRefreshTokenResponse } from '../../shared/interfaces';

const {
  wsConnectionStart,
  wsConnectionStop,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed
} = wsSlice.actions;

export const wsMiddleware = () => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (a: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsConnectionStart.type) {
        const wsUrl: string = payload.token ? (
          `${payload.url}?token=${payload.token}`
        ) : (
          `${payload.url}`
        );
        socket = new WebSocket(wsUrl);
      }
      
      if (type === wsConnectionStop.type) {
        socket && socket.close(1000, 'CLOSE_NORMAL');
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(wsConnectionSuccess());
        };

        socket.onerror = event => {
          dispatch(wsConnectionError());
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          if (restParsedData.message && restParsedData.message === 'Invalid or missing token') {
            socket && socket.close(1000, 'CLOSE_NORMAL');
            refreshToken()
            .then((refresh_res: IRefreshTokenResponse) => {
              if (!refresh_res.ok && refresh_res.status >= 500) {
                throw Error(refresh_res.statusText);
              }
              return refresh_res.json();
            })
            .then((refresh_data: IRefreshTokenData) => {
              if (refresh_data.success === true) {
                setCookie('accessToken', refresh_data.accessToken, { path: '/' });
                setCookie('refreshToken', refresh_data.refreshToken, { path: '/' });
                const wsToken: string = refresh_data.accessToken.replace('Bearer ', '');
                const wsUrl: string = `${USER_ORDERS_WS_URL}?token=${wsToken}`;
                socket = new WebSocket(wsUrl);
              }
              else {
                throw Error(refresh_data.message);
              }
            })
            .catch((error: Error) => {
              dispatch(wsConnectionError());
              console.log(error);
            });

          }
          dispatch(feedSlice.actions.setOrdersData(restParsedData));
        };

        socket.onclose = event => {
          dispatch(wsConnectionClosed());
        };
      }

      next(action);
    };
  };
};
