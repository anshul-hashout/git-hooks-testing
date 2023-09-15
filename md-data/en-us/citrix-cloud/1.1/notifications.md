# How to send notifications to administrators

Use REST APIs to send messages to the administrators using the **Notification** feature in the main console:

![figure\_1](/sites/all/themes/citrix_api/images/figure_1.png)

The **Notification** feature can be used for third parties trying to extend Citrix Cloud functionality.

## Prerequisites

Read the [prerequisites](/citrix-cloud/citrix-cloud-api/docs/getting-started#prerequisites-to-use-citrix-cloud-services-apis) and ensure that you have the `customerId` and the `bearer token`.

## Send notification using any REST API tool

Use the following example to send notifications using any REST API call:

### Request

```HTTP
POST https://notifications.citrixworkspacesapi.net/acme/notifications/items HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: CwsAuth bearer=<token-from-call-to-trust>

{
  "destinationAdmin": "*",
  "component": "Citrix Cloud",
  "createdDate": "2018-04-22T21:11:25.006Z",
  "eventId": "768e5756-08bf-47ce-9566-e286887ba734",
  "severity": "Information",
  "priority": "Normal",
  "content": [{
    "languageTag": "en-US",
    "title": "This is a title",
    "description": "This is a description"
  }]
}
```

> **Note:**
>
> Replace `acme` in the preceding example with the ID of the customer for whom to raise the notification.
> Replace `createdDate` in the preceding example with the current time in RFC 3339 format.
> Replace `eventId` in the preceding example with a GUID, uniquely generated for each notification that you want to raise.

### Response

```HTTP
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Length: 2623
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Dec 2016 21:53:37 GMT
X-Cws-TransactionId: 6c3db4d6-125f-4ea3-b938-882bc5dc3caf

{
  "destinationAdmin": "*",
  "component": "Citrix Cloud",
  "createdDate": "2018-04-22T21:11:25.006Z",
  "categories": null,
  "severity": "Information",
  "eventId": "768e5756-08bf-47ce-9566-e286887ba734",
  "priority": "Normal",
  "content": [
    {
      "languageTag": "en-US",
      "title": "This is a title",
      "description": "This is a description",
      "detailUri": null
    }
  ],
  "data": null,
  "externalId": null
}
```

The star (\*) in the `destinationAdministrators` field indicates that the notification is sent to all administrators on the account. Make sure the `eventId` field is set to a unique GUID for each notification that you want to raise.

The notification can now be seen on the Citrix Cloud console:

![figure\_2](/sites/all/themes/citrix_api/images/figure_2.png)

## Send notification using C\# code

Use the following example to send notifications using C# code:

``` csharp
public static async Task<string> SendNotification(
    string bearerToken, string customer, string title, string description)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
    client.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);

    var payload = JsonConvert.SerializeObject(
        new
        {
            destinationAdmin = "*",
            component = "Citrix Cloud",
            createdDate = XmlConvert.ToString(DateTime.UtcNow, XmlDateTimeSerializationMode.Utc),
            eventId = Guid.NewGuid().ToString(),
            severity = "Information",
            priority = "Normal",
            content = new[] {
                new {
                    languageTag = "en-US",
                    title = title,
                    description = description,
                }
            },
         }
    );
    var response = await client.PostAsync(
        "https://notifications.citrixworkspacesapi.net/" + customer + "/notifications/items",
        new StringContent(payload, Encoding.UTF8, "application/json")
    );

    response.EnsureSuccessStatusCode();

    var content = await response.Content.ReadAsStringAsync();

    // Parsing the JSON content is left as an exercise to the reader.
    // Consult Json.NET documentation on newtonsoft.com for more information.

    return content;
}
```

## API reference

Send notification messages to administrators of Citrix Cloud using [API reference](/citrix-cloud/citrix-cloud-api/docs/api-overview) section.