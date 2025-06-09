import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
    id: 2,
    label: "Dashboard",
    icon: "bxs-dashboard",
    link: "",
    subItems: [
    //   {
    //     id: 21,
    //     label: "Booking Analytics",
    //     link: "",
    //   },
    ],
  },
  {
    id: 7,
    label: "Member Management",
    icon: "bx-user",
    link: "/user-mgmt",
    subItems: [
      
    ],
  },
{
    id: 7,
    label: "About Us",
    icon: "bx-user",
    link: "/about",
    subItems: [
      
    ],
  },
];

