import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ImageCard from '../CardPaper/ImageCard';

class ImageGallery extends React.Component {
  state = {
    open: false,
  }

  // handleDetailOpen = (product) => {
  //   const { showDetail } = this.props;
  //   this.setState({ open: true });
  //   showDetail(product);
  // };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { open } = this.state;
    const {
      dataImages,
      imageIndex,
      keyword,
      listView,
      covidIsDetected,
    } = this.props;

    // console.log('dataproduct: ', dataProduct);

    return (
      <div>
        {/* <ProductDetail
          open={open}
          close={this.handleClose}
          detailContent={dataProduct}
          imageIndex={imageIndex}
          handleAddToCart={handleAddToCart}
          noCart={noCart}
        /> */}
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={3}
        >
          {
            dataImages.map((item, index) => {
              if (item.get('status').toLowerCase().indexOf(keyword) === -1) {
                return false;
              }

              const status = JSON.parse(item.get('status'));

              return (
                <Grid item md={listView === 'list' ? 12 : 4} sm={listView === 'list' ? 12 : 6} xs={12} key={index.toString()}>
                  <ImageCard
                    covid_is_detected={status.status !== 'normal'}
                    image={item.get('photo_output_filename')}
                    title={item.get('device_id')}
                  >
                    {'Dev_id = ' + item.get('device_id') + ', '}
                    {'Image_id = ' + item.get('image_id') + ', '}
                    {'Date = ' + item.get('date_created')}
                  </ImageCard>
                </Grid>
              );
            })
          }
        </Grid>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  dataImages: PropTypes.object.isRequired,
  imageIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired,
};

ImageGallery.defaultProps = {
  
};

export default ImageGallery;
