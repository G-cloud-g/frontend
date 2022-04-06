import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { updateFeedBack } from '/src/Redux/action/utils.action';
import { connect } from 'react-redux';

import { green, amber } from '@mui/material/colors';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
          size="large"
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

MySnackbarContent.defaultProps = {
  onClose: () => {},
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles = (theme) => ({
  snackbar: {
    margin: theme.spacing(1),
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)} 0`,
  },
  margin: {
    margin: theme.spacing(1),
  },
});

class StyledNotif extends React.Component {
  state = {
    openStyle: false,
  };

  handleClickStyle = () => {
    this.setState({ openStyle: true });
  };

  handleCloseStyle = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openStyle: false });
  };

  render() {
    return (
      <Snackbar
        style={{ zIndex: 2000 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={this.props.snackbar}
        autoHideDuration={6000}
        onClose={() => this.props.updateFeedBack({ snackbar: false })}
      >
        <div>
          <MySnackbarContentWrapper
            onClose={() => this.props.updateFeedBack({ snackbar: false })}
            variant={this.props.type}
            message={this.props.message}
          />
        </div>
      </Snackbar>
    );
  }
}

StyledNotif.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    ...state.feedback,
  };
};

export default connect(mapStateToProps, { updateFeedBack })(
  withStyles(styles)(StyledNotif)
);
