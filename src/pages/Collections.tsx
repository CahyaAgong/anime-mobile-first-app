import { useEffect, useState } from 'react';
import {
  createCollection,
  deleteCollection,
  dispatchStorageEvent,
  editCollection,
  getAllCollections,
  purgeAllCollections,
} from '../actions/collection';
import { Modal, Navbar, Footer, Button } from '../components';
import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { mq } from '../utils/mediaQuery';

import {
  container,
  collectionListContainer,
  popupCollection,
} from '../assets/styles';
import { Collections as CollectionsType } from '../types';
import Loading from '../components/Loading';
import { DEFAULT_IMG } from '../utils/constants';

const Collections = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [collectionList, setCollectionList] = useState<CollectionsType[]>([]);
  const [newCollection, setNewCollection] = useState<string>('');
  const [oldCollectionName, setOldCollectionName] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const resetForm = () => {
    setModalOpen(false);
    setNewCollection('');
    setIsEdit(false);
    setIsDelete(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    resetForm();
  };

  const handleSubmitCollection = (isEdit: boolean = false) => {
    if (!isEdit) {
      if (newCollection !== '') {
        createCollection(newCollection);
      }
    } else {
      if (newCollection !== '') {
        editCollection(oldCollectionName, newCollection);
      }
    }
    resetForm();
  };

  const handleDeleteCollection = (collectionName: string) => {
    deleteCollection(collectionName);
    resetForm();
  };

  const handleEditCollection = (collectionName: string) => {
    setModalOpen(!isModalOpen);
    setIsEdit(true);
    setNewCollection(collectionName);
    setOldCollectionName(collectionName);
  };

  const handleModalDelete = (collectionName: string) => {
    setNewCollection(collectionName);
    setIsDelete(true);
    handleModalOpen();
  };

  const fetchData = () => {
    const collections = getAllCollections();
    setCollectionList(collections);
    setIsLoading(false);
  };

  useEffect(() => {
    dispatchStorageEvent();
    fetchData();
    window.addEventListener('storage', () => {
      fetchData();
    });
  }, []);

  if (isLoading) return <Loading />;

  const actionButton = `padding:0.1rem; margin:5px 5px 0 0; font-size:10px; ${mq[1]} {
    font-size:12px;
    padding:0.2rem 0.5rem; 
    margin:0;
  }`;

  const actionButtonDelete = `background-color: rgba(216,45,102, 0.7); border:1px solid #D82D66; :hover{ background-color: rgba(216,45,102, 1)}`;

  return (
    <div css={container}>
      <Navbar />

      <Button
        title={`Add Collection`}
        handleClick={handleModalOpen}
        styling='margin: 1rem;'
      />
      <div css={collectionListContainer}>
        {collectionList.length > 0 ? (
          collectionList.map(item => (
            <div key={item.collectionName}>
              <div>
                <img
                  src={
                    item?.firstAnime?.Media?.coverImage?.extraLarge ??
                    DEFAULT_IMG
                  }
                  alt={`${item?.collectionName} collections cover`}
                />
              </div>
              <div>
                <Link to={`${item.collectionName}`}>
                  <>
                    <h1>{item?.collectionName ?? ''}</h1>
                    <span>Cover: {item?.firstAnime?.Media?.title?.romaji}</span>
                  </>
                </Link>
                <div>
                  <Button
                    title={`Update`}
                    styling={`${actionButton}`}
                    handleClick={() =>
                      handleEditCollection(item?.collectionName ?? '')
                    }
                  />
                  <Button
                    title={`Delete`}
                    styling={`${actionButton} ${actionButtonDelete}`}
                    handleClick={() => handleModalDelete(item?.collectionName)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>no collection added</p>
        )}
      </div>
      <Footer />

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div css={popupCollection}>
          {isDelete ? (
            <>
              <p>
                Remove <b>{newCollection}</b> collections ?{' '}
              </p>
              <Button
                title={'Yes'}
                styling={`margin:0.2rem;  background-color: rgba(216,45,102, 0.7); border:1px solid #D82D66; :hover{ background-color: rgba(216,45,102, 1)} ${mq[1]} {
                  margin:0.5rem;
                }`}
                handleClick={() => handleDeleteCollection(newCollection)}
              />
              <Button
                title={'No'}
                styling={`margin:0.2rem; ${mq[1]} {
                  margin:0.5rem;
                }`}
                handleClick={handleModalClose}
              />
            </>
          ) : (
            <>
              <h1>{isEdit ? `Edit Collection` : `Add Collection`}</h1>
              <div>
                <input
                  type='text'
                  value={newCollection}
                  placeholder={
                    isEdit ? 'Edit this collection' : 'Add New Collection'
                  }
                  onChange={e => setNewCollection(e.target.value)}
                />
                <Button
                  title={`Submit`}
                  handleClick={() => handleSubmitCollection(isEdit)}
                />
              </div>
              <div></div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Collections;
