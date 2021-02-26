import S3 from 'react-aws-s3';

export const S3BaseLink = 'https://spoint.s3-sa-east-1.amazonaws.com/';

const config = {
  bucketName: 'spoint',
  //dirName: 'media' /* optional */,
  region: 'sa-east-1',
  accessKeyId: 'AKIA5UZE3T33MHVD5CGJ',
  secretAccessKey: 'FVmjcPgY+nmiTO3A+j1FGvSio1q29LpTMgs5UeN7',
  //s3Url: 'https:/your-custom-s3-url.com/' /* optional */,
};

const ReactS3Client = new S3(config);

export default ReactS3Client;
