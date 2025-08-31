import { useReducer } from 'react';


/**
 * Runs async function and return its state
 * 
 * you can override initial state of reducer by passing state object
 * 
 * @param {function} fn async function (Promise)
 * @param {object} initial_state - initial state of reducer default {loading: false, result: null, error: null}
 */
export function useAsync(fn, initial_state = {}) {

    if (typeof initial_state === 'object') {

    }
    initial_state = { loading: false, result: null, error: null, ...initial_state };

    const reducer = (_, action) => {
        switch (action.type) {
            case 'start':
                return { loading: true, result: null, error: null };
            case 'finish':
                return { loading: false, result: action.value, error: null };
            case 'error':
                return { loading: false, result: null, error: action.value };
            case 'update':
                return { loading: false, result: action.value, error: null };
            default:
                throw new Error(`Undefined action ${action.type} provided`)
        }
    }

    const [state, dispatch] = useReducer(reducer, initial_state);

    /**
     * Run promise function passed in useAsync(fn)
     * @param {*} args Arguments to pass in promise
     */
    const run = async (...args) => {
        try {
            dispatch({ type: 'start' });
            let value = await fn(...args);
            dispatch({ type: 'finish', value });

        } catch (error) {

            if (error.response) {
                dispatch({ type: 'error', value: error.response.data });
            } else {
                dispatch({ type: 'error', value: error })
            }
        }
    };

    return { ...state, run }
}