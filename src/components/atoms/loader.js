import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Colors } from '../../config';

const Loader = withStyles({
  root: {
    color: Colors.PRIMARY,
  },
})(CircularProgress);

export default Loader;
