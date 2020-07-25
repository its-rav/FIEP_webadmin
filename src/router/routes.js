import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import DashboardGroupManager from "@/layout/dashboard/DashboardGroupManager.vue"
import LoginPageLayout from "@/layout/LoginPage/LoginPageLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

const LoginPage = () => import("@/pages/LoginPage.vue");
// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");
const UserManagement = () => import(/* webpackChunkName: "common" */ "@/pages/UserManagement.vue");
const EventManagement = () => import(/* webpackChunkName: "common" */ "@/pages/EventManagement.vue");
const PostManagement = () => import(/* webpackChunkName: "common" */ "@/pages/PostManagement.vue");
const UserGM = () => import(/* webpackChunkName: "common" */ "@/pages/UserGM.vue");
const EventGM = () => import(/* webpackChunkName: "common" */ "@/pages/EventGM.vue");
const PostGM = () => import(/* webpackChunkName: "common" */ "@/pages/PostGM.vue");
const GroupManagement = () => import(/* webpackChunkName: "common" */ "@/pages/GroupManagement.vue");
const routes = [
  {
    path: "/",
    component: LoginPageLayout,
    redirect: "/login",
    children: [
      {
        path: "login",
        name: "login",
        component: LoginPage
      },
    ]
  },
  {
    path: "/dashboardGM",
    component: DashboardGroupManager,
    redirect: "/dashboardGM",
    children: [
      {
        path: "/userGM",
        name: "userGM",
        component: UserGM
      },
      {
        path: "/eventGM",
        name: "eventGM",
        component: EventGM
      },
      {
        path: "/postGM",
        name: "postGM",
        component: PostGM
      },
    ]
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile
      },
      {
        path: "/notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "/icons",
        name: "icons",
        component: Icons
      },
      {
        path: "/maps",
        name: "maps",
        component: Maps
      },
      {
        path: "/typography",
        name: "typography",
        component: Typography
      },
      {
        path: "/table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "/usermanagement",
        name: "usermanagement",
        component: UserManagement
      },
      {
        path: "/eventmanagement",
        name: "eventmanagement",
        component: EventManagement
      },
      {
        path: "/postmanagement",
        name: "postmanagement",
        component: PostManagement
      },
      {
        path: "/groupmanagement",
        name: "groupmanagement",
        component: GroupManagement
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
