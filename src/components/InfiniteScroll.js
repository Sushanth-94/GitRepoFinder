import {useCallback, useEffect, useState} from 'react';

export default function InfiniteScroll(userInput, pageNumber) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keepSearching, setKeepSearching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setRepos([]);
    setError(false);
  }, [userInput]);

  useEffect(() => {
    if (userInput.length > 0) {
      debouncedFn(userInput, pageNumber);
    }
  }, [userInput, pageNumber]);

  const debounce = (delay) => {
    let timer;
    return function (debounceInput, pageNumber) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fetchData(debounceInput, pageNumber);
      }, delay);
    };
  };

  const fetchData = async (input, pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${input}&per_page=10&page=${pageNum}`,
      );
      const jsonResponse = await response.json();
      if (jsonResponse.items && jsonResponse.items.length > 0) {
        setRepos((prevRepos) => [...prevRepos, ...jsonResponse.items]);
        setLoading(false);
        setKeepSearching(jsonResponse.items.length > 0);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setRepos([]);
    }
  };

  const debouncedFn = useCallback(debounce(500), []);

  return {repos, loading, keepSearching, error};
}
