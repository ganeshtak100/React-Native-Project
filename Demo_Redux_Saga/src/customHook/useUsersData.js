import {useEffect, useState} from 'react';

export const useUsersData = url => {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      // console.log('rersponse=', res);
      let users = await res.json();
      setData(users);
    }
    fetchData();
  }, []);

  // console.log('data', data && data);
  return [data];
};
