import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ViewList from '@material-ui/icons/ViewList';
import GridOn from '@material-ui/icons/GridOn';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './search-jss';

class SearchImage extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      classes,
      // removeItem,
      search,
      keyword,
      dataImages,
      handleSwitchView,
      listView,
      intl,
    } = this.props;

    const getTotalResult = dataArray => {
      let totalResult = 0;
      for (let i = 0; i < dataArray.size; i += 1) {
        if (dataArray.getIn([i, 'name']) === undefined) {
          return false;
        }
        if (dataArray.getIn([i, 'name']).toLowerCase().indexOf(keyword) !== -1) {
          totalResult += 1;
        }
      }
      return totalResult;
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.searchBar}>
            <div className={classes.flex}>
              <div className={classes.wrapper}>
                <div className={classes.search}>
                  <SearchIcon />
                </div>
                <input className={classes.input} placeholder={intl.formatMessage(messages.placeholder)} onChange={(event) => search(event)} />
              </div>
            </div>
            <Typography variant="caption" className={classes.result}>
              {getTotalResult(dataImages)}
              &nbsp;
              <FormattedMessage {...messages.result} />
            </Typography>
            <Hidden mdDown>
              <div className={classes.toggleContainer}>
                <ToggleButtonGroup value={listView} exclusive onChange={handleSwitchView}>
                  <ToggleButton classes={{ selected: classes.selected }} value="grid">
                    <GridOn />
                  </ToggleButton>
                  <ToggleButton classes={{ selected: classes.selected }} value="list">
                    <ViewList />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchImage.propTypes = {
  classes: PropTypes.object.isRequired,
  // removeItem: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  dataImages: PropTypes.object.isRequired,
  handleSwitchView: PropTypes.func.isRequired,
  listView: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(SearchImage));
