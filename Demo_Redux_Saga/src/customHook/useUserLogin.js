import {useEffect, useState} from 'react';

export const useUserLogin = async (url, data) => {
  let baseUrl = 'https://reqres.in/api/posts';
  let Url = 'http://restapi.adequateshop.com/api/authaccount/login';

  const [loginStatus, setLoginStatus] = useState();
  // console.log('data for login stats', data);
  const headerWithoutBearer = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const config = {
    method: 'POST',
    headers: headerWithoutBearer,
    body: JSON.stringify(data),
  };
  // async function userResponse() {
  //   const res = await fetch(baseUrl, config);
  //   // console.log('first', res);
  //   let result = await res.json();
  //   console.log('response--', result);
  //   setLoginStatus(result);
  // }
  // userResponse();
  // body: JSON.stringify({email: 'gtak026@gmail.com', password: '123456'}),
  useEffect(() => {
    async function userResponse() {
      const res = await fetch(baseUrl, config);
      let result = await res.json();
      // console.log('response--', result);
      setLoginStatus(result);
    }
    userResponse();
  }, [data]);
  console.log('login info', loginStatus);
  return loginStatus;
};
