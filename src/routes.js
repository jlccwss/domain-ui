import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";

const dashboardRoutes = [
  {
    path: "/domains",
    name: "域名管理",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "MDM",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/rrs",
    name: "域名注册",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/icp",
    name: "ICP备案",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/auditflows",
    name: "审批流程",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/auditlogs",
    name: "操作日志",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
];

export default dashboardRoutes;
