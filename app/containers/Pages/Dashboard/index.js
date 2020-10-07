import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  PapperBlock,
  GlobalSetting,
  ImageCard,
  ImageGallery,
} from 'enl-components';

import reducer from './reducers/dashboardReducers';
import saga from './reducers/dashboardSagas';

import CompossedLineBarArea from './CompossedLineBarArea';
import StrippedTable from '../Table/StrippedTable';
import { Base64 } from 'js-base64';

import Axios from 'axios';

import {
  openGlobalSettingAction,
  closeGlobalSettingFormAction,
  getUserImagesAction,
} from './reducers/dashboardActions';


import {
  Grid,
} from '@material-ui/core';

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerVal: parseInt(props.startTimeInSeconds, 10) || 0,
      listView: 'grid',
    };
  }

  tick() {
    // Axios.get('http://localhost:8000/api/image/', {
    //   params: {
    //     device_id: '0001',
    //   },
    //   responseType: 'blob',
    // }).then(resp => {
    //   if (resp.headers.status === 'success') {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', (e) => {
    //       this.setState({
    //         imgUrl: e.target.result,
    //         status: 'success',
    //       });
    //     });
    //     reader.readAsDataURL(resp.data);
    //   } else {
    //     this.setState({
    //       status: 'buffering',
    //     });
    //   }
    // });

    this.setState(state => ({
      timerVal: state.timerVal + 1
    }));
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 2000);
    if (this.props.username) {
      this.props.getUserImagesHandler(this.props.username, null);
      // console.log('componentDidMount');
      // console.log(this.props.user);
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.username && !prevProps.username) {
      this.props.getUserImagesHandler(this.props.username, null);
      // console.log('componentDidUpdate getUserProducts');
    };
  };

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  saveGlobalSetting = (items) => {
    const values = items.toJS();
    // console.log('items: ', values);
    if (!values) {
      this.setState({ imageType: 'photo', scaleImage: values.scaleImage });
    } else if (values.photoOrThermal) {
      this.setState({ imageType: 'thermal', scaleImage: values.scaleImage });
    } else {
      this.setState({ imageType: 'photo', scaleImage: values.scaleImage });
    }
    this.props.closeGlobalSettingFormHandler();
  }

  handleSwitchView = (event, value) => {
    this.setState({
      listView: value
    });
  }

  render() {
    const title = brand.name + ' - Dashboard';
    const description = brand.desc;

    const {
      scaleImage,
      listView,
    } = this.state;

    const {
      openGlobalSettingHandler,
      openGlobalSettingForm,
      closeGlobalSettingFormHandler,
      dataImages,
      imageIndex,
      keyword,
    } = this.props;

    // console.log('dataImages: ', this.props.dataImages);

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Monitoring" icon="camera_alt" desc="" overflowX>
          <div>
            <ImageGallery
              listView={listView}
              dataImages={dataImages}
              imageIndex={imageIndex}
              keyword={keyword}
            />

            {/* <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
              <Grid item xs={scaleImage}>
                {this.state.imageURL ?
                  <ImageCard
                    covid_is_detected={status.status !== 'normal'}
                    image={this.state.imageURL}
                    title="Device-Id = 0001"
                  >
                    Id = 0001
                  </ImageCard> : null}
              </Grid>

              <Grid item xs={scaleImage}>
                {this.state.imageURL ?
                  <ImageCard
                    covid_is_detected={status.status !== 'normal'}
                    image={this.state.imageURL}
                    title="Device-Id=0002"
                  >
                    Id = 0002
                  </ImageCard> : null}
              </Grid>
            </Grid> */}

            <GlobalSetting
              openSetting={openGlobalSettingHandler}
              openForm={openGlobalSettingForm}
              closeForm={closeGlobalSettingFormHandler}
              submit={this.saveGlobalSetting}
            />
          </div>
        </PapperBlock>
        {/* <PapperBlock title="Table" whiteBg icon="grid_on" desc="UI Table when no data to be shown">
          <div>
            <StrippedTable />
          </div>
        </PapperBlock> */}
      </div>
    );
  }
}

BasicTable.propTypes = {
  username: PropTypes.string.isRequired,
  imageURL: PropTypes.object,
  openGlobalSettingHandler: PropTypes.func.isRequired,
  openGlobalSettingForm: PropTypes.bool.isRequired,
  closeGlobalSettingFormHandler: PropTypes.func.isRequired,
  dataImages: PropTypes.object.isRequired,
  imageIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  getUserImagesHandler: PropTypes.func.isRequired,
};

BasicTable.defaultProps = {
  imageURL: null,
  openGlobalSettingForm: false,
  username: '',
};

const authReducerKey = 'authReducer';
const reducerKey = 'dashboardReducer';
const sagaKey = reducerKey;

const mapStateToProps = state => ({
  username: state.get(authReducerKey).username,
  imageURL: state.getIn([reducerKey, 'imageURL']),
  openGlobalSettingForm: state.getIn([reducerKey, 'openGlobalSettingForm']),
  dataImages: state.getIn([reducerKey, 'imagesList']),
  imageIndex: state.getIn([reducerKey, 'imageIndex']),
  keyword: state.getIn([reducerKey, 'keywordValue']),
  ...state
});

const mapDispatchToProps = dispatch => ({
  openGlobalSettingHandler: () => dispatch(openGlobalSettingAction),
  closeGlobalSettingFormHandler: () => dispatch(closeGlobalSettingFormAction),
  getUserImagesHandler: bindActionCreators(getUserImagesAction, dispatch),
});

const withReducer = injectReducer({ key: reducerKey, reducer });
const withSaga = injectSaga({ key: sagaKey, saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(BasicTable);
