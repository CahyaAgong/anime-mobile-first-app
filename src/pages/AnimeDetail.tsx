import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import {
  addAnimeToCollection,
  checkCollectionExists,
  createCollection,
  dispatchStorageEvent,
  getAllCollections,
  getCollectionByAnime,
  isCollectionCreated,
} from '../actions/collection';
import { useFetchAnimeDetail } from '../actions/dataProvider';

import { Button, Modal, Navbar } from '../components';

/** @jsxImportSource @emotion/react */

import { AnimeInCollection } from '../types';
import {
  animeDetailContainer,
  coverImage,
  floatingContent,
  genres,
  inCollection,
  popupCollection,
} from '../assets/styles';
import Loading from '../components/Loading';

const AnimeDetail = () => {
  const { id } = useParams<string>();
  const { loading, data } = useFetchAnimeDetail(id || '1');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newCollection, setNewCollection] = useState<string>('');
  const [currentAnimeDetail, setCurrentAnimeDetail] =
    useState<AnimeInCollection>({
      Media: {
        id: 0,
        title: {
          romaji: '',
          native: '',
        },
        description: '',
        coverImage: {
          medium: '',
          large: '',
          extraLarge: '',
        },
        seasonYear: '',
        bannerImage: '',
        meanScore: 0,
        favourites: 0,
        popularity: 0,
        trending: 0,
        genres: [],
      },
      sequences: 0,
    });
  const [floatingDivExpanded, setFloatingDivExpanded] =
    useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleAddCollection = () => {
    if (!isCollectionCreated()) {
      const newCollection = 'new collection';
      createCollection(newCollection);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleNewCollection = () => {
    if (checkCollectionExists(newCollection)) {
      alert(`collection ${newCollection} exist, try another name!`);
      setNewCollection('');
      return;
    }
    createCollection(newCollection);

    setNewCollection('');
  };

  const handleAddAnimeToCollection = (
    collectionName: string,
    AnimeDetail: AnimeInCollection
  ) => {
    addAnimeToCollection(collectionName, AnimeDetail);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchY = e.touches[0].clientY;
    setTouchStartY(touchY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY !== null) {
      const touchY = e.touches[0].clientY;
      const deltaY = touchY - touchStartY;
      const scrollTop = e.currentTarget.scrollTop;

      if (floatingDivExpanded && scrollTop > 0) {
        return;
      }

      if (deltaY < -80) {
        setFloatingDivExpanded(true);
      } else if (
        deltaY > 20 ||
        (deltaY < 0 && scrollTop === 0 && !floatingDivExpanded)
      ) {
        setFloatingDivExpanded(false);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStartY(null);
  };

  const fetchAnimeDetail = () => {
    if (isCollectionCreated()) {
      if (data) {
        let animeDetail: AnimeInCollection = {
          Media: {
            id: data.Media.id,
            title: {
              romaji: data.Media.title.romaji,
              native: data.Media.title.native,
            },
            description: data.Media.description,
            coverImage: {
              medium: data.Media.coverImage.medium,
              large: data.Media.coverImage.large,
              extraLarge: data.Media.coverImage.extraLarge,
            },
            seasonYear: data.Media.seasonYear,
            bannerImage: data.Media.bannerImage,
            meanScore: data.Media.meanScore,
            favourites: data.Media.favourites,
            popularity: data.Media.popularity,
            trending: data.Media.trending,
            genres: data.Media.genres,
          },
          sequences: 0,
        };
        setCurrentAnimeDetail(animeDetail);
      }
    }
  };

  useEffect(() => {
    dispatchStorageEvent();
    fetchAnimeDetail();
    window.addEventListener('storage', () => {
      fetchAnimeDetail();
    });
  }, [data]);

  if (loading) return <Loading />;
  // if (error) console.log(`error : ${error}`);

  return (
    <HelmetProvider>
      <Helmet>
        <link
          rel='preload'
          as='image'
          href={data?.Media?.coverImage?.extraLarge}
          key={data?.Media.id}
        />
      </Helmet>
      <div css={animeDetailContainer}>
        <Navbar />
        <div css={coverImage(`${data?.Media?.coverImage?.extraLarge || ''}`)}>
          <div
            css={floatingContent(floatingDivExpanded)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <h1>{data?.Media?.title?.romaji ?? ''}</h1>

            <div>
              <span>{data?.Media?.seasonYear ?? ''}</span>
              <span>•</span>
              <span>{data?.Media?.title?.native ?? ''}</span>
            </div>

            <summary>
              <div>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
                  </svg>
                </span>
                <span>{data?.Media?.favourites ?? 0}</span>
              </div>

              <div>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                <span>{data?.Media?.meanScore ?? 0}</span>
              </div>

              <div>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
                    />
                  </svg>
                </span>
                <span>{data?.Media?.popularity ?? 0}</span>
              </div>

              <div>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                    />
                  </svg>
                </span>
                <span>{data?.Media?.trending ?? 0}</span>
              </div>
            </summary>

            <p
              dangerouslySetInnerHTML={{
                __html: data?.Media?.description ?? '',
              }}
            ></p>

            <div css={genres}>
              {data?.Media?.genres && data?.Media.genres.length > 0 ? (
                data?.Media?.genres.map(item => <div key={item}>{item}</div>)
              ) : (
                <div>No genres available</div>
              )}
            </div>

            <div css={inCollection}>
              <h1>Collections</h1>
              <div>
                {getCollectionByAnime(currentAnimeDetail).length > 0 ? (
                  getCollectionByAnime(currentAnimeDetail).map(
                    collectionName => (
                      <div key={collectionName} style={{ margin: '0 2px' }}>
                        <Link to={`/collections/${collectionName}`}>
                          {collectionName}
                        </Link>
                      </div>
                    )
                  )
                ) : (
                  <p>This anime hasn't been added to any collections yet</p>
                )}
                <span onClick={handleAddCollection}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 4.5v15m7.5-7.5h-15'
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div css={popupCollection}>
            <h1>Collection List</h1>
            <div>
              <input
                type='text'
                placeholder='Add New Collection'
                value={newCollection}
                onChange={e => setNewCollection(e.target.value)}
              />
              <Button title='Submit' handleClick={handleNewCollection} />
            </div>
            <div>
              {getAllCollections().map(item => {
                return (
                  <span
                    key={item.collectionName}
                    onClick={() =>
                      handleAddAnimeToCollection(
                        item.collectionName,
                        currentAnimeDetail
                      )
                    }
                  >
                    {item.collectionName}
                  </span>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    </HelmetProvider>
  );
};

export default AnimeDetail;
