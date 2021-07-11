import React, {useState, useRef, useCallback} from 'react';
import './App.css';
import GitCard from './components/GitCard';
import InfiniteScroll from './components/InfiniteScroll';
import Search from './components/Search';

function App() {
  const [userInput, setUserInput] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const {repos, loading, keepSearching, error} = InfiniteScroll(
    userInput,
    pageNumber,
  );

  const observer = useRef();
  const lastElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && keepSearching) {
          setPageNumber((pn) => pn + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, keepSearching],
  );

  return (
    <div className="App">
      <Search
        userInput={userInput}
        updateUserInput={(val) => {
          setUserInput(val);
          setPageNumber(1);
        }}
      />
      {repos.length > 0 ? (
        repos.map((repo, index) => {
          if (index === repos.length - 1) {
            return (
              <div ref={lastElement} key={repo.id}>
                <GitCard repo={repo} />
              </div>
            );
          } else {
            return <GitCard key={repo.id} repo={repo} />;
          }
        })
      ) : (
        <div className="loading">
          {error && 'No results, please refine your search'}
        </div>
      )}
      <div className="loading">{loading && 'Loading...'}</div>
    </div>
  );
}

export default App;
