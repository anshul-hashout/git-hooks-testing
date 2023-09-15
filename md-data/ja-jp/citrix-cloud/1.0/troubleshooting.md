# Troubleshooting for Citrix cloud services APIs

This section helps you to resolve the issues that might occur while getting started with the Citrix Cloud service APIs. Each Citrix cloud service API calls' response includes either success or failure status. The response body includes one or more of the following fields:

|Field|Description|
|---|---|
|`type`| Displays the type of the specific error.|
| `message`|  Displays the error message.|
|`detail`| Provides additional information on the status.|
|`description`| Displays description of the specific error.|
|`code`| Displays specific error response code.|

Currently, the following issues are documented:

-  Invalid client id or client secret
-  Content-Type must be set to application/x-www-form-urlencoded
-  Missing or invalid CWSAuth header
-  Missing or invalid authentication details
-  Must accept application/json media type
-  Internal server error

## Invalid client id or client secret

### Issue description

When you get started with Citrix Cloud service APIs, you might get "invalid client" error.

#### Response

```python3
response = requests.post('https://api-us.cloud.com/cctrustoauth2/root/tokens/clients', data={
    'grant_type': 'client_credentials',
    'client_id': os.environ['CLIENT_ID'],
    'client_secret': os.environ['CLIENT_SECRET']
})
response.status_code
```

**Note:**

Use one of the following endpoints based on the geographical region you selected while creating the Citrix Cloud account:

-  api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region.
-  api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region.
-  api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
-  api.citrixcloud.jp - If your Citrix Cloud account is set to the Japan region.

```text
400
```

```python3
pprint(response.json())
```

```text
{'error': 'invalid_client',
 'error_description': 'Invalid client id or client secret.'}
```

### Solution

1.  Verify that you have correctly set the environment variables with the client ID and secret:

    ```python3
    os.environ['CLIENT_ID']
    ```

    ```text
    '<YOUR_CLIENT_ID>'
    ```

    ```python
    os.environ['CLIENT_SECRET']
    ```

    ```text
    '<YOUR_CLIENT_SECRET>'
    ```

1.  If your'e using Python, exit from it using the `quit()` function or exit from the tool or programming code that you use.
1.  Restart the tutorial, ensuring you set the environment variables correctly.

## Content-Type must be set to application/x-www-form-urlencoded

### Issue description

Some OAuth 2.0 client libraries erroneously set a `charset` parameter in the initial authentication.

### Solution

