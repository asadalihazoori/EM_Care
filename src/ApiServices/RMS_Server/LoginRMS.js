import { Component } from 'react';
import axios from 'axios';
import sessionDetail from '../../conts/sessionDetail';

export default class LoginRMS extends Component {

  static LoginUser({ username, password }) {
    username = username.trim();
    password = password.trim();

    const requestBody = {
      params: {
        db: sessionDetail.database,
        login: username,
        password: password
      }
    };

    return axios.post(`http://${sessionDetail.server_Ip}/web/session/authenticate`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}
