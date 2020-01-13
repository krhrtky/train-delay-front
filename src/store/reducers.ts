import { useReducer } from 'react';
import { API } from 'aws-amplify';

export type Line = {
  name: string;
  notice: boolean;
};

export type State = {
  lines: Array<Line>;
};

const ActionTypes = {
  UPDATE: 'UPDATE',
  INIT: 'INIT',
};

export type Action = {
  type: 'UPDATE' | 'INIT';
};

export type Actions =
  | {
      type: 'UPDATE';
      payload: Line;
    }
  | {
      type: 'UPDATE_ALL';
      payload: Array<Line>;
    }
  | {
      type: 'INIT';
    };

const update = () => {
  try {
    return API.get('APIGatewayAPI', '/lines', { response: true }).then(
      ({ data }) => ({
        lines: data.lines as Array<Line>,
      })
    );
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const init = () => useReducer(reducer, initialSate());

const initialSate = (injects?: Partial<State>): State => ({
  lines: [],
  ...injects,
});

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'UPDATE':
      const lines = state.lines.map(
        line => (action.payload.notice === line.notice ? line : action.payload)
      );
      return { lines };
    case 'UPDATE_ALL':
      return { lines: action.payload };
    default:
      throw new Error();
  }
};

export const useAsyncReducer = (initialSate?: Partial<State>): [State, (Action: Actions) => void] => {
  const [state, dispatch] = useReducer(reducer, {
    lines: [],
    ...initialSate,
  });

  const asyncDispatch = (action: Actions) => {
    switch (action.type) {
      case 'INIT':
        API.get('APIGatewayAPI', '/lines', { response: true }).then(
          ({ data }) =>
            dispatch({
              type: 'UPDATE_ALL',
              payload: data.lines as Array<Line>,
            })
        );
        break;
      case 'UPDATE':
        const { name, notice } = action.payload;

        API.put('APIGatewayAPI', `/lines/${encodeURI(name)}`, {
          body: {
            name: name,
            notice: notice,
          },
        }).then(() => {
          dispatch(action);
        });
    }
  };

  return [state, asyncDispatch]
};
