import { Link } from '@material-ui/core';
import Find from './find';
import Table from './table';
import Details from './details';
import { useState } from 'react';
import { DefaultButton } from '../../components';

const Index: React.FC = () => {
  const [favorites, setFavorites] = useState(false);

  return (
    <div style={{ padding: '30px', width: '45%' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link target="brank" href="https://up-outsourcing.vercel.app/">
          UP Outsourcing - Processo Seletivo
        </Link>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <DefaultButton
          style={{ marginRight: '10px' }}
          color={favorites ? 'default' : 'primary'}
          title="Consultar"
          onClick={() => setFavorites(false)}
        />
        <DefaultButton color={favorites ? 'primary' : 'default'} title="Favoritos" onClick={() => setFavorites(true)} />
      </div>
      <div style={{ marginBottom: '10px' }}>{!favorites && <Find />}</div>
      <Table favorites={favorites} />
      <Details favorites={favorites} />
    </div>
  );
};

export default Index;
