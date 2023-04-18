import { Component } from 'react';
import { LoadMoreBtn } from './Button.styled';

class Button extends Component {
  state = {
    page: 1,
  };

  handleClick = () => {
    this.setState({ page: this.props.numberPage + 1 }, () => {
      this.props.loadMore(this.state.page);
    });
  };

  render() {
    return (
      <LoadMoreBtn type="button" onClick={this.handleClick}>
        Load more
      </LoadMoreBtn>
    );
  }
}

export default Button;
