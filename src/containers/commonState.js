import { fromJS } from 'immutable';

const variants =[
  'default',
  'success',
  'error',
  'warning',
  'info'
]

export const initialState = fromJS({
  message: '',
  variant: '',
  snackbar: {
    open: false,
    completed: 5,
    buffer: 5,
    order_num: '',
    route_id: '',
  }
});

export const SHOW_MESSAGE = "COMMON/SHOW_MESSAGE";
export const SNACKBAR_CHANGE = "COMMON/SNACKBAR_CHANGE";

export const showMessage = (message, variant) => ({
  type: SHOW_MESSAGE,
  payload: {
    message,
    variant: variants.includes(variant) ? variant : 'default' },
});

export const changeSnackBar = (snackbar) => ({
  type: SNACKBAR_CHANGE,
  payload: { snackbar },
});

export const closeSnackBar = () => ({
  type: SNACKBAR_CHANGE,
  payload: { snackbar: { open: false } },
});

export default function commonReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SHOW_MESSAGE:
      return state.merge({
        message: payload.message,
        variant: payload.variant,
        date: new Date()
      });
    case SNACKBAR_CHANGE:
      return state.mergeIn(['snackbar'], payload.snackbar);
    default:
      return state;
  }
}