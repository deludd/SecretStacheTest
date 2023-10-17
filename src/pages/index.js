import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';

import { Container, Paper, Subtitle, ButtonGroup, ExploreButton } from '../styles/IndexPageStyles';

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <Container>
        <Paper>
          <Subtitle>Welcome to a AnimeStache Project</Subtitle>
          <ButtonGroup>
            <ExploreButton href="/anime/all/page=1">Explore</ExploreButton>
          </ButtonGroup>
        </Paper>
      </Container>
    </Layout>
  );
};

export default IndexPage;
