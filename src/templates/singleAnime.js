import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import {
  AnimeContainer,
  AnimeTitle,
  BannerContainer,
  BannerImage,
  AnimeImage,
  AnimeDate,
  AnimeDescription,
  BackButton,
  BackButtonOnBanner,
  AnimeTitleOnBanner
} from '../styles/SingleAnimePageStyles';

const SingleAnime = ({ data: { anilist: { Media: anime } }, errors }) => {

  const hasBanner = anime.bannerImage ? true : false;

  if (errors) {
    console.error(errors);
    return (
      <Layout>
        <Seo title="Error" />
        <p>There was an error fetching the anime details. Please try again later.</p>
      </Layout>
    );
  }

  const formattedDate = `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}`;

  return (
    <Layout>
      <Seo title={anime.title.romaji} />
      <AnimeContainer>
        {hasBanner ? (
          <BannerContainer>
            <BannerImage src={anime.bannerImage} alt={anime.title.romaji} />
            <AnimeTitleOnBanner>{anime.title.romaji}</AnimeTitleOnBanner>
            <BackButtonOnBanner onClick={() => window.history.back()}>Back</BackButtonOnBanner>
          </BannerContainer>
        ) : (
          <>
            <BackButton onClick={() => window.history.back()}>Back</BackButton>
            <AnimeTitle>{anime.title.romaji}</AnimeTitle>
          </>
        )}
        <AnimeImage src={anime.coverImage.large} alt={anime.title.romaji} />
        <AnimeDate>Start Date: {formattedDate}</AnimeDate>
        <AnimeDescription>{anime.description}</AnimeDescription>
      </AnimeContainer>
    </Layout>
  );
};

export default SingleAnime;

export const pageQuery = graphql`
  query ($id: Int!) {
    anilist {
      Media(id: $id) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        startDate {
          year
          month
          day
        }
        description
        bannerImage
      }
    }
  }
`;
