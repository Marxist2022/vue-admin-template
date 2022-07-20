import request from '@/utils/request'

// 获取所有的权限点
export const getPermissions = () => {
  return request({
    url: '/sys/permission'
  })
}

// 根据角色id获取权限
export const getPermissionsById = id => {
  return request({
    url: `/sys/role/${id}`
  })
}

// 给角色分配权限
export const assignPermission = (id, permIds) => {
  return request({
    Method: 'PUT',
    url: '/sys/role/assignPrem',
    data: { id, permIds }
  })
}
// 添加角色
export const addRole = ({ name, description }) => {
  return request({
    method: 'POST',
    url: '/sys/role',
    data: { name, description }
  })
}
