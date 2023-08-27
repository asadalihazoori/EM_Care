import { ADD_CUSTOMER, LOGIN_CUSTOMER, UPDATE_CUSTOMER } from "./const";

const initialState = {
    login: null,
    data: [],
};

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_CUSTOMER:
            console.log(action.data, "from reducer");
            return {
                ...state,
                login: action.data
            }

        case ADD_CUSTOMER:
            return {
                ...state,
                data: [...state.data, action.data]
            }

        case UPDATE_CUSTOMER:
            const updatedData = state.data.map(item => {
                if (item === action.data) {
                    return {
                        ...item,
                        sync: true
                    }
                }
                return item;
            })
            return {
                data: updatedData
            }

        default:
            return state;
    }
}