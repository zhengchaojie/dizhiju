import store from '@/store'

// 按用户权限生成权限管理
export const roleMap = []
store.getters.addRouters.forEach((element, index) => {
  if (element.meta) {
    roleMap.push({
      resourceType: element.meta.title,
      subResourceInfoList: []
    })
  } else {
    roleMap.push({
      subResourceInfoList: []
    })
  }
  element.children.forEach((item, childrenIndex) => {
    roleMap[index].subResourceInfoList.push({
      resourceName: item.meta.title,
      resourceCode: item.meta.role
    })
    if (!roleMap[index].resourceType) {
      roleMap[index].resourceType = item.meta.title
    }
  })
})
