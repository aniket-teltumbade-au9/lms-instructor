import Dashboard from '@mui/icons-material/Dashboard';
import Inventory from '@mui/icons-material/Inventory';
import School from '@mui/icons-material/School';
import Category from '@mui/icons-material/Category';
import Business from '@mui/icons-material/Business';
import Shop2 from '@mui/icons-material/Shop2';

const appbarMenus =[
    {code: 'overview', title : 'Dashboard', icon: Dashboard, link: '/'},
    {code: 'products', title : 'Products', icon: Inventory, link: '/products'},
    {code: 'courses', title: 'Courses', icon: School, link: '/courses'},
    {code: 'categories', title: 'Categories', icon: Category, link: '/categories'},
    {code: 'organisations', title: 'Organisations', icon: Business, link: '/organizations'},
    {code: 'orders', title: 'Orders', icon: Shop2, link: '/orders'},
]
export default appbarMenus