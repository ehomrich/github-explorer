import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <>
      <Header>
        <img src={logoImg} alt="GitHub Explorer" />
        <Link to="/dashboard">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      <h1>{`Repository: ${params.repository}`}</h1>

      <RepositoryInfo>
        <header>
          <img src={logoImg} alt="GitHub Explorer" />
          <div>
            <strong>rocket</strong>
            <p>foo</p>
          </div>
        </header>

        <ul>
          <li>
            <strong>188</strong>
            <span>stars</span>
          </li>
          <li>
            <strong>188</strong>
            <span>forks</span>
          </li>
          <li>
            <strong>188</strong>
            <span>issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="/">
          <div>
            <strong>full_name</strong>
            <p>description</p>
          </div>
          <FiChevronRight size="20" />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
