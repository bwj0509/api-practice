import React, { useEffect, useReducer } from 'react';


function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type:${action.type}`)
    }
}

const initialstate = {
    loading: false,
    data: null,
    error: false
}


function useAsync(callback, deps = []) {
    const [state, dispatch] = useReducer(reducer, initialstate)

    const fetchDate = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const data = await callback();
            dispatch({ type: 'SUCCESS', data })
        }
        catch (e) {
            dispatch({ type: 'ERROR', error: e })
        }
    }

    useEffect(() => {
        fetchDate();
    }, deps)

    return [state, fetchDate];

}

export default useAsync;