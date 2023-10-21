import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { getImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
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
  AnimeTitleOnBanner,
} from '../styles/SingleAnimePageStyles';

const SingleAnime = ({
  data: {
    anilist: { Media: anime },
  },
  errors,
}) => {
  const {
    title: { romaji },
    startDate,
    bannerImageSharp,
    description,
    coverImage,
  } = anime;
  const imageBanner = getImage(bannerImageSharp?.childImageSharp.gatsbyImageData);
  const imageAvatar = getImage(coverImage.largeSharp.childImageSharp.gatsbyImageData);

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
    <Layout>
      <Seo title={romaji} />
      <AnimeContainer>
        {bannerImageSharp ? (
          <>
            <BannerContainer>
              <BannerImage image={imageBanner} alt={romaji} />
              <AnimeTitleOnBanner>{romaji}</AnimeTitleOnBanner>
              <BackButtonOnBanner onClick={() => window.history.back()}>Back</BackButtonOnBanner>
            </BannerContainer>
          </>
        ) : (
          <>
            <BackButton onClick={() => window.history.back()}>Back</BackButton>
            <AnimeTitle>{romaji}</AnimeTitle>
          </>
        )}
        <AnimeImage image={imageAvatar} alt={romaji} />
        <AnimeDate>Start Date: {formattedDate}</AnimeDate>
        <AnimeDescription>{parse(description)}</AnimeDescription>
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
        startDate {
          year
          month
          day
        }
        bannerImage
        bannerImageSharp {
          childImageSharp {
            gatsbyImageData(formats: [AUTO, WEBP, AVIF], placeholder: BLURRED)
          }
        }
        coverImage {
          large
          largeSharp {
            childImageSharp {
              gatsbyImageData(formats: [AUTO, WEBP, AVIF], placeholder: BLURRED, layout: FIXED)
            }
          }
        }
        description
      }
    }
  }
`;
