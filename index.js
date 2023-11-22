import axios from 'axios';

function RemotePackage(remotepackage) {
 
  return new Proxy(
    {},
    {
      get(target, action) {
        return function (data = {}) {
          return new Promise((resolve, reject) => {
            const axiosConfig = {
              method: 'post',
              url: remotepackage,
              data: {
                _action: action,
                _data: data
              },
            };
            axios(axiosConfig)
              .then(response => {
                if (response.data.action) {
                  resolve(response.data);
                } else {
                  reject(response.data);
                }
              })
              .catch(()=> {
                reject({
                  "action": false,
                  "reason": 'NETWORK_ERROR'
                });
              });
          });
        };
      },
    }
  );
}


export default RemotePackage;