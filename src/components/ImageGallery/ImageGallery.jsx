import PropTypes, { func } from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { ListImages } from './ImageGallery.styled';

const ImageGallery = ({ items, openModal }) => {
  return (
    <ListImages
      onClick={e => {
        openModal(e.target);
      }}
    >
      {items.map(item => {
        return <ImageGalleryItem key={item.id} item={item} />;
      })}
    </ListImages>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  openModal: func.isRequired,
};

export default ImageGallery;
