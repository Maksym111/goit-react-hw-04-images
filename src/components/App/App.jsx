import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import Searchbar from '../Searchbar/Searchbar';
import getImages from 'services/fetch';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Container, ErrorMessage } from './App.styled';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [urlModal, setUrlModal] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }
    setLoading(true);

    async function fetchData() {
      if (page === 1) {
        setResults([]);
        setTotalResults(0);
        try {
          const data = await getImages(search);
          const res = data.hits.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          });
          setResults([...res]);
          setTotalResults(data.total);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      } else {
        try {
          const data = await getImages(search, page);
          const res = data.hits.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          });

          setResults(prevResults => [...prevResults, ...res]);
          setLoading(false);
          setPage(page);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [search, page]);

  const formSubmit = searchValue => {
    setSearch(searchValue);
    setPage(1);
  };

  const loadMore = page => {
    setPage(page);
  };

  const openModalImg = element => {
    if (element.nodeName !== 'IMG') {
      return;
    }

    toggleModal();
    setUrlModal(element.dataset.url);
  };

  const toggleModal = () => {
    setIsShown(!isShown);
  };

  return (
    <Container>
      <Searchbar onSubmit={formSubmit} />
      {loading && results.length < 12 && (
        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            justifySelf: 'center',
          }}
          wrapperClassName=""
          visible={true}
        />
      )}

      {results.length > 0 && (
        <ImageGallery items={results} openModal={openModalImg} />
      )}
      {loading && results.length >= 12 && (
        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            justifySelf: 'center',
          }}
          wrapperClassName=""
          visible={true}
        />
      )}

      {isShown && <Modal urlItem={urlModal} toggleModal={toggleModal} />}
      {results.length > 0 && results.length < totalResults && !loading && (
        <Button value={search} loadMore={loadMore} numberPage={page} />
      )}

      {totalResults === 0 && search && !loading && (
        <ErrorMessage>Ooops, something went wrong :(</ErrorMessage>
      )}
    </Container>
  );
};
