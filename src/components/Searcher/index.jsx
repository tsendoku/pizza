import React from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

function Searcher() {
  const [value, setValue] = React.useState();
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  //eslint-disable-next-line
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  function onClickClear() {
    setValue('');
    setSearchValue('');
    // document.querySelector('input').focus(); Do Not Use In React
    inputRef.current.focus();
  }
  return (
    <div className={styles.main}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 0 48 48"
        width="48">
        <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
        <path d="M0 0h48v48H0z" fill="none" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
        maxLength="25"
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
}

export default Searcher;
