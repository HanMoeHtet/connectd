import { makeStyles } from '@material-ui/core';

const useProgressButtonStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-18px',
    marginLeft: '-18px',
  },
}));

export default useProgressButtonStyles;
