import { post, get } from "@/utils/request";

import "./index.less";

import { setCode } from "@/utils/utils";

const utils = require("@/utils/utils");

const request = require("@/utils/request");

post("/api/operator/gethislist", {});

utils.getCode();

request.get();

setCode();
