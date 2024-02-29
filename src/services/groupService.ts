import { requestUpsert } from './apiService';
//@TODO clean, integration message notification
class GroupService {
  static async create(id: any, data: any) {
    if (typeof data.leader == 'object') {
      const res = (await requestUpsert('people', '', data.leader)).data;
      if (!res) {
        return;
      }
      data.leader = res.id;
    }
    return (await requestUpsert('groups', id, data)).data;
  }
}
export { GroupService };
