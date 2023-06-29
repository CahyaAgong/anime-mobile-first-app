import { useEffect } from 'react';
import { useFetchAnimeList } from '../actions/dataProvider';

import { Link } from 'react-router-dom';
import { Button, Footer, Navbar, SearchBar } from '../components';

/** @jsxImportSource @emotion/react */
import { container, animeCardContainer, animeCard } from '../assets/styles';
import Loading from '../components/Loading';

const AnimeList = () => {
  const { loading, error, animeList, handleMoreData, isFetching } =
    useFetchAnimeList();

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  if (animeList.length < 1) return <div>No anime found.</div>;

  return (
    <div css={container}>
      <Navbar />

      <SearchBar />

      <div css={animeCardContainer}>
        {animeList.map(anime => (
          <div key={anime.id}>
            <Link to={`/anime/${anime.id}`}>
              <div css={animeCard}>
                <img
                  src={anime.coverImage?.extraLarge}
                  alt={`${anime.title?.romaji} covers`}
                />
                <div>
                  <h2>{anime.title?.romaji}</h2>
                  {/* <p>{anime.description}</p> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Button
        isDisabled={isFetching}
        title={isFetching ? 'Loading...' : 'Load More'}
        handleClick={handleMoreData}
      />

      <Footer />
    </div>
  );
};

export default AnimeList;
