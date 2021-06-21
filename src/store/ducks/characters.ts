import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '..';
import { SimpleTableProps } from '../../components/tables/simpleTable';

export interface NamePayload {
  name: string;
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
  species: string[];
}

interface Film {
  title: string;
  releaseDate: string;
}

interface Specie {
  name: string;
}

export interface CharacterDetails {
  favorite: boolean;
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: Film[];
  species: Specie[];
}

export interface FoundCharacterDetails {
  details: CharacterDetails;
  favorite?: boolean;
}

export interface FoundCharacters {
  foundCharacters: Character[];
}

export interface SetDetailsSaved {
  name: string;
  favorite: boolean;
}

export type SetShowDetails = NamePayload;
export interface CharactersState {
  load: boolean;
  status:
    | 'lookingForCharacters'
    | 'foundCharacters'
    | 'charactersNotFound'
    | 'lookingForCharacterDetails'
    | 'foundCharacterDetails'
    | 'detailsSaved'
    | 'savingDetails'
    | '';
  findName: string;
  showDetails: string;
  details: CharacterDetails[];
  foundCharacters: Character[];
}

const initialState: CharactersState = {
  load: false,
  status: '',
  findName: '',
  showDetails: '',
  details: [],
  foundCharacters: []
};

const characters = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    searchCharactersByName(state, action: PayloadAction<NamePayload>) {
      return { ...state, load: true, status: 'lookingForCharacters', findName: action.payload.name };
    },
    foundCharacters(state, action: PayloadAction<FoundCharacters>) {
      return { ...state, load: false, status: 'foundCharacters', foundCharacters: action.payload.foundCharacters };
    },
    charactersNotFound(state) {
      state.load = false;
      state.status = 'charactersNotFound';
    },
    searchCharacterDetailsByName(state, action: PayloadAction<NamePayload>) {
      return { ...state, load: true, status: 'lookingForCharacterDetails', findName: action.payload.name };
    },
    foundCharacterDetails(state, action: PayloadAction<FoundCharacterDetails>) {
      return {
        ...state,
        load: false,
        status: 'foundCharacterDetails',
        showDetails: action.payload.details.name,
        details: [...state.details, action.payload.details]
      };
    },
    setShowDetails(state, action: PayloadAction<NamePayload>) {
      return {
        ...state,
        load: false,
        status: 'foundCharacterDetails',
        showDetails: action.payload.name
      };
    },
    setDetailsSaved(state, action: PayloadAction<SetDetailsSaved>) {
      const findIndexDetails = state.details.findIndex((v) => v.name === action.payload.name);
      if (findIndexDetails !== -1) {
        state.showDetails = '';
        state.details[findIndexDetails].favorite = action.payload.favorite;
      }
      return state;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    savingDetails(state, action: PayloadAction<FoundCharacterDetails>) {
      return {
        ...state,
        load: true,
        status: 'savingDetails'
      };
    }
  }
});

export const charactersOptions = createSelector([(state: RootState) => state.character.foundCharacters], (characters) =>
  characters.map((v) => ({ title: v.name }))
);

export const characterDetails = createSelector([(state: RootState) => state.character], (character) => {
  const findDetails = character.details.find((v) => v.name === character.showDetails);
  return findDetails;
});

export const charactersSimpleTable = createSelector(
  [(state: RootState) => state.character.foundCharacters],
  (characters) =>
    characters.reduce(
      (acc: SimpleTableProps, cur) => {
        acc.rows.push([cur.name]);
        return acc;
      },
      { heads: ['Nome'], rows: [] }
    )
);

export const charactersSimpleTableFavorites = createSelector(
  [(state: RootState) => state.character.details],
  (characters) =>
    characters.reduce(
      (acc: SimpleTableProps, cur) => {
        if (cur.favorite) acc.rows.push([cur.name]);
        return acc;
      },
      { heads: ['Nome', '', ''], rows: [] }
    )
);

export const charactersCreators = characters.actions;

export default characters.reducer;
