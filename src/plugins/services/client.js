import createAxiosInstance from '@/helpers/create-axios-instance'

// 获取API数据
export const apiClient = createAxiosInstance({timeout: 5000})
