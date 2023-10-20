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

const imageBanner = getImage(anime.bannerImageSharp?.childImageSharp.gatsbyImageData);
const imageAvatar = getImage(anime.coverImage.largeSharp.childImageSharp.gatsbyImageData);

const hasBanner = anime.bannerImageSharp ? true : false;

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
            <BannerImage image={imageBanner} alt={anime.title.romaji} />
            <AnimeTitleOnBanner>{anime.title.romaji}</AnimeTitleOnBanner>
            <BackButtonOnBanner onClick={() => window.history.back()}>Back</BackButtonOnBanner>
          </BannerContainer>
        ) : (
          <>
            <BackButton onClick={() => window.history.back()}>Back</BackButton>
            <AnimeTitle>{anime.title.romaji}</AnimeTitle>
          </>
        )}
        <AnimeImage image={imageAvatar} alt={anime.title.romaji} />
        <AnimeDate>Start Date: {formattedDate}</AnimeDate>
        <AnimeDescription>{parse(`${anime.description}`)}</AnimeDescription>
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
