import {
    call, fork, put, take, takeLatest, takeEvery, select
} from 'redux-saga/effects';
import { firebase } from '../../../../firebase';
import history from 'utils/history';
import axios from 'axios';
import {
    GET_IMAGE,
    GET_USER_IMAGES,
    UPLOAD_DETECTED_IMAGE_TO_FIREBASE,
} from './dashboardConstants';
import {
    getImageSuccessAction,
    getUserImagesSuccessAction,
} from './dashboardActions';

const reducerKey = 'dashboardReducer';
export const getImageURL = (state) => state.get(reducerKey).imageURL;

function* getImageSaga({ deviceId, imageType }) {
    try {
        let imageURL = yield select(getImageURL);

        const response = yield call(() => axios.get('http://localhost:8000/api/image/', {
            params: {
                device_id: deviceId,
                image_type: imageType,
            },
            responseType: 'blob',
        }));

        if (response.headers.status) {
            imageURL = response.data;
        }

        yield put(getImageSuccessAction({ imageURL: imageURL, status: response.headers.status }));

    } catch (error) {
        console.log(error);
        // yield put(getUserProfileError(error));
    }
}

function* getUserImagesSaga({ username, lastRef }) {
    try {
        // console.log('userid: ', userUid);
        // console.log('lastRef: ', lastRef);
        const result = yield call(firebase.getUserImages, username, lastRef);
        // console.log('result: ', result);

        yield put(getUserImagesSuccessAction({
            images: result.images,
            lastKeyRef: result.lastKey ? result.lastKey : null,
            total: result.total ? result.total : 0
        }));
    } catch (error) {
        console.log(error);
    }
}

function* uploadDetectedImage2FirebaseSaga({ userId, deviceId, imageId }) {
    try {
        // console.log('uploadDetectedImage2FirebaseSaga userid ', userId);
        // console.log('uploadDetectedImage2FirebaseSaga deviceId ', deviceId);
        // console.log('uploadDetectedImage2FirebaseSaga imageId ', imageId);

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('device_id', deviceId);
        formData.append('image_id', imageId);
        const response = yield call(() => axios.post('http://localhost:8000/api/imageupload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));

    } catch (error) {
        console.log(error);
    }
}

//= ====================================
//  WATCHERS
//-------------------------------------

export default function* dashboardRootSaga() {
    // yield takeEvery(GET_IMAGE, getImageSaga);
    yield takeEvery(UPLOAD_DETECTED_IMAGE_TO_FIREBASE, uploadDetectedImage2FirebaseSaga);
    yield takeLatest(GET_USER_IMAGES, getUserImagesSaga);
}