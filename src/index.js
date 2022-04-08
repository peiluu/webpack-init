// import * as utils from "@/utils/utils";
import { getCode } from "@/utils/utils";

import { post } from "@/utils/request";
// import Tab from './components/tab/index';
// import Tab from '@/com/tab';

// import "./index.less";

// const y = (a, b) => {
//   return a + b;
// };

// const a = 1;

post("/api/operator/gethislist");

// console.log(utils.getCode());
console.log(getCode());
