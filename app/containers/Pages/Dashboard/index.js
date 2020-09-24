import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import CompossedLineBarArea from './CompossedLineBarArea';
import StrippedTable from '../Table/StrippedTable';
import { Base64 } from 'js-base64';

import Axios from 'axios';

import {
  Grid,
} from '@material-ui/core';

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerVal: parseInt(props.startTimeInSeconds, 10) || 0,
      imgUrl: {},
      status: 'buffering',
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
    this.interval = setInterval(() => this.tick(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const title = brand.name + ' - Dashboard';
    const description = brand.desc;
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
            <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
              {/* <Grid item xs={12} sm={8} md={5}> */}
              <Grid item xs={12}>
                <img src={this.state.imgUrl} width='100%' />
              </Grid>
            </Grid>
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

export default BasicTable;
