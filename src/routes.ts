import auth, { AuthParams } from '@/utils/authentication';
import { useEffect, useMemo, useState } from 'react';

export type IRoute = AuthParams & {
  title: string;
  key: string;
  // 当前页是否展示面包屑
  breadcrumb?: boolean;
  children?: IRoute[];
  // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
  ignore?: boolean;
};

export const routes: IRoute[] = [
  {
    title: '仪表盘2',
    key: 'dashboard',
    children: [
      {
        title: '工作台',
        key: 'dashboard/workplace',
      },
      {
        title: '实时监控',
        key: 'dashboard/monitor',
        // requiredPermissions: [{ resource: '实时监控', actions: ['read'] }],
      },
    ],
  },
  {
    title: '数据可视化',
    key: 'visualization',
    children: [
      {
        title: '分析页',
        key: 'visualization/data-analysis',
        // requiredPermissions: [{ resource: '分析页', actions: ['read'] }],
      },
      {
        title: '多维数据分析',
        key: 'visualization/multi-dimension-data-analysis',
        /*requiredPermissions: [
          {
            resource: '分析页',
            actions: ['read', 'write'],
          },
          {
            resource: '多维数据分析',
            actions: ['write'],
          },
        ],*/
        oneOfPerm: true,
      },
    ],
  },
  {
    title: '列表页',
    key: 'list',
    children: [
      {
        title: '查询表格',
        key: 'list/search-table',
      },
      {
        title: '卡片列表',
        key: 'list/card',
      },
    ],
  },
  {
    title: '表单页',
    key: 'form',
    children: [
      {
        title: '分组表单',
        key: 'form/group',
        /*requiredPermissions: [
          { resource: '分组表单', actions: ['read', 'write'] },
        ],*/
      },
      {
        title: '分步表单',
        key: 'form/step',
        // requiredPermissions: [{ resource: '分步表单', actions: ['read'] }],
      },
    ],
  },
  {
    title: '详情页',
    key: 'profile',
    children: [
      {
        title: '基础详情页',
        key: 'profile/basic',
      },
    ],
  },

  {
    title: '结果页',
    key: 'result',
    children: [
      {
        title: '成功',
        key: 'result/success',
        breadcrumb: false,
      },
      {
        title: '失败',
        key: 'result/error',
        breadcrumb: false,
      },
    ],
  },
  {
    title: '异常',
    key: 'exception',
    children: [
      {
        title: '403',
        key: 'exception/403',
      },
      {
        title: '404',
        key: 'exception/404',
      },
      {
        title: '500',
        key: 'exception/500',
      },
    ],
  },
  {
    title: '个人中心',
    key: 'user',
    children: [
      {
        title: '用户信息',
        key: 'user/info',
      },
      {
        title: '用户设置',
        key: 'user/setting',
      },
    ],
  },
  {
    title: '系统设置',
    key: 'setting',
    children: [
      {
        title: '角色管理',
        key: 'setting/role',
      },
      {
        title: '菜单管理',
        key: 'setting/menu',
      },
      {
        title: '用户管理',
        key: 'setting/user',
      },
    ],
  },
];

export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.title;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

const useRoute = (userPermission): [IRoute[], string] => {
  /*const filterRoute = (routes: IRoute[], arr = []): IRoute[] => {
    if (!routes.length) {
      return [];
    }
    for (const route of routes) {
      const { requiredPermissions, oneOfPerm } = route;
      let visible = true;
      if (requiredPermissions) {
        visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
      }

      if (!visible) {
        continue;
      }
      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        filterRoute(route.children, newRoute.children);
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }

    return arr;
  };

  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    const newRoutes = filterRoute(routes);
    setPermissionRoute(newRoutes);
  }, [JSON.stringify(userPermission)]);

  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);*/

  return [userPermission || [], 'setting/menu'];
  // return [permissionRoute, defaultRoute];
};

export default useRoute;
