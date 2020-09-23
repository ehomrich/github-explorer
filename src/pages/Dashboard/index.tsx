import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';

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
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const { data } = await api.get<Repository>(`repos/${newRepo}`);
    console.log(data);
    setRepositories([...repositories, data]);
    setNewRepo('');
  }

  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Dashboard</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          type="text"
          name="repository"
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(
          ({ full_name, description, owner: { avatar_url, login } }) => (
            <a key={full_name} href="teste">
              <img src={avatar_url} alt={login} />
              <div>
                <strong>{full_name}</strong>
                <p>{description}</p>
              </div>
              <FiChevronRight size="20" />
            </a>
          ),
        )}
      </Repositories>
    </>
  );
};

export default Dashboard;
