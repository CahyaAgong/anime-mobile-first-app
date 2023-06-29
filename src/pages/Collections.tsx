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

  return (
    <div css={container}>
      <Navbar />

      <Button title={`Add Collection`} handleClick={handleModalOpen} />
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
                <h1>{item?.collectionName ?? ''}</h1>
                <div>
                  <Button
                    title={`Update`}
                    styling={`margin:0 0.2rem 0 0; padding: 0.5rem;font-size:10px; `}
                    handleClick={() =>
                      handleEditCollection(item?.collectionName ?? '')
                    }
                  />
                  <Button
                    title={`Delete`}
                    styling={`margin:0 0.2rem 0 0; padding: 0.5rem;font-size:10px; background-color: rgba(216,45,102, 0.7); border:1px solid #D82D66; :hover{ background-color: rgba(216,45,102, 1)}`}
                    handleClick={() => handleModalDelete(item?.collectionName)}
                  />
                </div>

                <Link to={`${item.collectionName}`}>
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
                </Link>
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
              <p>Remove {newCollection} collections ? </p>
              <Button
                title={'Yes'}
                styling={`margin:0; background-color: rgba(216,45,102, 0.7); border:1px solid #D82D66; :hover{ background-color: rgba(216,45,102, 1)}`}
                handleClick={() => handleDeleteCollection(newCollection)}
              />
              <Button
                title={'No'}
                styling={`margin:0.5rem 0 0;`}
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
