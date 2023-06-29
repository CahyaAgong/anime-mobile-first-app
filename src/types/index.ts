import React, { MouseEventHandler } from 'react';

export interface Anime {
  id: string;
  title: {
    romaji: string;
    native: string;
  };
  description: string;
  coverImage: {
    medium: string;
    large: string;
    extraLarge: string;
  };
}

export interface AnimeListData {
  Page: {
    pageInfo: {
      total: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
      perPage: number;
    };
    media: Anime[];
  };
}

export interface PageParams {
  page: number;
  perPage: number;
  currentPage: number;
}

export interface AnimeInCollection {
  Media: {
    id: number;
    title: {
      romaji: string;
      native: string;
    };
    description: string;
    coverImage: {
      medium: string;
      large: string;
      extraLarge: string;
    };
    seasonYear: string;
    bannerImage: string;
    meanScore: number;
    favourites: number;
    popularity: number;
    trending: number;
    genres: string[];
  };
  sequences: number;
}

export interface Collections {
  collectionName: string;
  firstAnime: AnimeInCollection;
}

// ========== props for components ==========

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ButtonProps {
  isDisabled?: boolean;
  btnType?: 'button' | 'submit';
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  styling?: string;
}
