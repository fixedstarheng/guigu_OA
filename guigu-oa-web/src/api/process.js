import request from '@/utils/request'

const api_name = '/admin/process'

export default {

  findProcessType() {
    return request({
      url: `${api_name}/findProcessType`,
      method: 'get'
    })
  },
// 获取审批模板
  getProcessTemplate(processTemplateId) {
    return request({
      url: `${api_name}/getProcessTemplate/`+processTemplateId,
      method: 'get'
    })
  },

  startUp(processFormVo) {
    return request({
      url: `${api_name}/startUp`,
      method: 'post',
      data: processFormVo
    })
  },

 

  show(id) {
    return request({
      url: `${api_name}/show/`+id,
      method: 'get'
    })
  },
  


  approve(approvalVo) {
    return request({
      url: `${api_name}/approve`,
      method: 'post',
      data: approvalVo
    })
  },
  
  //待审批
  findPending(page, limit) {
    return request({
      url: `${api_name}/findPending/`+page+`/`+ limit,
      method: 'get'
    })
  },

  //已审批
  findProcessed(page, limit) {
    return request({
      url: `${api_name}/findProcessed/`+page+`/`+ limit,
      method: 'get'
    })
  },
  
  // 已发起
  findStarted(page, limit) {
    return request({
      url: `${api_name}/findStarted/`+page+`/`+ limit,
      method: 'get'
    })
  },



}
