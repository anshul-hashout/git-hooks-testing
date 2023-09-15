# How to retrieve records of an activity in your Citrix Cloud account

Use the SystemLog API to retrieve records of the activity in your Citrix Cloud account. This API helps to better understand what changed and who initiated those changes. The API identifies when certain configurations or actions occurred that had an impact on the environment and other account administrators.

Currently, the SystemLog service records events that are related to administrator and secure client operations. The API supports querying these logs for a specific timeframe.

## Who can use the SystemLog API

Citrix Cloud administrators who want to monitor and to be alerted to changes with other administrators or secure clients can use this API. The SystemLog service captures the following events:

-  Administrator invites and acceptance events

-  Changes in administrator permissions

-  Deletion of administrators

-  Secure client creation and deletions

## Prerequisites

Read the [prerequisites](/citrix-cloud/citrix-cloud-api/docs/getting-started#prerequisites-to-use-citrix-cloud-services-apis) and ensure that you have the `customerId` and the `bearer token`.

## Get system records using API call

Use the following example to get details about the system log records of a customer using the SystemLog API call:

### **Request**

```
GET https://api-us.cloud.com/systemlog/records
?StartDateTime=<DateTime>&EndDateTime=<DateTime>&Limit=<Limit>
&ContinuationToken=<Token> 
HTTP/1.1
Accept: application/json
Authorization: CwsAuth Bearer=<token-from-call-to-trust>
Citrix-CustomerId: <CustomerId>
```

> **Note:**
> Replace **CustomerId** in the preceding request, with the ID of the customer that you want to query.

### **Response**

```
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Length: 316
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Dec 2016 22:24:00 GMT
CC-TransactionId: bfc9b56c-bcd0-4cf1-9ea1-3da4d48a81c0

{
    "Items": [{
        "RecordId": null,
        "UtcTimestamp": "2020-07-20T14:26:59.6103585Z",
        "CustomerId": "hulk",
        "EventType": "delegatedadministration:administrator/create",
        "TargetId": "6233644161364977157",
        "TargetDisplayName": "testcduser1@gmail.com",
        "TargetEmail" : "testcduser1@gmail.com",
        "TargetUserId": "a90b4449675f4fcf97e1663623334d74",
        "TargetType": "administrator",
        "BeforeChanges": null,
        "AfterChanges": {
            "CustomerId": "hulk",
            "Principal": "testcduser1@gmail.com",
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
            "es-ES": "Se ha creado el usuario administrador \"6233644161364977157\".",
            "fr-FR": "L'utilisateur administrateur '6233644161364977157' a été créé.",
            "ja-JP": "新しい管理者ユーザー '6233644161364977157' を作成しました。"
        }
    }],
    "Count": 74,
    "EstimatedTotalItems": 250,
    "ContinuationToken": "+RID:~ry4EAPqekBg-KQAAAAAAAA==#RT:1#TRC:74#ISV:2#IEO:65551#FPC:AgEAAQA4AD+pAcD/HzAAIkD/HwAUwQkABhEAABjxAsAAH4ACgKEAABi0BsAAYAAAYAADEQAMABEABgBhAAAwATAAcQBgADEAFADBBeABggj+//8fQRkAoPIFAMAPALEA+AGDBOBBYCMQACEAAP8RQH8A"
}
```

## Get system records using C\# code

Use the following example to count the system log records of a customer using C# code:

```csharp
public static async Task<RecordsResult> GetRecords(string bearerToken, 
string customer, GetRecordsQuery requestQuery)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
    client.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);
    client.DefaultRequestHeaders.Add("Citrix-CustomerId", customer);

    var queryParams= "?";
    if (requestQuery != null)
    {
        uri += $"startDateTime={requestQuery.StartDateTime.ToUniversalTime().ToString(DateTimeFormat)}" +
               $"&endDateTime={requestQuery.EndDateTime.ToUniversalTime().ToString(DateTimeFormat)}" +
               $"&limit={requestQuery.Limit}";

               if (!string.IsNullOrEmpty(requestQuery.ContinuationToken))
               {
                   uri += $"&continuationToken={requestQuery.ContinuationToken}";
               }
    }
    var response = await client.GetAsync(
        $"https://api-us.cloud.com/systemlog/records{uri}"
    );

    response.EnsureSuccessStatusCode();

    var content = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<RecordsResult>(content);
}

    public sealed class GetRecordsQuery
    {
        /// <summary>
        /// Start DateTime for the records to be retrieved.
        /// </summary>
        public DateTime StartDateTime { get; set; }

        /// <summary>
        /// End DateTime for the records to be retrieved.
        /// </summary>
        public DateTime EndDateTime { get; set; }

        /// <summary>
        /// How many items to be returned per page
        /// </summary>
        public int Limit { get; set; }

        /// <summary>
        /// Continuation token for the next page.
        /// </summary>
        public string ContinuationToken { get; set; }
    }    

    public sealed class RecordsResult
    {
        /// <summary>
        /// Items contains a list of User definitions.
        /// </summary>
        public IEnumerable<SystemLogRecord> Items { get; set; }

        /// <summary>
        /// Number of records that has been returned
        /// </summary>
        public int Count { get; set; }

        /// <summary>
        /// Estimation of how many items we have in total with the current filter.
        /// </summary>
        public int EstimatedTotalItems { get; set; }

        /// <summary>
        /// Token for getting next page of items.
        /// </summary>
        public string ContinuationToken { get; set; }
    }


   public sealed class SystemLogRecord
    {
        /// <summary>
        /// Gets or sets the unique identifier for the persisted log record.
        /// </summary>
        public string RecordId { get; set; }

        /// <summary>
        /// Gets or sets the time stamp when the event is recorded.
        /// </summary>
        public DateTime UtcTimestamp { get; set; }

        /// <summary>
        /// Gets or sets the customer ID this event applies to.
        /// </summary>
        public string CustomerId { get; set; }

        /// <summary>
        /// Gets or sets the type (a.k.a. "category" of the recorded event).
        /// </summary>
        /// <remarks>
        /// For example: <c>identity:ad/user-add</c>
        /// </remarks>
        public string EventType { get; set; }

        /// <summary>
        /// Gets or sets the ID of the target resource.
        /// </summary>
        public string TargetId { get; set; }

        /// <summary>
        /// Gets or sets the display name of the target resource.
        /// </summary>
        public string TargetDisplayName { get; set; }

        /// <summary>
        /// Gets or sets the type of the target resource.
        /// </summary>
        public string TargetType { get; set; }

        /// <summary>
        /// Gets or sets a list of relevant property values before the attempted modification of the resource.
        /// </summary>
        /// <remarks>
        /// Each entry in the dictionary is a property name with its associated value.
        /// </remarks>
        public IDictionary<string, string> BeforeChanges { get; set; }

        /// <summary>
        /// Gets or sets a list of relevant property values after the attempted modification of the resource.
        /// </summary>
        /// <remarks>
        /// Each entry in the dictionary is a property name with its associated value.
        /// </remarks>
        public IDictionary<string, string> AfterChanges { get; set; }

        /// <summary>
        /// Gets or sets a recognizable identity of the system or service acting on behalf of <see cref="ActorId"/>.
        /// </summary>
        public string AgentId { get; set; }

        /// <summary>
        /// Gets or sets the optional name of the service profile.
        /// </summary>
        public string ServiceProfileName { get; set; }

        /// <summary>
        /// Gets or sets the internal ID of the actor that generated the event.
        /// </summary>
        public string ActorId { get; set; }

        /// <summary>
        /// Gets or sets the username or system name of the actor that generated the event.
        /// </summary>
        public string ActorDisplayName { get; set; }

        /// <summary>
        /// Gets or sets the type of actor that generated the event.
        /// </summary>
        /// <remarks>
        /// For example: <c>"administrator"</c>, <c>"user"</c>, <c>"service"</c>.
        /// </remarks>
        public string ActorType { get; set; }

        /// <summary>
        /// Gets or sets the optional localized message associated with the event.
        /// </summary>
        /// <remarks>
        /// Each key in the dictionary is a locale, and each value is the message in that language.
        /// </remarks>
        public IDictionary<string, string> Message { get; set; }

     }
```

## API reference

Retrieve records of the administrator activity within your Citrix Cloud account using [API reference](/citrix-cloud/citrix-cloud-api/docs/api-overview) section.