import {useEffect, useState} from 'react';

const useJokeRandom = (firstName, lastName) => {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    const fetchJoke = async () => {
      await fetch(
        'http://api.icndb.com/jokes/random?firstName=Sonny&lastName=Sangha',
      )
        .then(res => res.json())
        .then(data => {
          // console.log('data-', data);
          setJoke(data?.value?.joke);
        });
    };
    fetchJoke();
  }, []);
  console.log('jokes', joke);
  return joke;
};
export default useJokeRandom;
