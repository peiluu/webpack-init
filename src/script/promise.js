const ExtPromise = () => {
  console.log("定时器");
};
// ExtPromise();
getPostData();

const print = (time, msg) => {
  return new Promise(() => {
    setTimeout(() => {
      // console.log(msg);
    }, time);
  });
};

print(100, "First")
  .then((res) => {
    console.log(res);
    return print(4000, "Second");
  })
  .then((res) => {
    console.log(res);
    return print(3000, "Third");
  });

// ExtAwait();
// console.log(222);

const testAwait = () => {
  const responseData = new Promise((resolve, reject) => {
    resolve(
      post("/api/operator/gethislist", { hisId: 99991 }, { hideError: true })
    );
  }).then((data) => {
    console.log(data);
  });

  console.log("responseData", responseData);
};
testAwait();

// stash 相比于add 和commit多了选择的深度，可以多存储几次stash
const add = () => {};
