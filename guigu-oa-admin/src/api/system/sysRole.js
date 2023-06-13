import request from '@/utils/request'
/** 自我理解：
 * 这里每一个方法都对应后端controller的每一个方法
 * 页面调用这里的方法 实现对后端的请求
 * 对应这个js的页面是/views/system/sysRole/list.vue
 */
const api_name = '/admin/system/sysRole'
export default{
    //角色列表-条件分页查询
    getPageList(current,limit,searchObj){
        return request({
            url: `${api_name}/${current}/${limit}`,
            method: 'get',
            // 如果普通对象参数写法 params:对象参数名称
            //如果使用json格式传递(后端controller方法参数添加了@RequestBody注解），data:对象参数名称
            params:searchObj
            
        })
    },
    getById(id){//get/{id}
        return request({
            url: `${api_name}/get/${id}`,
            method: 'get',
            // 如果普通对象参数写法 params:对象参数名称
            //如果使用json格式传递(后端controller方法参数添加了@RequestBody注解），data:对象参数名称
            params:id
            
        })
    },
    //角色删除
    removeById(id){ 
        return request({
            url:`${api_name}/delete/${id}`,
            method: 'Delete',
            // 没有也ok 
            // params:id
        })
    },
    //批量删除
    batchRemove(ids){
        return request({
            url:`${api_name}/batchDelete`,
            method:'delete',
            data:ids
        })
    },
    //添加角色 ../save
    saveRole(role){
        return request({
            url:`${api_name}/save`,
            method: 'post',
            //@RequestBody json格式传递
            data: role,
        })
    },
    //修改角色
    updateRole(role){
        return request({
            url:`${api_name}/update`,
            method:'put',
            data:role,
        })
    },
    //
    getRoles(adminId) {
        return request({
          url: `${api_name}/toAssign/${adminId}`,
          method: 'get'
        })
    },
    //  
    assignRoles(assginRoleVo) {
        return request({
          url: `${api_name}/doAssign`,
          method: 'post',
          data: assginRoleVo
        })
    }


}
