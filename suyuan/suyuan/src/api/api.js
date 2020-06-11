import axios from '../utils/axios'
// import axios from 'axios'


//登录
export function register(equipInfo) {
  return axios({
    method: 'POST',
    url: `/Userservice/register`,
    data: equipInfo
  });
}

//上传
export function upload(param) {
  return axios({
    method: 'POST',
    url: `/Videoservice/upload`,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    data: param,
    withCredentials:true
  });
}