import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete } from '../../components';
import { charactersCreators, charactersOptions } from '../../store/ducks';

const Find: React.FC = () => {
  const options = useSelector(charactersOptions);
  const dispatch = useDispatch();

  const handleShowValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(charactersCreators.searchCharactersByName({ name: e.target.value }));
  };

  return <AutoComplete options={options} label="Consultar" onChange={handleShowValue} />;
};

export default Find;
