# How to create a webhook and get an attention of Citrix Cloud events

Use APIs to create a webhook. Using this webhook, customers can get attention to the Citrix Cloud events by configuring Citrix Cloud to call a URL of their choice when the events occur.

Citrix Cloud raises events for various activities, including:

-  Administrator logon
-  Create, update, and delete of some objects
-  Notifications raised

## Prerequisites

Read the [prerequisites](/citrix-cloud/citrix-cloud-api/docs/getting-started#prerequisites-to-use-citrix-cloud-services-apis) and ensure that you have the `customerId` and the `bearer token`.

## Create a webhook using the API call

Use the following example to create a webhook using an API call:

### Request

```HTTP
POST https://webhooks.citrixworkspacesapi.net/acme/subscriptions HTTP/1.1
Accept: application/json
Authorization: CwsAuth Bearer=<token-from-call-to-trust>
Content-Type: application/json

{
  "customerId": "acme",
  "description": "my webhook",
  "url": "https://mycallback.myserver.com/myapi",
  "authHeaders": "Basic ...",
  "changeType": "*",
  "eventType": "*"
}
```

>**Note**:
> Replace `acme` with the ID of the customer that you want to query both in the URL and in the POST body.
> Replace the preceding `url` with the URL of your service's REST endpoint. This endpoint is called with the HTTP `POST` method.

### Interpreting the request

The `customerId` must be the same customer ID used in the request URL, and must be a customer for which the bearer token is authorized.

The `description` can be an arbitrary string, useful to locate specific webhooks later.

The `url` is the URL of your service's REST endpoint. This endpoint is called with the HTTP `POST` method and must be internet-accessible.

The `authHeaders` is optional, but defines the `Authorization` header value that is set when your service's REST endpoint is called. If not defined, no Authorization header is set.

The `changeType` allows you to listen only to specific kinds of changes:

-  **Create**: invoked when objects are created. This includes when Notifications are created.
-  **Update**: invoked when objects are updated.
-  **Delete**: invoked when objects are deleted.
-  **Login**: invoked when a login is performed.
-  **\***: Asterisk indicates that all types of changes must be listened to.

The `eventType` allows you to listen only to events on specific types of objects:

-  **Administrator**: Citrix Cloud administrator events.
-  **ClientAdministrator**: Secure client events.
-  **ResourceLocation**: Resource location changes.
-  **EdgeServers**: Connectors.
-  **Notifications**: Notifications.
-  **Forests**: Active Directory forests.
-  **Domains**: Active Directory domains.
-  **Entitlement**: Entitlements, which might change a service's entitlement status.
-  **Subscriptions**: User assignments to resources in the Library.
-  **Webhooks**: Web hooks.
-  **\***: Asterisk indicates that all types of objects must be listened to.

>**Note**: Both `changeType` and `eventType` are extensible. Values might be used that are not yet documented.

### Response

```HTTP
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Length: 2031
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Dec 2016 22:24:00 GMT
X-Cws-TransactionId: bfc9b56c-bcd0-4cf1-9ea1-3da4d48a81c0

{
    "id": "dcc7cb2f-2eb6-47a9-b738-7c86290b6f1f",
    "customerId": "acme",
    "subscriptionType": "Webhook",
    "url": "https://mycallback.myserver.com/myapi",
    "description": "synergy demo",
    "authHeaders": "Basic ...",
    "eventType": "*",
    "changeType": "*",
    "createdBy": "my.email@mycompany.com",
    "eTag": "W/\"datetime'2018-04-23T22%3A05%3A25.0107692Z'\""
}
```

>**Note**: Some response properties are omitted in this documentation because they are not relevant to external callers. Undocumented properties are subject to be removed or changed at any time.

## Callbacks

### Common callback request body

The following is an example for the request body each time when a webhook is called:

```JSON
{
  "CustomerId": "acme",
  "Type": "Notifications",
  "ChangeType": "Create",
  "TransactionId": "9cc8c8d0-3d24-46f4-b63c-8c5d092b7205",
  "Identity": "tom.kludy@citrix.com",
  "BeforeChange": <beforeChange>,
  "AfterChange": <afterChange>,
  "TimeStamp": "2018-04-24T15:15:49.493Z"
}
```

>**Note**: Some response properties are omitted in this documentation because they are not relevant to external callers. Undocumented properties are subject to be removed or changed at any time.

The `CustomerId` is the Citrix Cloud customer ID.

The `Type` is the type of the object on which the event occurred.

The `ChangeType` is the type of event. For example, **Create**, **Update**, and so on.

The `TransactionId` identifies the high-level operation that caused the event. This can be used to correlate multiple events if they happen as part of a single transaction, or can also be used when opening a Citrix Cloud support ticket to help Citrix locate further information about calls that fail.

The `Identity` is the identity of the person or service that triggered the event. When a person triggers an event through a UI action or API call, this is the identity of that person. If an event happens as part of a background operation in Citrix Cloud, this is the identity of the service that triggered the background operation.

The `BeforeChange` and `AfterChange` indicate the state of the object before and after the event occurred. Not all events use these fields, and the format of the fields varies for each event that can be triggered. When the fields are used, their content is string-encoded JSON, for example:

```JSON
"AfterChange": "{\"PublishNotificationId\":\"2518777178829331203_YB2Y1\",\"Destination\":\"acme;*\",\"Component\":\"Citrix Cloud\",\"CreatedDate\":\"2018-04-24T15:15:17.0668796Z\",\"Categories\":[],\"Severity\":0,\"EventId\":\"7df85e7a-79b8-4cc2-abe0-c2f9ba2ec715\",\"Priority\":0,\"Content\":[{\"LanguageTag\":\"en-US\",\"Title\":\"This is a title\",\"Description\":\"This is a description\",\"DetailUri\":null}],\"Data\":null,\"ExternalId\":null}",
```

The `TimeStamp` indicates the date and time when the event occurred, in RFC 3339 format.

### Type: "Notifications" / ChangeType: "Create"

Called when a notification is raised. The `BeforeChange` property is null, and the `AfterChange` property will be string-encoded JSON in this format:

```JSON
{
  "PublishNotificationId": "2518777178829331203_YB2Y1",
  "Destination": "acme;*",
  "Component": "Citrix Cloud",
  "CreatedDate": "2018-04-24T15:15:17.0668796Z",
  "Categories": [],
  "Severity": 0,
  "EventId": "7df85e7a-79b8-4cc2-abe0-c2f9ba2ec715",
  "Priority": 0,
  "Content": [
      {
          "LanguageTag": "en-US",
          "Title": "This is a title",
          "Description": "This is a description",
          "DetailUri": null
      }
  ],
  "Data": null,
  "ExternalId": null
}
```

The properties are:

-  `Destination`: The customer and administrator targeted by the notification. Customer and administrator are separated with a semicolon (;), and asterisk (\*) means "all".

-  `Component`: Component which raised the notification.

-  `CreatedDate`: Date when the notification was created. This is not validated; callers can specify any date and time they like. The `TimeStamp` in the outer payload might be a more accurate indicator.

-  `Categories`: Optional list of categories which the notification falls under.

-  `Severity`: Severity of the event:

    -  **0**: Informational.
    -  **1**: Success.
    -  **2**: Warning.
    -  **3**: Error.

-  `Priority`: Priority of the event:

    -  **0**: Normal.
    -  **1**: Low.
    -  **2**: High.
    -  **3**: Urgent.

-  `EventId`: ID of the event. This ID isn't validated; callers can create multiple events with the same ID.

-  `Content`: The notification content. This property is an array and can contain the message in multiple languages.

### Type: "Administrator" / ChangeType: "Login"

Called when an admin logs into the customer. The `BeforeChange` property is null, and the `AfterChange` property is string-encoded JSON in this format:

```JSON
{
  "CustomerId": "acme",
  "LogonTime": "2018-04-24T21:21:42.521Z",
  "OrgId": "1487a6",
  "Principal": "joe@mycompany.com"
}
```

The properties are:

-  `CustomerId`: The Citrix Cloud customer that the admin logged into.

-  `LogonTime`: The date and time the administrator logon occurred, in RFC 3339 format.

-  `OrgId`: The Citrix OrgID for the customer that the admin logged into.

-  `Principal`: The identity of the admin that logged in. Note: This property isn't guaranteed to be in email format.

## API reference

Create a webhook to receive notifications on Citrix Cloud events using [API reference](/citrix-cloud/citrix-cloud-api/docs/api-overview) section.