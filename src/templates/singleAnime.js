import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import parse from 'html-react-parser';
import Seo from '../components/seo';
import {
  AnimeContainer,
  AnimeTitle,
  BannerContainer,
  BannerImage,
  AnimeDate,
  AnimeDescription,
  BackButton,
  BackButtonOnBanner,
  AnimeTitleOnBanner,
} from '../styles/SingleAnimePageStyles';

const SingleAnime = ({
  data: {
    anilist: { Media: anime },
  },
  errors,
}) => {
  const {
    title: { userPreferred },
    startDate,
    bannerImage,
    coverImage: { large: coverImage },
    description,
  } = anime;
  const currentId = anime.id;

  if (errors) {
    return (
      <Layout>
        <Seo title="Error" />
        <p>There was an error fetching the anime details. Please try again later.</p>
      </Layout>
    );
  }

  const formattedDate = `${startDate.year}-${startDate.month}-${startDate.day}`;

  return (
    <Layout currentId={currentId}>
      <Seo title={userPreferred} />
      <AnimeContainer>
        {bannerImage ? (
          <>
            <BannerContainer>
              <BannerImage src={bannerImage} alt={userPreferred}/>
              <AnimeTitleOnBanner>{userPreferred}</AnimeTitleOnBanner>
              <BackButtonOnBanner onClick={() => window.history.back()}>Back</BackButtonOnBanner>
            </BannerContainer>
          </>
        ) : (
          <>
            <BackButton onClick={() => window.history.back()}>Back</BackButton>
            <AnimeTitle>{userPreferred}</AnimeTitle>
          </>
        )}
        <img src={coverImage} alt={userPreferred}/>
        <AnimeDate>Start Date: {formattedDate}</AnimeDate>
        <AnimeDescription>{description ? parse(description) : ''}</AnimeDescription>
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
          userPreferred
        }
        startDate {
          year
          month
          day
        }
        bannerImage
        coverImage {
          large
        }
        description
      }
    }
  }
`;
