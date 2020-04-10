process.env.AWS_SDK_LOAD_CONFIG = "true";
process.env.AWS_PROFILE = "garyxuehong_dev0";

var BASE_URL = 'https://home-entertainment.s3-ap-southeast-2.amazonaws.com';
var fs = require("fs");
var path = require("path");
var AWS = require("aws-sdk");
AWS.config.region = "ap-southeast-2";
AWS.config.apiVersions = { s3: "2006-03-01" };

var s3 = new AWS.S3();

s3.listObjects({ Bucket: "home-entertainment" }, (err, data) => {
  const files = data.Contents.map((c) => c.Key);
  syncPaylist(files, "00.语文", "./yuwen");
});

function syncPaylist(files, prefix, file) {
  const data = files
    .filter((f) => f.indexOf(prefix) === 0)
    .map((s) => `${BASE_URL}/${s}`)
    .join("\n");
  fs.writeFileSync(path.resolve(__dirname, file), data, "utf-8");
  console.log(`written to ${file}`);
}
