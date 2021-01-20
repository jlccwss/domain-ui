import Vue from 'vue';

const notificationFactory = (() => {
  const instances = {};

  const error = (message) => {
    const previous = instances[message];

    if (previous) {
      previous.close();
    }
    return (instances[message] = Vue.prototype.$notify.error({
      title: '',
      message,
      onClose: () => delete instances[message]
    }));
  };

  return { error };
})();

export function errorInterceptor(error) {
  // case, error thrown in request interceptor
  if (error.isAxiosError) {
    
    let response = error.response ||
        {
          status: -1,
          config: error.config,
          statusText: '<empty response>'
        };

    notificationFactory.error(response.status + ',' + response.statusText);
  }
  return Promise.reject(error);
}


export function responseInterceptor(response) {
  // status may be changed after call it
  if (response.status !== 200) {
    notificationFactory.error(response.statusText);
  }
  return response;
}