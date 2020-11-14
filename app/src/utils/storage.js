/**
 * 获取缓存数据
 * @param {string} key 缓存数据键名
 */
export const get = key => {
    const result = localStorage.getItem(key)
    try {
      return JSON.parse(result)
    } catch (err) {
      return result
    }
  }
  
  /**
   * 设置缓存数据
   * @param {string} key 缓存数据键名
   * @param {any} data 缓存数据，禁止缓存 undefined 类型数据
   */
  export const set = (key, data) => {
    if (typeof data === 'undefined') {
      throw new Error('禁止缓存 undefined 类型数据')
    } else if (typeof data === 'object') {
      localStorage.setItem(key, JSON.stringify(data))
    } else {
      localStorage.setItem(key, data)
    }
  }
  
  /**
   * 删除缓存数据
   * @param {string} key 缓存数据键名
   */
  export const remove = key => {
    localStorage.removeItem(key)
  }
  
  /**
   * 清空所有缓存数据
   */
  export const clear = () => {
    localStorage.clear()
  }
  