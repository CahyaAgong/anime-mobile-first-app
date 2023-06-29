import { AnimeInCollection } from '../types';

const collectionKey = 'animeCollection';
let animeCollection: Record<string, any> = {};

export const dispatchStorageEvent = () => {
  //for trigger if storage has updated
  window.dispatchEvent(new Event('storage'));
};

export const storedCollection = localStorage.getItem(collectionKey);
if (storedCollection) {
  animeCollection = JSON.parse(storedCollection);
}

export const getAllCollections = () => {
  const storedData = localStorage.getItem(collectionKey);
  if (storedData) {
    // const collections = JSON.parse(storedData);
    // return Object.keys(collections);
    const collections = JSON.parse(storedData);
    const collectionNames = Object.keys(collections);

    // Loop through each collection and add the first anime if it exists
    const collectionsWithData = collectionNames.map(collectionName => {
      const animeInCollection = collections[collectionName];
      const firstAnime =
        animeInCollection.length > 0 ? animeInCollection[0] : null;

      return {
        collectionName,
        firstAnime,
      };
    });

    return collectionsWithData;
  }
  return [];
};

export const getCollectionByName = (collectionName: string) => {
  const collection = animeCollection[collectionName];
  if (collection) {
    return collection;
  }
};

export const getCollectionByAnime = (anime: AnimeInCollection): string[] => {
  const collectionNames: string[] = [];

  for (const collectionName in animeCollection) {
    if (animeCollection.hasOwnProperty(collectionName)) {
      const collection = animeCollection[collectionName];
      const foundAnime = collection.find(
        (item: any) => item.Media.id === anime.Media.id
      );
      if (foundAnime) {
        collectionNames.push(collectionName);
      }
    }
  }
  return collectionNames;
};

export const createCollection = (collectionName: string) => {
  const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (collectionName.trim() === '') {
    alert('collection name can not be empty!');
    return;
  }

  if (specialCharsRegex.test(collectionName)) {
    alert('collection name can not contain special characters!');
    return;
  }

  const collection = JSON.parse(localStorage.getItem(collectionKey) || `{}`);
  if (collection[collectionName]) {
    alert(`collection ${collectionName} already exists, try a different name!`);
    return;
  }

  collection[collectionName] = [];
  animeCollection = collection;
  localStorage.setItem(collectionKey, JSON.stringify(animeCollection));

  alert(`successfully created collection ${collectionName}`);
  dispatchStorageEvent();
};

export const addAnimeToCollection = (
  collectionName: string,
  animeDetail: AnimeInCollection
) => {
  if (animeCollection[collectionName]) {
    const existingAnime = animeCollection[collectionName].find(
      (anime: any) => anime.Media.id === animeDetail.Media.id
    );
    if (existingAnime) {
      alert('Anime already exists in the collection.');
      return;
    }
    // Mendapatkan nilai sequences terbesar dari koleksi yang sudah ada
    const maxSequences = Math.max(
      ...animeCollection[collectionName].map((anime: any) => anime.sequences),
      0
    );

    animeDetail.sequences = maxSequences + 1;
    animeCollection[collectionName].push(animeDetail);
    localStorage.setItem(collectionKey, JSON.stringify(animeCollection));

    dispatchStorageEvent();
    alert(`success add anime to collection ${collectionName}`);
  }
};

export const deleteCollection = (collectionName: string) => {
  const collectionData = localStorage.getItem(collectionKey);
  if (collectionData) {
    const collections = JSON.parse(collectionData);
    delete collections[collectionName];
    localStorage.setItem(collectionKey, JSON.stringify(collections));
    dispatchStorageEvent();
  }
};

export const deleteAnimeFromCollection = (
  collectionName: string,
  animeId: number
): void => {
  // Dapatkan koleksi berdasarkan nama koleksi
  const collection = getCollectionByName(collectionName);

  // Periksa apakah koleksi ditemukan
  if (!collection) {
    alert('Collection not found');
    return;
  }

  const updateAnimeList = collection.filter(
    (anime: AnimeInCollection) => anime.Media.id !== animeId
  );

  animeCollection[collectionName] = updateAnimeList;
  localStorage.setItem(collectionKey, JSON.stringify(animeCollection));

  dispatchStorageEvent();
};

export const editCollection = (
  collectionName: string,
  newCollectionName: string
) => {
  const collectionData = localStorage.getItem(collectionKey);

  if (collectionData) {
    const collections = JSON.parse(collectionData);

    if (collections.hasOwnProperty(collectionName)) {
      if (collections.hasOwnProperty(newCollectionName)) {
        alert(`Collection "${newCollectionName}" already exists.`);
        return;
      }

      collections[newCollectionName] = collections[collectionName];
      delete collections[collectionName];
      localStorage.setItem(collectionKey, JSON.stringify(collections));
      dispatchStorageEvent();
    }
  }
};

export const purgeAllCollections = () => {
  animeCollection = {};
  localStorage.removeItem(collectionKey);
  dispatchStorageEvent();
};

export const isCollectionCreated = () => {
  const storedCollection = localStorage.getItem(collectionKey);
  return storedCollection !== null && storedCollection !== undefined;
};

export const checkCollectionExists = (collectionName: string): boolean => {
  return !!animeCollection[collectionName];
};
