import {
  SearchBtnSpan,
  SearchButton,
  SearchForm,
  SearchInput,
  SearchbarHeader,
} from './Searchbar.styled';
import { CiSearch } from 'react-icons/ci';

const { Component } = require('react');

class Searchbar extends Component {
  state = {
    text: '',
  };

  handleInput = e => {
    this.setState({
      text: e.target.value.trim(),
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.onSubmitForm}>
          <SearchButton type="submit">
            <SearchBtnSpan>
              <CiSearch value={{ style: { width: 50, height: 50 } }} />
            </SearchBtnSpan>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            value={this.state.text}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;
