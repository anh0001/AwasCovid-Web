import { fromJS, List, Map } from 'immutable';

import {
    FETCH_IMAGES_DATA,
    GET_USER_IMAGES_SUCCESS,
    GET_IMAGES_SUCCESS,
    GET_IMAGE,
    GET_IMAGE_SUCCESS,
    OPEN_GLOBAL_SETTING,
    CLOSE_GLOBAL_SETTING_FORM,
    OPEN_DEVICE_SETTING,
    CLOSE_DEVICE_SETTING_FORM,
} from './dashboardConstants';

export const initialState = {
    loading: false,
    deviceId: '',
    message: null,
    imageURL: null,
    status: '',
    globalSettingFormValues: Map(),
    deviceSettingFormValues: Map(),
    openGlobalSettingForm: false,
    openDeviceSettingForm: false,

    imagesList: List([]),
    imageIndex: 0,
    keywordValue: '',
};

const initialImmutableState = fromJS(initialState);

export default function dashboardReducer(state = initialImmutableState, action = {}) {
    switch (action.type) {
        case FETCH_IMAGES_DATA:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.items);
                mutableState.set('imagesList', items);
            });
        case GET_USER_IMAGES_SUCCESS:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.items);
                mutableState
                    .set('imagesList', items.get('images'))
                    .set('lastKeyRef', items.get('lastKeyRef'));
            });
        case GET_IMAGES_SUCCESS:
            return state.withMutations((mutableState) => {
                const items = fromJS(action.items);
                mutableState
                    .set('imagesList', items.get('images'))
                    .set('lastKeyRef', items.get('lastKeyRef'));
            });
        case GET_IMAGE:
            return state.withMutations((mutableState) => {
                mutableState
                    .set('loading', true)
                    .set('message', null)
                    .set('deviceId', action.deviceId);
            });

        case GET_IMAGE_SUCCESS:
            return state.withMutations((mutableState) => {
                const payload = fromJS(action.payload);
                mutableState
                    .set('loading', false)
                    .set('message', null)
                    .set('imageURL', payload.get('imageURL'))
                    .set('status', payload.get('status'));
            });

        case OPEN_GLOBAL_SETTING:
            return state.withMutations((mutableState) => {
                mutableState
                    .set('globalSettingFormValues', Map())
                    .set('openGlobalSettingForm', true);
            });

        case CLOSE_GLOBAL_SETTING_FORM:
            return state.withMutations((mutableState) => {
                mutableState
                    .set('globalSettingFormValues', Map())
                    .set('openGlobalSettingForm', false);
            });
        case OPEN_DEVICE_SETTING:
            return state.withMutations((mutableState) => {
                mutableState
                    .set('deviceSettingFormValues', Map())
                    .set('openDeviceSettingForm', true);
            });

        case CLOSE_DEVICE_SETTING_FORM:
            return state.withMutations((mutableState) => {
                mutableState
                    .set('deviceSettingFormValues', Map())
                    .set('openDeviceSettingForm', false);
            });

        default:
            return state;
    }
}
