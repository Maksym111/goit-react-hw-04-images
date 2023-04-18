import PropTypes from 'prop-types';

import { Item, ItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ item }) => {
  return (
    <Item>
      <ItemImage
        src={item.webformatURL}
        alt="Зображення із запиту"
        data-url={item.largeImageURL}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
