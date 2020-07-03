## Modules

<dl>
<dt><a href="#module_Auth.lib">Auth.lib</a></dt>
<dd><p>Auth Library: Colletction of generic authentication and
autorization functions</p>
</dd>
<dt><a href="#module_GCPStorage.lib.js">GCPStorage.lib.js</a></dt>
<dd><p>GCP Storage Library: Colletction of generic gcp
storage functions</p>
</dd>
<dt><a href="#module_Map.lib">Map.lib</a></dt>
<dd><p>Map Library: Colletction of generic map functions</p>
</dd>
<dt><a href="#module_Redis.lib">Redis.lib</a></dt>
<dd><p>Redis Library: Collection of methods related to redis</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#AWSESLib">AWSESLib</a></dt>
<dd><p>This is helper/lib class to return AWS ES client and ES configuration required</p>
</dd>
<dt><a href="#EmailNotification">EmailNotification</a></dt>
<dd><p>This is helper/lib class to send email notifications</p>
</dd>
<dt><a href="#S3Wrapper">S3Wrapper</a></dt>
<dd><p>This is wrapper class to s3 API functions with
promisification &amp; custom response handling</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MailOptions">MailOptions</a> : <code>Object</code></dt>
<dd><p>Send email optoins</p>
</dd>
<dt><a href="#MailResponse">MailResponse</a> : <code>Object</code></dt>
<dd><p>Send mail response</p>
</dd>
<dt><a href="#MailConfig">MailConfig</a> : <code>Object</code></dt>
<dd><p>Get Email configuration request options</p>
</dd>
<dt><a href="#S3HelperResponse">S3HelperResponse</a> : <code>Object</code></dt>
<dd><p>S3 Wrapper Response</p>
</dd>
</dl>

<a name="module_Auth.lib"></a>

## Auth.lib
Auth Library: Colletction of generic authentication andautorization functions


