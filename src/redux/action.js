import { ADD_CUSTOMER, LOGIN_CUSTOMER, UPDATE_CUSTOMER } from "./const";

export function login_customer(loginStatus) {
    return {
        type: LOGIN_CUSTOMER,
        data: loginStatus
    }

}

export function add_customer(customer) {
    return {
        type: ADD_CUSTOMER,
        data: customer
    }

}

export function update_customer(customer) {
    return {
        type: UPDATE_CUSTOMER,
        data: customer
    }

}