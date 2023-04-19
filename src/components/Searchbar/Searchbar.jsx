import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

import {
  SearchBtnSpan,
  SearchButton,
  SearchForm,
  SearchInput,
  SearchbarHeader,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleInput = e => {
    setText(e.target.value.trim());
  };

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={onSubmitForm}>
        <SearchButton type="submit">
          <SearchBtnSpan>
            <CiSearch value={{ style: { width: 50, height: 50 } }} />
          </SearchBtnSpan>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          value={text}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

export default Searchbar;
