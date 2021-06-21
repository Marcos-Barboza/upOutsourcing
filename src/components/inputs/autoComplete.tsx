import { OutlinedTextFieldProps, TextField, TextFieldProps } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Option {
  title: string;
}

interface Props {
  options: Option[];
}

type OwnProps = TextFieldProps & Props;

const AutoComplete: React.FC<OwnProps> = ({ options, ...props }) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...(params as OutlinedTextFieldProps)} {...props} size="small" variant="outlined" />
      )}
    />
  );
};

export default AutoComplete;
