import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';


// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Commandes',
    path: '/dashboard/order',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Menu du jour',
    path: '/dashboard/menu',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Table du resto',
    path: '/dashboard/table',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Archive',
    path: '/dashboard/archive',
    icon: <Icon icon="eva:archive"  width={22} height={22}/>
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon(shoppingBagFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