Override the default HTTP headers to include the correct `application/x-www-form-urlencoded` value. For example, with Python [requests oauthlib](https://github.com/requests/requests-oauthlib):

```python
headers = {
  "Accept": "application/json",
  "Content-Type": "application/x-www-form-urlencoded"
}

token = oauth.fetch_token(token_url='https://api-us.cloud.com/cctrustoauth2/root/tokens/clients', 
                          headers=headers, 
                          client_id=os.environ['CLIENT_ID'], 
                          client_secret=os.environ['CLIENT_SECRET'], 
                          include_client_id=True)
```

## Missing or invalid CWSAuth header

### Issue description

Every API call must contain an `Authorization` HTTP header containing an API token in the format `CwsAuth Bearer=<TOKEN_VALUE>`. If you have not used a valid authorization header, you might get the following error message *Missing or invalid CWSAuth header*

#### Response

```python3
response.status_code
```

```text
401
```

```python
pprint(response.json())
```

```text
{'Error': {'Message': 'Missing or invalid CWSAuth header.',
           'Type': 'CWSAuthException'}}
```

### Solution

Verify that you are using a session, rather than the default requests object, and you have updated the session's headers as [Call a Citrix Cloud services services API](/citrix-cloud/citrix-cloud-api/docs/call-a-citrix-cloud-services-api#example-for-calling-citrix-cloud-apis).

## Missing or invalid authentication details

## Issue description

The Citrix Cloud service API token is valid for an hour. If you try to use it after it expires, the API will return a 401-status code with the following message:

Missing or invalid authentication details

### Response

```python
response = session.get('https://api-us.cloud.com/cvadapis/me')
response.status_code
```

```text
401
```

```python
pprint(response.json())
```

```text
{'detail': 'Missing or invalid authentication details',
 'parameters': {'reason': 'invalid'},
 'type': 'https://errors-api.cloud.com/common/authentication'}
```

### Solution

You need to reauthenticate to Citrix Cloud and create a session with the token.

## Must accept application/json media type

### Issue description

The client must set the `Accept` HTTP header to *exactly* `application/json`. Currently, the API does not allow values such as `*/*` or the `charset` parameter.

### Response

```python
response.status_code
```

```text
406
```

```python
pprint(response.json())
```

```text
{'detail': 'Must accept application/json media type',
 'parameters': {'contentType': 'application/json'},
 'type': 'https://errors-api.cloud.com/common/notAcceptable'}
```

### Solution

The client must set the `Accept` HTTP header to *exactly* `application/json`. Currently, the API does not allow values such as `*/*` or the `charset` parameter. Update the session object with the `Accept` header and try again.

## Internal server error

### Issue description

Currently, the Citrix Virtual Apps and Desktops APIs return status code 500 in response to a missing customer ID.

### Response

```python
response.status_code
```

```text
500
```

```python
pprint(response.json())
```

```text
{'activityId': 'c59d1c1a-0735-4ab7-8520-479ebae3fc1e',
 'message': 'Internal server error',
 'statusCode': 500}
```

### Solution

Ensure you update the session object with the `Citrix-CustomerId` header and try again.

## User is not authenticated for the specified resource

### Issue description

Some services are geo-dependent. If you are calling a service that is geo-dependent and you are using a geographical region other than the one selected when creating the Citrix Cloud account, the following error might occur:

```
{
  "type": "https://errors-api.cloud.com/common/authorization",
  "detail": "Access denied",
  "parameters": [
    {
      "name": "message",
      "value": "User is not authenticated for the specified resource"
    },
    {
      "name": "entityType",
      "value": "https://catalogs.apps.cloud.com/customer"
    },
    {
      "name": "id",
      "value": "XXXXXXXXXXXX"
    }
  ]
}
```

**Solution:**

When you register an API client, authenticate an API request, or invoke an API request, you must use one of the following endpoint prefixes:

-  api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region.
-  api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region.
-  api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
-  api.citrixcloud.jp - If your Citrix Cloud account is set to the Japan region.

## Troubleshooting SystemLog APIs

An unsuccessful SystemLog API request returns the following information in the response body:

-  **Type:** A link to the standard HTTP response code.
-  **Details:** A brief description of the error.
-  **parameters:** An optional JSON object to provide extra error information.

   **Sample API error response**

```
            {
                "type": "404",
                "detail": "resource not found",
                "parameters":
                {
                "name": "entityType",
                "value": "the request URL"
                }
            }
```

### API 1: GET/ Records

-  This API is called to get system log records in the specified time range.
-  It returns all the records in that time range. If there are more records than the default take count it returns a continuation token that can be used for getting the remaining records.

### GET query parameters

-  `StartDateTime`
    -  Start date from which logs must be retrieved.
    -  Must be specified as yyyy-MM-ddTHH:mm:ssZ.
    -  All DateTimes are in UTC.
    -  If not specified, the default value is DateTime.MinValue.
-  `EndDateTime`
    -  End date to which logs must be retrieved.
    -  Must be specified as yyyy-MM-ddTHH:mm:ssZ.
    -  All DateTimes are in UTC.
    -  If not specified, the default value is DateTime.Now.
-  `Limit`
    -  Number of records to be retrieved.
    -  Default value is 50.
-  `ContinuationToken`
    -  If there are more than the Limit value number of records the API returns a ContinuationToken.
    -  The caller must pass this parameter in the next request to get the next page.
    -  The caller is not expected to modify the ContinuationToken.

### Response codes

The following section lists the response codes for the APIs with examples.

-  [200 OK](#200-ok)
-  [400 Validation Errors](#400-Validation-Errors)
-  [401 UnAuthorized](#401-UnAuthorized)
-  [403 Forbidden](#403-Forbidden)
-  [404 Not Found](#404-Not-Found)
-  [500 Internal Server Error](#500-Internal-Server-Error)

#### 200 OK

-  `GET/ records`

##### Records retrieved successfully

```
{
 "Items": [{
 "RecordId": null,
 "UtcTimestamp": "2020-07-20T14:26:59.6103585Z",
 "CustomerId": "hulk",
 "EventType": "delegatedadministration:administrator/create",
 "TargetId": "6233644161364977157",
 "TargetDisplayName": "[testcduser1@gmail.com](mailto:testcduser1@gmail.com)",
 "TargetEmail" : "[testcduser1@gmail.com](mailto:testcduser1@gmail.com)",
 "TargetUserId": "a90b4449675f4fcf97e1663623334d74",
 "TargetType": "administrator",
 "BeforeChanges": null,
 "AfterChanges": {
 "CustomerId": "hulk",
 "Principal": "[testcduser1@gmail.com](mailto:testcduser1@gmail.com)",
 "UserId": "6233644161364977157",
 "AccessType": "Full",
 "CreatedDate": "07/20/2020 14:26:53",
 "UpdatedDate": "07/20/2020 14:26:53",
 "DisplayName": "Rafa Doe",
 "Pending": "False"
 },
 "AgentId": "delegatedadministration",
 "ServiceProfileName": null,
 "ActorId": null,
 "ActorDisplayName": "CwcSystem",
 "ActorType": "system",
 "Message": {
 "en-US": "Created new administrator user '6233644161364977157'.",
 "de-DE": "Der neue Administratorbenutzer '6233644161364977157' wurde erstellt.",
 "es-ES": "Se ha creado el usuario administrador "6233644161364977157".",
 "fr-FR": "L'utilisateur administrateur '6233644161364977157' a été créé.",
 "ja-JP": "新しい管理者ユーザー '6233644161364977157' を作成しました。"
 }
 }],
 "Count": 74,
 "EstimatedTotalItems": 250,
 "ContinuationToken": "+RID:~ry4EAPqekBg-KQAAAAAAAA==#RT:1#TRC:74#ISV:2#IEO:65551#FPC:AgEAAQA4AD+pAcD/HzAAIkD/HwAUwQkABhEAABjxAsAAH4ACgKEAABi0BsAAYAAAYAADEQAMABEABgBhAAAwATAAcQBgADEAFADBBeABggj+//8fQRkAoPIFAMAPALEA+AGDBOBBYCMQACEAAP8RQH8A"
}
```

#### 400 Validation Errors

-  `GET/ records`
-  `PUT/ personalizations/{id}`
-  Based on the validation errors. The Customer must be notified to enter the specific fields.

##### Case 1: DateTime range is invalid

##### Error 1

```
{
    "type": "https://errors-api.cloud.com/systemlog/getRecordsDateTimeRangeInvalid",
    "detail": "Start DateTime cannot be after the end DateTime.",
    "parameters": {
        "startDateTime": "2020-07-25T00:00:00Z",
        "endDateTime": "2020-07-24T19:31:10Z"
    }
}
```

##### Error 2

```
{
    "type": "https://errors-api.cloud.com/systemlog/getRecordsDateTimeRangeInvalid",
    "detail": "Invalid value provided for startDateTime.",
    "parameters": {
        "startDateTime": "invalid"
    }
}   
```

##### Case 2: Limit count is more than the max limit count

```
{
    "type": "https://errors-api.cloud.com/common/outOfRange",
    "detail": "Maximum items per page is between 1 and 200",
    "parameters": {
        "limit": "10000000"
    }
}
```

##### Case 3: Limit is invalid

```
{
    "type": "https://errors-api.cloud.com/systemlog/getRecordsLimitInvalid",
    "detail": "Invalid value provided for limit.",
    "parameters": {
        "limit": "invalid"
    }
}
```

#### 401 UnAuthorized

-  `GET/ records`

##### Case 1: If the Authorization header is empty or missing the reason mentioned in the parameters value is `missing`

```
            {
                "type": "https://errors-api.cloud.com/common/authentication",
                "detail": "Missing or invalid authentication details",
                "parameters": [
                    {
                        "name": "reason",
                        "value": "missing"
                    }
                ]
            }
```

##### Case 2: If the Authorization header is invalid the reason mentioned in the parameters value is `invalid`

```
            {
                "type": "https://errors-api.cloud.com/common/authentication",
                "detail": "Missing or invalid authentication details",
                "parameters": [
                    {
                        "name": "reason",
                        "value": "invalid"
                    }
                ]
            }
```

#### 403 Forbidden

If the Authorization details are provided incorrectly in the header then the following error occurs:

-  `GET/ records`

##### Case 1: Customer (Bearer Token) details are not correct

```
            {
                "type": "https://errors-api.cloud.com/common/authorization",
                "detail": "Access denied"
            }
```

#### 404 Not Found

-  `GET/ records`

##### Case 1: In case the URL is not as per the swagger document

```
            {
                "type": "https://errors-api.cloud.com/systemlog/notFound",
                "detail": "resource not found",
                "parameters": [
                    {
                        "name": "entityType",
                        "value": "/personalizati"
                    }
                ]
            }
```

#### 500    Internal Server Error

Report these errors directly to the engineering team to help resolve the issues. Take a note of the **customer ID** and **Transaction ID** from the customer to troubleshoot further.

-  `GET/ records`

##### Case 1: Server Errors

```
            {
                "type": "https://errors-api.cloud.com/systemlog/internalerror",
                "detail": "There was a internal issue"
            }
```

## Troubleshooting Citrix Cloud licensing APIs

An unsuccessful Citrix Cloud licensing API request returns the following information in the response body:

-  **Type:** A link to the standard HTTP response code.
-  **Details:** A brief description of the error.
-  **Error_Description:** An optional string object to provide the service response error description.

   **Sample API error response**

```
            {
                "type": "404",
                "detail": "resource not found",
                "parameters":
                {
                "name": "entityType",
                "value": "the request URL"
                }
            }
```

### API 1: GET/ license/enterprise/cloud/cvad/ud/historicalusage

-  This API is called to get historical usage for the Citrix DaaS (formerly Citrix Virtual Apps and Desktops service) UserDevice model in the specified time range.

### GET query parameters

-  `startDate`
    -  Start date from which userdevice historical usage to be retrieved.
    -  Must be specified as yyyy-MM.
-  `endDate`
    -  End date to which userdevice historical usage to be retrieved.
    -  Must be specified as yyyy-MM.

### Response codes

The following section lists the response codes for the APIs with examples.

-  [200 OK](#200-ok)
-  [204 No Content](#200-No-Content)
-  [400 Bad Request](#400-Bad-Request)
-  [401 UnAuthorized](#401-UnAuthorized)
-  [403 Forbidden](#403-Forbidden)
-  [404 Not Found](#404-Not-Found)
-  [500 Internal Server Error](#500-Internal-Server-Error)

#### 200 OK

-  `GET/ license/enterprise/cloud/cvad/ud/historicalusage`

##### Records retrieved successfully

```
{
    "customerId": "xingqit48867",
    "historicalUsageType": "Monthly",
    "productEdition": "XAXDFull",
    "xenAppXenDesktopHistoricalUsageList": [
        {
            "cumulativeAssignedCount": 3,
            "newAssignedCount": 0,
            "totalAvailableLicenseCount": 50,
            "timeStamp": "2021-10-01T00:00:00.0000000Z",
            "releasedCount": 0
        },
        {
            "cumulativeAssignedCount": 3,
            "newAssignedCount": 0,
            "totalAvailableLicenseCount": 50,
            "timeStamp": "2021-11-01T00:00:00.0000000Z",
            "releasedCount": 0
        },
        {
            "cumulativeAssignedCount": 3,
            "newAssignedCount": 0,
            "totalAvailableLicenseCount": 25,
            "timeStamp": "2021-12-01T00:00:00.0000000Z",
            "releasedCount": 0
        }
    ],
    "historicalUsageList": [
        {
            "timeStamp": "2021-10-01T00:00:00.0000000Z",
            "totalAvailableLicenseCount": 50,
            "deviceLicenseUsage": {
                "cumulativeAssignedCount": 3,
                "newAssignedCount": 0,
                "releasedCount": 0
            },
            "userLicenseUsage": {
                "cumulativeAssignedCount": 3,
                "newAssignedCount": 0,
                "releasedCount": 0
            }
        },
        {
            "timeStamp": "2021-11-01T00:00:00.0000000Z",
            "totalAvailableLicenseCount": 50,
            "deviceLicenseUsage": {
                "cumulativeAssignedCount": 3,
                "newAssignedCount": 0,
                "releasedCount": 0
            },
            "userLicenseUsage": {
                "cumulativeAssignedCount": 3,
                "newAssignedCount": 0,
                "releasedCount": 0
            }
        },
        {
            "timeStamp": "2021-12-01T00:00:00.0000000Z",
            "totalAvailableLicenseCount": 25,
            "deviceLicenseUsage": {
                "cumulativeAssignedCount": 3,
                "newAssignedCount": 0,
                "releasedCount": 0
            },
            "userLicenseUsage": {
                "cumulativeAssignedCount": 3,
                "newAssignedCount": 0,
                "releasedCount": 0
            }
        }
    ]
}
```

#### 400 Validation errors

If the parameters are provided incorrectly, the following error occurs:

-  `GET/ license/enterprise/cloud/cvad/ud/historicalusage`

##### Case 1: DateTime range is invalid

##### Error 1: If the `startDate` or `endDate` format is not set correctly. Should use this date format 'yyyy-MM'

```
{
    "error_description": "{\"Code\":400,\"Message\":\"Invalid time format.\",\"Details\":\"Invalid time format.\"}"
}
```

##### Error 2: If the `endDate` is earlier then the `startDate` will return following error. Make sure that the time interval is correct

```
{
     "error_description": "{\"Code\":400,\"Message\":\"StartDate can't be later than EndDate.\",\"Details\":\"StartDate can't be later than EndDate.\"}"
}   
```

#### 401 Unauthorized

-  `GET/ license/enterprise/cloud/cvad/ud/historicalusage`

##### Case 1: If the authorization header is empty or missing the reason mentioned in the parameters value is `missing`

```
            {
                "type": "https://errors-api.cloud.com/common/authentication",
                "detail": "Missing or invalid authentication details",
                "parameters": [
                    {
                        "name": "reason",
                        "value": "missing"
                    }
                ]
            }
```

##### Case 2: If the authorization header is invalid the reason mentioned in the parameters value is `invalid`

```
            {
                "type": "https://errors-api.cloud.com/common/authentication",
                "detail": "Missing or invalid authentication details",
                "parameters": [
                    {
                        "name": "reason",
                        "value": "invalid"
                    }
                ]
            }
```

#### 403 Forbidden

If the authorization details are provided incorrectly in the header then the following error occurs:

-  `GET/ license/enterprise/cloud/cvad/ud/historicalusage`

##### Case 1: Customer (Bearer Token) details are not correct

```
            {
                "type": "https://errors-api.cloud.com/common/authorization",
                "detail": "Access denied"
            }
```

#### 404 Not found

-  `GET/ license/enterprise/cloud/cvad/ud/historicalusage`

##### Case 1: In case the URL is not as per the swagger document

```
            {
                "type": "https://errors-api.cloud.com/licensing/notFound",
                "detail": "resource not found",
                "parameters": [
                    {
                        "name": "entityType",
                        "value": "/personalizati"
                    }
                ]
            }
```

#### 500 Internal server error

Report these errors directly to the engineering team to help resolve the issues. Take a note of the **customer ID** and **Transaction ID** from the customer to troubleshoot further.

-  `GET/ license/enterprise/cloud/cvad/ud/historicalusage`

##### Case 1: Server Errors

```
            {
                "type": "https://errors-api.cloud.com/systemlog/internalerror",
                "detail": "There was a internal issue"
            }
```