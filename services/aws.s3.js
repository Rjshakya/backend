import {
  S3,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  
} from "@aws-sdk/client-s3";
import {
  S3RequestPresigner,
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";

class s3Bucket {
  s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.ACCESSKEY,
    },
  });

  bucketName = "mythinkappbucket";

  constructor() {
    this.s3 = this.s3;
    this.bucket = this.bucketName;
  }

  async uploadFile(key, body, contentType) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    };

    try {
      const res = await this.s3.send(new PutObjectCommand(params));
      return res;
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(key) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      const res = await this.s3.send(new DeleteObjectCommand(params));
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const s3BucketInstance = new s3Bucket();
export default s3BucketInstance;
