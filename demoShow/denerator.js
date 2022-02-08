const fs = require("fs");

fs.readdir("./", (err, file) => {
  const reg = /(.json|.js|.css|.html)$/;
  const baseUrl = "/demoShow";
  const resultArray = [];
  for (item of file) {
    if (!reg.test(item)) {
      resultArray.push({
        fileName: item,
        url: baseUrl + `/${item}/index.html`,
      });
    }
  }
  fs.writeFile("./category.json", JSON.stringify(resultArray), (err) => {
    if (err) {
      console.log(err);
    }
  });
});
