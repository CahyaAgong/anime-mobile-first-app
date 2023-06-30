import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
  deleteAnimeFromCollection,
  dispatchStorageEvent,
  getCollectionByName,
} from '../actions/collection';
import { AnimeInCollection } from '../types';

/** @jsxImportSource @emotion/react */
import { mq } from '../utils/mediaQuery';

import {
  container,
  collectionDetail as collectionDetailContainer,
  popupCollection,
} from '../assets/styles';
import { Button, Footer, Modal, Navbar } from '../components';

const CollectionDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [selectedAnimeName, setselectedAnimeName] = useState<string>('');
  const [selectedAnimeId, setselectedAnimeID] = useState<number>();
  const [collectionDetail, setCollectionDetail] = useState<AnimeInCollection[]>(
    []
  );

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDeleteAnime = (id: number) => {
    if (id) {
      deleteAnimeFromCollection(name || '', id);
      setselectedAnimeName('');
      handleModalClose();
      return;
    }
    console.error('error ocurred!');
  };

  const handleModalDelete = (id: number, name: string) => {
    setselectedAnimeName(name);
    setselectedAnimeID(id);
    handleModalOpen();
  };

  const fetchData = () => {
    const collection = getCollectionByName(name || '');
    if (collection) {
      setCollectionDetail(collection);
    }
  };

  useEffect(() => {
    dispatchStorageEvent();
    fetchData();
    window.addEventListener('storage', () => {
      fetchData();
    });
  }, [name]);

  return (
    <div css={container}>
      <Navbar />
      <div css={collectionDetailContainer}>
        <h1>
          <u>{name}</u>
        </h1>
        <div>
          {collectionDetail.length > 0 ? (
            collectionDetail.map((item: AnimeInCollection) => (
              <div key={item?.Media?.id}>
                <Link to={`/anime/${item?.Media?.id}`}>
                  <>
                    <h2>{item?.Media?.title?.romaji}</h2>
                    <div>
                      <img
                        src={item?.Media?.coverImage?.medium}
                        alt={item?.Media?.title?.romaji + ' covers'}
                      />
                    </div>
                    {/* <p
                  dangerouslySetInnerHTML={{
                    __html: item?.Media?.description ?? '',
                  }}
                ></p> */}
                  </>
                </Link>

                <Button
                  title={`Delete from collection`}
                  styling={`width: 100%; margin:0.5rem 0; padding: 0.5rem;font-size:12px; background-color: rgba(216,45,102, 0.7); border:1px solid #D82D66; :hover{ background-color: rgba(216,45,102, 1)}`}
                  handleClick={() =>
                    handleModalDelete(
                      item?.Media?.id,
                      item?.Media?.title.romaji
                    )
                  }
                />

                {/* <Link to={`/anime/${item?.Media?.id}`}>
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
                        d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                      />
                    </svg>
                  </span>
                </Link> */}
              </div>
            ))
          ) : (
            <p>no anime added!</p>
          )}
        </div>
      </div>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div css={popupCollection}>
          <p>
            Remove <b>{selectedAnimeName}</b> from this collections?
          </p>
          <Button
            title={'Yes'}
            styling={`margin:0; background-color: rgba(216,45,102, 0.7); border:1px solid #D82D66; :hover{ background-color: rgba(216,45,102, 1)} ${mq[1]}{ margin:0.5rem; }`}
            handleClick={() => handleDeleteAnime(selectedAnimeId || 0)}
          />
          <Button
            title={'No'}
            styling={` ${mq[1]}{ margin:0.5rem; }`}
            handleClick={handleModalClose}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CollectionDetail;
