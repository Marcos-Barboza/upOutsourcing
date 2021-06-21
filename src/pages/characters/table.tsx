import { SimpleTable } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  charactersSimpleTable,
  charactersSimpleTableFavorites,
  charactersCreators
} from '../../store/ducks/characters';

interface Props {
  favorites: boolean;
}

const Table: React.FC<Props> = ({ favorites }) => {
  const dispatch = useDispatch();
  const { heads, rows } = useSelector(favorites ? charactersSimpleTableFavorites : charactersSimpleTable);
  const handleOpenDetails = (row: string[]) => {
    dispatch(charactersCreators.searchCharacterDetailsByName({ name: row[0] }));
  };
  const handleDeleteDetails = (row: string[]) => {
    dispatch(charactersCreators.setDetailsSaved({ name: row[0], favorite: false }));
  };
  return (
    <SimpleTable
      heads={heads}
      rows={rows}
      rowSelected={handleOpenDetails}
      rowDeleted={handleDeleteDetails}
      buttonActions={favorites}
    />
  );
};

export default Table;
