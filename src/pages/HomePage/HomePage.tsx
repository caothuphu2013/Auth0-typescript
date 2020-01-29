import React from 'react';
import Header from '../../components/Header/Header';

interface IProps {
  title?: string;
}

const HomePage: React.FC<IProps> = (props: IProps) => (
  <Header />
);

HomePage.defaultProps = {
  title: 'Login Page'
}

export default HomePage;