import { useSelector, useDispatch } from 'react-redux';
import { SimpleModal, DefaultButton } from '../../components';
import { RootState } from '../../store';
import { charactersCreators, characterDetails } from '../../store/ducks/characters';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  info: {
    marginBottom: '5px'
  },
  title: {
    fontWeight: 'bold'
  }
}));

const Details = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.character.showDetails).length > 0;
  const details = useSelector(characterDetails);

  const handleClose = () => {
    dispatch(charactersCreators.setShowDetails({ name: '' }));
  };

  const handleSave = () => {
    if (details) dispatch(charactersCreators.savingDetails({ details }));
  };

  return (
    <SimpleModal open={open} setClose={handleClose} title={details && details.name}>
      {details && (
        <div>
          <div className={classes.info}>
            <span className={classes.title}>Altura:</span> {details.height}cm
          </div>
          <div className={classes.info}>
            <span className={classes.title}>Peso:</span> {details.mass}kg
          </div>
          {details.species.length > 0 && (
            <div className={classes.info}>
              <span className={classes.title}>Especie:</span> {details.species[0].name}
            </div>
          )}
          <div style={{ marginBlock: '15px' }}>
            <div style={{ marginBottom: '5px' }} className={classes.title}>
              Filmes:
            </div>
            <div>
              {details.films.map((v) => (
                <div key={v.title}>
                  {v.releaseDate} - {v.title}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
            <DefaultButton color="secondary" onClick={handleClose} title="Cancelar" />
            <DefaultButton color="primary" onClick={handleSave} title="Salvar" />
          </div>
        </div>
      )}
    </SimpleModal>
  );
};

export default Details;
