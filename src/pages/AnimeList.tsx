import { HelmetProvider, Helmet } from 'react-helmet-async';

import { useFetchAnimeList } from '../actions/dataProvider';

import { Link } from 'react-router-dom';
import { Button, Footer, Navbar, SearchBar } from '../components';

/** @jsxImportSource @emotion/react */
import { container, animeCardContainer, animeCard } from '../assets/styles';
import Loading from '../components/Loading';

const AnimeList = () => {
  const { loading, animeList, handleMoreData, isFetching } =
    useFetchAnimeList();

  if (loading) return <Loading />;

  return (
    <HelmetProvider>
      <Helmet>
        {animeList.map(anime => (
          <link
            rel='preload'
            as='image'
            href={anime.coverImage?.extraLarge}
            key={anime.id}
          />
        ))}
      </Helmet>
      <div css={container}>
        <Navbar />

        <SearchBar />

        <div css={animeCardContainer}>
          {animeList.length > 0 ? (
            animeList.map(anime => (
              <div key={anime.id}>
                <Link to={`/anime/${anime.id}`}>
                  <div css={animeCard}>
                    <div>
                      <img
                        src={anime.coverImage?.medium}
                        alt={`${anime.title?.romaji ?? ''} covers`}
                      />
                    </div>
                    <div>
                      <h2>{anime.title?.romaji ?? ''}</h2>
                      <span>Episodes : {anime.episodes ?? 0}</span>
                      <div>
                        <h3>Tags:</h3>
                        {anime.tags.length > 0
                          ? anime.tags
                              .slice(0, 2)
                              .map(item => (
                                <span key={item.name}>{item.name}</span>
                              ))
                          : ''}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>No Anime / Manga Available...</div>
          )}
        </div>

        {animeList.length > 0 && (
          <Button
            isDisabled={isFetching}
            title={isFetching ? 'Loading...' : 'Load More'}
            handleClick={handleMoreData}
          />
        )}
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default AnimeList;
