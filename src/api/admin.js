import request from '@/utils/request'

export function login(data) {
  return new Promise((resolve, reject) => {
    request({
      url: 'admin/login',
      method: 'post',
      data
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export async function getAdminInfo() {
  try {
    const res = await request({
      url: 'admin/adminInfo',
      method: 'get'
    })
    return res
  } catch (e) {
    return 0
  }
}
