import { post } from "@/utils/request";
import "./index.less";

const getPostData = async () => {
  const responseData = await post(
    "/api/operator/gethislist",
    { hisId: 99991 },
    { hideError: true }
  );

  console.log("responseData", responseData);
};

getPostData();
