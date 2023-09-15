# Common Citrix cloud services API error codes

When you make a call to Citrix Cloud service APIs, you get either a success or failure status. Each Citrix Cloud service API defines success and failure codes independently but a few response codes are common across Citrix Cloud. Error codes help you to troubleshoot unsuccessful API requests.

This section gives a list of common error code responses that the REST API generates.

## 400-Bad request

The caller passed data that does not meet all validation rules, or is invalid based on the application state.

Following table lists the common error types and description:

| Error type | Description |
|------------|------------ |
|`https://errors-api.cloud.com/common/outOfRange` | A number is out of range.|
|`https://errors-api.cloud.com/common/tooLong` | A string is too long.|
|`https://errors-api.cloud.com/common/invalidString` | A string was specified with invalid characters (does not match the validation regex).|
|`https://errors-api.cloud.com/common/invalidEnum` | A value was specified for an enumeration property which the service did not understand.|
|`https://errors-api.cloud.com/common/missing` | A required input value was missing.|
|`https://errors-api.cloud.com/common/invalidJson` | The input json uses non-standard json extensions or it is not a well formed json.|

## 401-Unauthorized

Caller passed invalid authentication data (no authentication, or a bad bearer token).

Example response body:

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

## 403-Forbidden

Caller passed valid authentication data, but does not have adequate permissions to call the requested API.

Example response body:

```
{
    "type": "https://errors-api.cloud.com/common/authorization",
    "detail": "Access denied",
    "parameters": [
        {
            "name": "entityType",
            "value": "https://identifiers-api.cloud.com/example/widget"
        },
        {
            "name": "id",
            "value": "guid1"
        }
    ]
}
```

## 404-Not found

Entity not found. Response must indicate the type of entity not found, and the ID by which the entity was attempted to be located.

Example response body:

```
{
    "type": "https://errors-api.cloud.com/common/notFound",
    "detail": "Widget not found",
    "parameters": [
        {
            "name": "entityType",
            "value": "https://identifiers-api.cloud.com/example/widget"
        },
        {
            "name": "id",
            "value": "guid1"
        }
    ]
}
```

## 406-Not acceptable

Indicates that the caller passed a value in the `Accept` header which indicates an unsupported media type. It is preferable to be restrictive rather than flexible. Do not support media types if you don't have to.

Example response body:

```
{
    "type": "https://errors-api.cloud.com/common/notAcceptable",
    "detail": "Must accept application/json media type",
    "parameters": [
        {
            "name": "contentType",
            "value": "application/json"
        }
    ]
}
```

## 409-Request conflict

The caller attempted to make a change by providing an Entity tag (ETag). However, the ETag did not match the current state of the entity (optimistic concurrency failure).

Example response body:

```
{
    "type": "https://errors-api.cloud.com/common/optimisticConcurrency",
    "detail": "Widget X was modified, please try your changes again"
}
```

## 415-Unsupported media type

The service cannot accept the request because the payload format is not supported.

Example response body:

```
{
    "type": "https://errors-api.cloud.com/common/unsupportedMediaType",
    "detail": "Must use application/json; charset=utf-8 media type",
    "parameters": [
        {
            "name": "mediaType",
            "value": "application/xml"
        }
    ]
}
```

## 429-Too many requests

The caller is being rate-limited. Services set their own rate limits. Refer to the **Rate Limit** section of the service for more details.

Example response body:

```
{
    "type": "https://errors-api.cloud.com/common/rateLimitExceeded",
    "detail": "Rate limit exceeded; try again in 4 seconds",
    "parameters": [
        {
            "name": "retryDelay",
            "value": "4"
        }
    ]
}
```

## 501-Not implemented

API is not yet implemented but might be implemented at some point in the future.

Example response body:

```
{
    "type": "https://errors-api.cloud.com/common/notImplemented",
    "detail": "Not implemented"
}
```

## 503-Service unavailable

Service is unavailable through no fault of the caller. A caller can retry at some point in the future.

Example response body:

```
{
    "type": "https://errors-api.cloud.com/common/serviceUnavailable",
    "detail": "Service is unavailable; try again in 4 seconds",
    "parameters": [
        {
            "name": "retryDelay",
            "value": "4"
        }
    ]
}
```
