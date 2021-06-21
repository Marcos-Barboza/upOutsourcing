import { FoundCharacterDetails } from '../../ducks';
import { PayloadAction } from '@reduxjs/toolkit';
import { charactersCreators } from '../../ducks/characters';
import { put } from 'redux-saga/effects';

export function* savingDetails(action: PayloadAction<FoundCharacterDetails>) {
  try {
    // const req: AxiosResponse<FoundCharacterDetails> = yield api.post('characters', {
    //   data: { ...action.payload.details, favorite: true }
    // });

    yield put(charactersCreators.setDetailsSaved({ name: action.payload.details.name, favorite: true }));
  } catch (error) {
    yield put(charactersCreators.charactersNotFound());
  }
}
