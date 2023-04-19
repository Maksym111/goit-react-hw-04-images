import { LoadMoreBtn } from './Button.styled';

const Button = ({ loadMore, numberPage }) => {
  const handleClick = () => {
    const newPage = numberPage + 1;
    loadMore(newPage);
  };

  return (
    <LoadMoreBtn type="button" onClick={handleClick}>
      Load more
    </LoadMoreBtn>
  );
};

export default Button;
