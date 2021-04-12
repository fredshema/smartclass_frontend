import mentor from "./mentor.vue";

import { Messages, Message, Profile } from "./pages/index";

const routes = [
  {
    path: "/mentor",
    component: mentor,
    children: [
      {
        path: "",
        redirect: { name: "mentor-messages" },
        meta: { guest: true },
      },
      {
        path: "messages",
        name: "mentor-messages",
        component: Messages,
        meta: { guest: true },
      },
      {
        path: "message/:MID",
        name: "mentor-individual-message",
        component: Message,
        meta: { guest: true },
      },
      {
        path: "profile",
        name: "mentor-profile",
        component: Profile,
        meta: { requireAuth: true },
      },
    ],
  },
];

export default routes;
