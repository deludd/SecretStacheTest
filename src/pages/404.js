import * as React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { NotFoundWrapper, NotFoundTitle, NotFoundText } from '../styles/NotFoundPageStyles';

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <NotFoundWrapper>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Ooops! Page not found...</NotFoundText>
    </NotFoundWrapper>
  </Layout>
);

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;
