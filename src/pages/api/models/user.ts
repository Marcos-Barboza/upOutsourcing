import { Document, Schema, model, models } from 'mongoose';

export interface UserInterface {
  name?: string;
  email?: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  }
});

export default models.User || model<UserInterface & Document>('User', UserSchema);
