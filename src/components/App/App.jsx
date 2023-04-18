import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import Searchbar from '../Searchbar/Searchbar';
import getImages from 'services/fetch';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Container, ErrorMessage } from './App.styled';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    results: [],
    totalResults: 0,
    loading: false,
    isShown: false,
    urlModal: null,
  };

  async componentDidUpdate(prevProp, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search) {
      this.setState({
        results: [],
        totalResults: 0,
        loading: true,
      });

      try {
        await getImages(search).then(data => {
          const res = data.hits.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          });
          this.setState({
            results: res,
            totalResults: data.totalHits,
            loading: false,
          });
        });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    } else if (prevState.page !== page) {
      this.setState({ loading: true });

      try {
        await getImages(search, page).then(data => {
          const res = data.hits.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          });

          this.setState({
            results: [...prevState.results, ...res],
            loading: false,
            page,
          });
        });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    }
  }

  formSubmit = searchValue => {
    this.setState({
      search: searchValue,
      page: 1,
    });
  };

  loadMore = page => {
    this.setState({
      page,
    });
  };

  openModalImg = element => {
    if (element.nodeName !== 'IMG') {
      return;
    }

    this.toggleModal();
    this.setState({
      urlModal: element.dataset.url,
    });
  };

  toggleModal = () => {
    this.setState({
      isShown: !this.state.isShown,
    });
  };

  render() {
    const { search, loading, results, page, urlModal, totalResults } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.formSubmit} />
        {loading && (
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
          <ImageGallery items={results} openModal={this.openModalImg} />
        )}
        {this.state.isShown && (
          <Modal urlItem={urlModal} toggleModal={this.toggleModal} />
        )}
        {results.length > 0 && results.length < totalResults && !loading && (
          <Button value={search} loadMore={this.loadMore} numberPage={page} />
        )}

        {totalResults === 0 && search && !loading && (
          <ErrorMessage>Ooops, something went wrong :(</ErrorMessage>
        )}
      </Container>
    );
  }
}
