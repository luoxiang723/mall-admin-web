import request from '@/utils/request'
export function fetchList(parentId,params) {
  return request({
    url:'/supplier/list/',
    method:'get',
    params:params
  })
}

export function deleteSupplier(id) {
  return request({
    url:'/supplier/delete/'+id,
    method:'post'
  })
}

export function createSupplier(data) {
  return request({
    url:'/supplier/create',
    method:'post',
    data:data
  })
}

export function updateSupplier(id,data) {
  return request({
    url:'/supplier/update/'+id,
    method:'post',
    data:data
  })
}

export function getSupplier(id) {
  return request({
    url:'/supplier/'+id,
    method:'get',
  })
}
