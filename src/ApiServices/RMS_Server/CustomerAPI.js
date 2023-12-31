import { Component } from 'react';
import sessionDetail from '../../conts/sessionDetail';
import axios from 'axios';

export default class CustomerAPI extends Component {
  static AddCustomer(inputs) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const dataApi = {

      "customer_name": inputs.name,
      "customer_address": inputs.address,
      "phone": inputs.phone,
      "store_longitude": inputs.latitude,
      "store_latitude": inputs.longitude,
      "image_1": inputs.base64Img1,
      "image_2": inputs.base64Img2,
      "image_3": inputs.base64Img3,

    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      data: JSON.stringify(dataApi),
      url: `http://${sessionDetail.server_Ip}/createCustomer/`
    };

    return axios(requestOptions)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });


  }


  static getCustomer() {
    const headers = {
      'Content-Type': 'application/json',
    };

    const dataApi = {
      params: {
      }

    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      data: JSON.stringify(dataApi),
      url: `http:/${sessionDetail.server_Ip}/getcustomer/`
    };

    return axios(requestOptions)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });


  }

  static UpdateCustomer(inputs) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const dataApi =

    {
      "params": {
        id: inputs.id,
        customer_name: inputs.name,
        customer_address: inputs.address,
        store_longitude: inputs.longitude,
        store_latitude: inputs.latitude,
        // store_landmark: 62329,
        phone: inputs.phone,
        image_1: inputs.base64Img1,
        image_2: inputs.base64Img2,
        image_3: inputs.base64Img3,

        // "image_1920": inputs.base64Img1
      }
    }

    const requestOptions = {
      method: 'POST',
      headers: headers,
      data: JSON.stringify(dataApi),
      url: `http://${sessionDetail.server_Ip}/editCustomer/`
    };

    return axios(requestOptions)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });


  }


}