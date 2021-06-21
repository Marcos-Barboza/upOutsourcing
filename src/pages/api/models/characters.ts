import { Document, Schema, model, models } from 'mongoose';
import { CharacterDetails } from '../../../store/ducks/characters';

const CharactersSchema: Schema = new Schema({
  favorite: {
    type: Boolean
  },
  name: {
    type: String
  },
  height: {
    type: String
  },
  mass: {
    type: String
  },
  gender: {
    type: String
  },
  films: [
    {
      title: {
        type: String
      },
      releaseDate: {
        type: String
      }
    }
  ],
  species: [
    {
      name: {
        type: String
      }
    }
  ]
});

export default models.User || model<CharacterDetails & Document>('Characters', CharactersSchema);
