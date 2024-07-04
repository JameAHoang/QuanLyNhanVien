import Mock from "./mock";

import "./db/invoice";
import "./db/users";
import "./db/list";
import "./db/notification";

Mock.onAny().passThrough();
