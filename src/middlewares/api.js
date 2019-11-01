import { showMessage } from 'containers/commonState';
import { signOut } from 'containers/Login/loginState';

export default function api({ dispatch, getState }) {
  return next => async action => {
    const {
      types,        // 必需，[requestType, successType, failureType]，type: string or (dispatch, getState, [json]) => {}
      messages = [],    // [errorMessage(默认为data.message), successMessage(默认为空)]
      shouldCallAPI = () => true,   // getState => {}
      callAPI,      // 必需，getState => fetch()
      isSuccess = () => false,    // 成功判断条件，json => {}, 为 false 则使用 errno === 0 判断（判断 cms api 时要使用）
      successCallback = () => {},
      finalCallback = () => {},
      ...rest
    } = action;
    if (!(types && callAPI)) {
      // if not types supplied, or api calling not defined, stop calling, run next action in the queue
      return next(action);
    }

    if (!Array.isArray(types) || types.length !== 3 ||
      !types.every(type => (typeof type === 'string' || typeof type === 'function'))) {
      throw new Error('Expected types to be an array of three string or function.');
    }
    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState)) {
      // if the condition to call api is false, stop calling
      finalCallback();
      return;
    }

    const [requestType, successType, failureType] = types;
    const [errorMessage, successMessage] = messages;

    if (typeof requestType === 'function') {
      // if the type of the request actionType is function
      // run the request function straight away
      // this is useful for short/simple calls
      requestType(dispatch, getState);
    } else {
      // by default, use type attr and rest of the attr as api params
      dispatch({ ...rest, type: requestType });
    }

    try {
      const response = await callAPI(getState); // call the api which is defined by input: callAPI
      const json = await response.json();
      if (isSuccess(json) || (json.data && !json.errors)) {// if response is success
        if (typeof successType === 'function') {
          successType(dispatch, getState, json.data);
        } else {
          successMessage && dispatch(
            showMessage(
              typeof successMessage === 'function'
              ? successMessage(json.data)
              : successMessage
              , 'success'
            )
          );
          dispatch({
            ...rest,
            type: successType,
            payload: json.data
          });
        }
        await successCallback();
      } else { // if failed
        let errorInfo = '未知错误！';
        if (json.errors && json.errors.length > 0) {
          if (json.errors[0].message === 'Auth Error') { // not logined in or token error
            dispatch(signOut());
            return;
          } else {
            errorInfo = '';
            json.errors.forEach(item => {
              errorInfo += `${item.message}; `
            });
          }
        }
        if (typeof failureType === 'function') {
          failureType(dispatch, getState, errorInfo);
        } else {
          errorMessage && dispatch(
            showMessage(
              typeof errorMessage === 'function'
              ? errorMessage(errorInfo)
              : errorMessage
              , 'error'
            )
          );
          failureType && dispatch({
            ...rest,
            type: failureType,
            payload: errorInfo,
          });
        }
      }
      await finalCallback();
    } catch (e) {
      console.error(e);
      dispatch({ ...rest, type: failureType });
      if (e.toString() === 'Error: Fetch timeout') {
        dispatch(showMessage('请求超时，请您稍后重试', 'error'));
      } else {
        dispatch(showMessage('服务异常，未知错误，请您稍后重试', 'error'));
      }
    }
  };
}
