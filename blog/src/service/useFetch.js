import {useState, useEffect} from 'react';

const useFetch = (url) => {
  /*
  * Returns initial value and a function to change the initial value
  */
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /*
  * Returns the function call whenever there is a re-render or rebuild of UI
  */
  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
        .then(res => {
            // Receives response object and return the parsed the json file
            if (!res.ok) throw Error('Could not fetch data')
            return res.json();
        })
        .then((data) => {
            // Parsed json file
            setData(data);
            setIsLoading(false);
            setError(null);
        })
        .catch((err) => {
            if (err.name === 'AbortError') console.log('Fetch aborted')
            else {
              setIsLoading(false);
              setError(err.message);
            }
        });

        return () => abortController.abort();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;