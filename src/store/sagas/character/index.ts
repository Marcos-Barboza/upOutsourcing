import { takeLatest } from 'redux-saga/effects';
import { charactersCreators } from '../../ducks/characters';
import { searchCharactersByName, searchCharacterDetails } from './find';
import { savingDetails } from './save';

export default function* watcherAuth() {
  yield takeLatest(charactersCreators.searchCharactersByName, searchCharactersByName);
  yield takeLatest(charactersCreators.searchCharacterDetailsByName, searchCharacterDetails);
  yield takeLatest(charactersCreators.savingDetails, savingDetails);
}
