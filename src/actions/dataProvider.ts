import { useState, useEffect, useRef } from 'react';

import { useQuery, gql } from '@apollo/client';
import { PageParams, AnimeListData, Anime, AnimeInCollection } from '../types';

export const useFetchAnimeList = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [isFetching, setFetching] = useState<boolean>(false);
  const variables = useRef<PageParams>({
    page: 1,
    perPage: 10,
    currentPage: 1,
  });

  const GET_ANIME_LIST = gql`
    query GetAnimeList($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media {
          id
          title {
            romaji
            english
            native
          }
          description
          coverImage {
            medium
            large
            extraLarge
          }
          episodes
          tags {
            name
          }
        }
      }
    }
  `;
  const { loading, error, data, fetchMore } = useQuery<
    AnimeListData,
    PageParams
  >(GET_ANIME_LIST, {
    variables: variables.current,
    fetchPolicy: 'network-only',
  });

  const handleMoreData = async (): Promise<void> => {
    setFetching(true);

    try {
      const result = await fetchMore({
        variables: {
          page: variables.current.page + 1,
          perPage: variables.current.perPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            Page: {
              ...prev.Page,
              pageInfo: fetchMoreResult.Page.pageInfo,
              media: [...prev.Page.media, ...fetchMoreResult.Page.media],
            },
          };
        },
      });

      if (result.data && result.data.Page && result.data.Page.media) {
        setAnimeList(prevAnimeList => [
          ...prevAnimeList,
          ...result.data.Page.media,
        ]);
        variables.current.page += 1;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (data && data.Page && data.Page.media) {
      setAnimeList(data.Page.media);
    }
  }, [data]);

  return {
    loading,
    error,
    animeList,
    handleMoreData,
    isFetching,
  };
};

export const useFetchAnimeDetail = (id: string) => {
  const GET_ANIME_DETAIL = gql`
    query GetAnimeDetail($id: Int) {
      Media(id: $id) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          medium
          large
          extraLarge
        }
        seasonYear
        bannerImage
        meanScore
        favourites
        popularity
        trending
        genres
      }
    }
  `;
  const { loading, error, data } = useQuery<AnimeInCollection>(
    GET_ANIME_DETAIL,
    {
      variables: { id },
    }
  );

  return { loading, error, data };
};
