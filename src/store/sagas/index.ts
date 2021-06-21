import { all } from 'redux-saga/effects';
import watcherCharacter from './character';

export default function* sagas() {
  yield all([watcherCharacter()]);
}
