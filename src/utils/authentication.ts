/**
 * { data-analysis:  ['read', 'write'] }
 */

export type UserPermission = Record<string, string[]>;

type Auth = {
  resource: string | RegExp;
  actions?: string[];
};

export interface AuthParams {
  // 某操作需要的权限数组
  requiredPermissions?: Array<Auth>;
  // 是否需要满足一个即可，即是或还是且。
  oneOfPerm?: boolean;
}
/**
 * 对 某资源的某操作鉴权
 * actions: 当前资源需要的操作权限
 * perm: 用户对当前资源所拥有的权限
 **/
const judge = (actions: string[], perm: string[]) => {
  if (!perm || !perm.length) {
    return false;
  }

  if (perm.join('') === '*') {
    return true;
  }

  return actions.every((action) => perm.includes(action));
};
/**
 *  对某资源鉴权
 *  params: resource + actions
 *  userPermission: 用户所拥有的权限
 **/
const auth = (params: Auth, userPermission: UserPermission) => {
  const { resource, actions = [] } = params;
  if (resource instanceof RegExp) {
    const permKeys = Object.keys(userPermission);
    const matchPermissions = permKeys.filter((item) => item.match(resource));
    if (!matchPermissions.length) {
      return false;
    }
    return matchPermissions.every((key) => {
      const perm = userPermission[key];
      return judge(actions, perm);
    });
  }
  const perm = userPermission[resource];
  return judge(actions, perm);
};

export default (params: AuthParams, userPermission: UserPermission) => {
  const { requiredPermissions, oneOfPerm } = params;
  if (Array.isArray(requiredPermissions) && requiredPermissions.length) {
    let count = 0;
    for (const rp of requiredPermissions) {
      if (auth(rp, userPermission)) {
        count++;
      }
    }
    return oneOfPerm ? count > 0 : count === requiredPermissions.length;
  }
  return true;
};
