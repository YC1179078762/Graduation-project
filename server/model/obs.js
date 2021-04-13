//引入obs库
  obsClient.getObjectMetadata({
    Bucket:'ycmusic',
    Key : 'objectkey'
},(err, result) => {
    if(err){
           console.error('Error-->' + err);
    }else{
           if(result.CommonMsg.Status < 300){
                  console.log('RequestId-->' + result.InterfaceResult.RequestId);
                  console.log('ETag-->' + result.InterfaceResult.ETag);
                  console.log('VersionId-->' + result.InterfaceResult.VersionId);
                  console.log('ContentLength-->' + result.InterfaceResult.ContentLength);
                  console.log('Expiration-->' + result.InterfaceResult.Expiration);
                  console.log('LastModified-->' + result.InterfaceResult.LastModified);
                  console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
           }else{
                  console.log('Status-->' + result.CommonMsg.Status);
           }
    }
});
  module.exports = obsClient