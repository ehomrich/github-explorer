import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, InputError } from './styles';

import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GitHubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const { data } = await api.get<Repository>(`repos/${newRepo}`);
      setRepositories([...repositories, data]);
      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('Repositório não encontrado');
    }
  }

  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Dashboard</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          type="text"
          name="repository"
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <InputError>{inputError}</InputError>}

      <Repositories>
        {repositories.map(
          ({ full_name, description, owner: { avatar_url, login } }) => (
            <Link key={full_name} to={`/repositories/${full_name}`}>
              <img src={avatar_url} alt={login} />
              <div>
                <strong>{full_name}</strong>
                <p>{description}</p>
              </div>
              <FiChevronRight size="20" />
            </Link>
          ),
        )}
      </Repositories>
    </>
  );
};

export default Dashboard;
