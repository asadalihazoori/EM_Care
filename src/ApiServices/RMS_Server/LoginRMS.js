import { Component } from 'react';
import axios from 'axios';

export default class LoginRMS extends Component {

  static LoginUser({ username, password }) {
    username = username.trim();
    password = password.trim();

    const requestBody = {
      params: {
        db: 'Tabish_APIs',
        login: username,
        password: password
      }
    };

    return axios.post('http://3.1.62.217:8069/web/session/authenticate', requestBody, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        // console.log(error);
        throw error;
      });
  }
}
