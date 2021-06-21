import { put, select, all, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { charactersCreators, NamePayload, Character, CharacterDetails } from '../../ducks/characters';
import axios, { AxiosResponse } from 'axios';
import { CharactersRes } from '../../types/character';
import { RootState } from '../../index';
import { FilmRes } from '../../types/films';
import { SpeciesRes } from '../../types/species';
import moment from 'moment';

export function* findArrayUrls(arrayUrls: string[]) {
  const data = arrayUrls.map(function* (url) {
    return yield axios({
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET',
      url
    });
  });
  const res: AxiosResponse[] = yield all(data);
  return res;
}

export function* searchCharactersByName(action: PayloadAction<NamePayload>) {
  try {
    const req: AxiosResponse<CharactersRes> = yield axios({
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET',
      url: `https://swapi.dev/api/people/?search=${action.payload.name}`
    });
    if (req.status === 200) {
      const foundCharacters = req.data.results.map((v) => {
        const { name, height, mass, gender, films, species } = v;
        return { name, height, mass, gender, films, species };
      });
      yield put(charactersCreators.foundCharacters({ foundCharacters }));
    }
  } catch (error) {
    yield put(charactersCreators.charactersNotFound());
  }
}

export function* searchCharacterDetails(action: PayloadAction<NamePayload>) {
  try {
    const foundCharacters: Character[] = yield select((state: RootState) => state.character.foundCharacters);
    const details: CharacterDetails[] = yield select((state: RootState) => state.character.details);

    const checkConsult = details.find((v) => v.name === action.payload.name);
    const selectCharacter = foundCharacters.find((v) => v.name === action.payload.name);
    if (selectCharacter && !checkConsult) {
      const filmsRes: AxiosResponse<FilmRes>[] = yield call(findArrayUrls, selectCharacter.films);
      const speciesRes: AxiosResponse<SpeciesRes>[] = yield call(findArrayUrls, selectCharacter.species);

      const details: CharacterDetails = {
        ...selectCharacter,
        favorite: false,
        films: filmsRes.map((v) => {
          const { title, release_date } = v.data;
          return { title, releaseDate: moment(release_date, 'YYYY-MM-DD').format('DD/MM/YYYY') };
        }),
        species: speciesRes.map((v) => {
          const { name } = v.data;
          return { name };
        })
      };

      yield put(charactersCreators.foundCharacterDetails({ details }));
    } else {
      yield put(charactersCreators.setShowDetails({ name: action.payload.name }));
    }
  } catch (error) {
    yield put(charactersCreators.charactersNotFound());
  }
}