* [Auth.lib](#module_Auth.lib)
    * [~generateToken(payload, options)](#module_Auth.lib..generateToken) ⇒
    * [~verifyUserToken(token)](#module_Auth.lib..verifyUserToken) ⇒

<a name="module_Auth.lib..generateToken"></a>

### Auth.lib~generateToken(payload, options) ⇒
Generates a generic JWT for this application

**Kind**: inner method of [<code>Auth.lib</code>](#module_Auth.lib)  
**Returns**: String  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | payload to be encrypted |
| options | <code>Object</code> | options for `jwt.sign` method |

<a name="module_Auth.lib..verifyUserToken"></a>

### Auth.lib~verifyUserToken(token) ⇒
Validates provided token

**Kind**: inner method of [<code>Auth.lib</code>](#module_Auth.lib)  
**Returns**: Object  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | JWT to check |

<a name="module_GCPStorage.lib.js"></a>

## GCPStorage.lib.js
GCP Storage Library: Colletction of generic gcpstorage functions

<a name="module_GCPStorage.lib.js..upload"></a>

### GCPStorage.lib.js~upload(file) ⇒ <code>Object</code>
Uploads file to GCP storage

**Kind**: inner method of [<code>GCPStorage.lib.js</code>](#module_GCPStorage.lib.js)  
**Returns**: <code>Object</code> - GCP Storage upload response  

| Param | Type |
| --- | --- |
| file | <code>File</code> | 

<a name="module_Map.lib"></a>

## Map.lib
Map Library: Colletction of generic map functions


* [Map.lib](#module_Map.lib)
    * [~getDistanceFromLatLon(lat1, lon1, lat2, lon2)](#module_Map.lib..getDistanceFromLatLon) ⇒ <code>Number</code>
        * [~deg2rad(deg)](#module_Map.lib..getDistanceFromLatLon..deg2rad) ⇒ <code>Number</code>

<a name="module_Map.lib..getDistanceFromLatLon"></a>

### Map.lib~getDistanceFromLatLon(lat1, lon1, lat2, lon2) ⇒ <code>Number</code>
Calculates distance between 2 points using Haversine formula

**Kind**: inner method of [<code>Map.lib</code>](#module_Map.lib)  
**Returns**: <code>Number</code> - distance - Distance between two points in Meters  

| Param | Type | Description |
| --- | --- | --- |
| lat1 | <code>Number</code> | Latitude of first pin |
| lon1 | <code>Number</code> | Longitude of first pin |
| lat2 | <code>Number</code> | Latitude of second pin |
| lon2 | <code>Number</code> | Longitude of second pin |

<a name="module_Map.lib..getDistanceFromLatLon..deg2rad"></a>

#### getDistanceFromLatLon~deg2rad(deg) ⇒ <code>Number</code>
Converts degree to Radian

**Kind**: inner method of [<code>getDistanceFromLatLon</code>](#module_Map.lib..getDistanceFromLatLon)  
**Returns**: <code>Number</code> - radian  

| Param | Type |
| --- | --- |
| deg | <code>Number</code> | 

<a name="module_Redis.lib"></a>

## Redis.lib
Redis Library: Collection of methods related to redis

<a name="module_Redis.lib..getRedisClient"></a>

### Redis.lib~getRedisClient() ⇒ <code>Object</code>
Connects to redis and returs client

**Kind**: inner method of [<code>Redis.lib</code>](#module_Redis.lib)  
**Returns**: <code>Object</code> - client  
<a name="AWSESLib"></a>

## AWSESLib
This is helper/lib class to return AWS ES client and ES configuration required

**Kind**: global class  

* [AWSESLib](#AWSESLib)
    * [new AWSESLib(awsGetCredentials)](#new_AWSESLib_new)
    * [.createESClient()](#AWSESLib+createESClient)

<a name="new_AWSESLib_new"></a>

### new AWSESLib(awsGetCredentials)
Assign all ENV variable to `this`, to be used in member functionsAlso will initialise memeber varaibles


| Param | Type | Description |
| --- | --- | --- |
| awsGetCredentials | <code>Object</code> | awsGetCredentials need to generated by awsGetCredentials from '@acuris/aws-es-connection' |

<a name="AWSESLib+createESClient"></a>

### awsesLib.createESClient()
Creates ES client

**Kind**: instance method of [<code>AWSESLib</code>](#AWSESLib)  
<a name="EmailNotification"></a>

## EmailNotification
This is helper/lib class to send email notifications

**Kind**: global class  

* [EmailNotification](#EmailNotification)
    * [.sendEmail(options)](#EmailNotification+sendEmail) ⇒ [<code>Promise.&lt;MailResponse&gt;</code>](#MailResponse)
    * [.getTemplate(templateName, options)](#EmailNotification+getTemplate) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getEmailServer(mailConfig)](#EmailNotification+getEmailServer) ⇒ <code>Promise</code>

<a name="EmailNotification+sendEmail"></a>

### emailNotification.sendEmail(options) ⇒ [<code>Promise.&lt;MailResponse&gt;</code>](#MailResponse)
Sends email with given optoins as template orsimple text email

**Kind**: instance method of [<code>EmailNotification</code>](#EmailNotification)  
**Returns**: [<code>Promise.&lt;MailResponse&gt;</code>](#MailResponse) - - Promise with Mail response  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>MailOptions</code>](#MailOptions) | Email optoins |

<a name="EmailNotification+getTemplate"></a>

### emailNotification.getTemplate(templateName, options) ⇒ <code>Promise.&lt;string&gt;</code>
Gets tempalte from project template folder

**Kind**: instance method of [<code>EmailNotification</code>](#EmailNotification)  

| Param | Type | Description |
| --- | --- | --- |
| templateName | <code>String</code> |  |
| options | <code>Object</code> | Object containing keys and values to e used with pug template |

<a name="EmailNotification+getEmailServer"></a>

### emailNotification.getEmailServer(mailConfig) ⇒ <code>Promise</code>
Gets email server instance with provided options

**Kind**: instance method of [<code>EmailNotification</code>](#EmailNotification)  
**Returns**: <code>Promise</code> - Mail  

| Param | Type |
| --- | --- |
| mailConfig | [<code>MailConfig</code>](#MailConfig) | 

<a name="S3Wrapper"></a>

## S3Wrapper
This is wrapper class to s3 API functions withpromisification & custom response handling

**Kind**: global class  

* [S3Wrapper](#S3Wrapper)
    * [.getBuckets()](#S3Wrapper+getBuckets) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
    * [.addBucket(bucketName, ACL)](#S3Wrapper+addBucket) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
    * [.deleteBucket(bucketName)](#S3Wrapper+deleteBucket) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
    * [.uploadMulterS3(req, res, fieldName, permission, bucketName)](#S3Wrapper+uploadMulterS3) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
    * [.uploadObject(fileContent, fileName, permission, bucketName, contentType)](#S3Wrapper+uploadObject) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
    * [.getObjects(bucketName, prefix)](#S3Wrapper+getObjects) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
    * [.getObject(bucketName, objPath)](#S3Wrapper+getObject) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
    * [.deleteObject(bucketName, objPath)](#S3Wrapper+deleteObject) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
    * [.deleteObjects(bucketName, objects)](#S3Wrapper+deleteObjects) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
    * [.getObjectMetadata(bucketName, key)](#S3Wrapper+getObjectMetadata) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)

<a name="S3Wrapper+getBuckets"></a>

### s3Wrapper.getBuckets() ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
ListBuckets function promisified

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  
<a name="S3Wrapper+addBucket"></a>

### s3Wrapper.addBucket(bucketName, ACL) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
Creates bucket in s3

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bucketName | <code>String</code> |  | Uniq bucket name |
| ACL | <code>String</code> | <code>public-read</code> | Optional - AWS bucket ACL optoins |

<a name="S3Wrapper+deleteBucket"></a>

### s3Wrapper.deleteBucket(bucketName) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
Deletes provided bucket from S3

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  

| Param | Type |
| --- | --- |
| bucketName | <code>String</code> | 

<a name="S3Wrapper+uploadMulterS3"></a>

### s3Wrapper.uploadMulterS3(req, res, fieldName, permission, bucketName) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
Uploads multiplart files to s3 using multer package

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| req | <code>Object</code> |  | Can be express js request |
| res | <code>Object</code> |  | Express response |
| fieldName | <code>String</code> | <code>image</code> |  |
| permission | <code>String</code> | <code>public-read</code> |  |
| bucketName | <code>String</code> |  |  |

<a name="S3Wrapper+uploadObject"></a>

### s3Wrapper.uploadObject(fileContent, fileName, permission, bucketName, contentType) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
Uploads fils/object to s3

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fileContent | <code>File</code> \| <code>String</code> |  | This can be file, JSON string |
| fileName | <code>String</code> |  |  |
| permission | <code>String</code> | <code>public-read</code> |  |
| bucketName | <code>String</code> |  |  |
| contentType | <code>String</code> |  | s3 supported file content type |

<a name="S3Wrapper+getObjects"></a>

### s3Wrapper.getObjects(bucketName, prefix) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
Gets s3 objects based on prefix if provided

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  

| Param | Type |
| --- | --- |
| bucketName | <code>String</code> | 
| prefix | <code>String</code> | 

<a name="S3Wrapper+getObject"></a>

### s3Wrapper.getObject(bucketName, objPath) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
Get single object by key name

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  

| Param | Type |
| --- | --- |
| bucketName | <code>String</code> | 
| objPath | <code>String</code> | 

<a name="S3Wrapper+deleteObject"></a>

### s3Wrapper.deleteObject(bucketName, objPath) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
Delete single object by key name

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  

| Param | Type |
| --- | --- |
| bucketName | <code>String</code> | 
| objPath | <code>String</code> | 

<a name="S3Wrapper+deleteObjects"></a>

### s3Wrapper.deleteObjects(bucketName, objects) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
Deletes multiple objects from s3

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  

| Param | Type |
| --- | --- |
| bucketName | <code>String</code> | 
| objects | <code>Object</code> | 
| objects.Key | <code>String</code> | 

<a name="S3Wrapper+getObjectMetadata"></a>

### s3Wrapper.getObjectMetadata(bucketName, key) ⇒ [<code>Promise.&lt;S3HelperResponse&gt;</code>](#S3HelperResponse)
Gets Meta data for s3 object

**Kind**: instance method of [<code>S3Wrapper</code>](#S3Wrapper)  

| Param | Type |
| --- | --- |
| bucketName | <code>String</code> | 
| key | <code>String</code> | 

<a name="MailOptions"></a>

## MailOptions : <code>Object</code>
Send email optoins

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options.subject | <code>String</code> | Email subject |
| optoins.templateName | <code>String</code> | Pug template name you have in project |
| options.body | <code>String</code> | Email body |
| options.htmlBody | <code>String</code> | HTMl email body |
| optoins.replace | <code>Object</code> | Object containing keys and values to e used with pug template |
| options.to | <code>String</code> | Recipient email address seperated with commas |

<a name="MailResponse"></a>

## MailResponse : <code>Object</code>
Send mail response

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| success | <code>Boolean</code> |  |
| message | <code>String</code> | Whatever message you want to send back |
| item | <code>Object</code> | Response got from nodemailer |
| error | <code>Object</code> | Error from nodemailer |

<a name="MailConfig"></a>

## MailConfig : <code>Object</code>
Get Email configuration request options

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mailOption | <code>Object</code> |  |
| mailOption.fromEmail | <code>String</code> | From email address concat with commas |
| mailOption.toEmail | <code>String</code> | To email address concat with commas |

<a name="S3HelperResponse"></a>

## S3HelperResponse : <code>Object</code>
S3 Wrapper Response

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| success | <code>Boolean</code> |  |
| data | <code>Object</code> | Optional |
| httpStatusCode | <code>Number</code> |  |
| error | <code>Object</code> |  |
| message | <code>String</code> |  |

