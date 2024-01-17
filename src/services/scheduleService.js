import ApiService from './ApiService'

export async function apiGetScheduleDashboardData(data) {
    return ApiService.fetchData({
        url: '/schedule/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetScheduleProducts(data) {
    return ApiService.fetchData({
        url: '/schedule/products',
        method: 'post',
        data,
    })
}

export async function apiDeleteSchedule(data) {
    return ApiService.fetchData({
        url: '/schedule/data/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetScheduleProduct(params) {
    return ApiService.fetchData({
        url: '/schedule/product',
        method: 'get',
        params,
    })
}

export async function apiPutScheduleProduct(data) {
    return ApiService.fetchData({
        url: '/schedule/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSchedule(data) {
    return ApiService.fetchData({
        url: '/courses',
        method: 'post',
        data,
    })
}

export async function apiGetScheduleOrders(params) {
    return ApiService.fetchData({
        url: '/schedule/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteScheduleOrders(data) {
    return ApiService.fetchData({
        url: '/schedule/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetScheduleOrderDetails(params) {
    return ApiService.fetchData({
        url: '/schedule/orders-details',
        method: 'get',
        params,
    })
}
