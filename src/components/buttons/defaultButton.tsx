import { Button, ButtonProps } from '@material-ui/core';

interface Props {
  title: string;
}
type OwnProps = ButtonProps & Props;

const DefaultButton: React.FC<OwnProps> = ({ ...props }) => {
  return (
    <Button {...props} variant="contained">
      {props.title}
    </Button>
  );
};

export default DefaultButton;
