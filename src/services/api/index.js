import data from './data.json'
import wait from '../../utils/wait'

class Api {
  async getData({ search = '', limit = 20 }) {
    try {
      const reg = new RegExp(search, 'gi')
      await wait(300)
      return data.filter(d => !!d.name.match(reg)).slice(0, limit)
    } catch (e) {
      return []
    }
  }
}

export default new Api()
