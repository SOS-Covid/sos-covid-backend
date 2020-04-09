const AWS = require('aws-sdk');
const config = require('../../config');

const { key, secret, region, bucket_name } = config.aws;

exports.imageUpload = async (imgBase64) => {
  AWS.config.setPromisesDependency(require('bluebird'));
  AWS.config.update({ accessKeyId: key, 
    secretAccessKey: secret, region: region });

  const s3 = new AWS.S3();
  const buffer = new Buffer(imgBase64, 'base64');
  let location = '';

  const params = {
    Bucket: bucket_name,
    Key: 'lianrolim',
    Body: buffer,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  };

  try {
    const { Location } = await s3.upload(params).promise();
    location = Location;
  } catch (error) {
     console.error(error);
  }
  return location;
};