# How to determine service entitlement status for a customer

Use the `serviceStates` API within Citrix Cloud to find out which services a customer is entitled to, the days remaining on each of those entitlements, and the "quantity" of each entitlement.

## Prerequisites

Read the [prerequisites](/citrix-cloud/citrix-cloud-api/docs/getting-started#prerequisites-to-use-citrix-cloud-services-apis) and ensure that you have the `customerId` and the `bearer token`.

## Get service state details using API call

Use the following example to get details about the service state of a customer using the `serviceStates` API call:

### Request

```HTTP
GET https://core.citrixworkspacesapi.net/acme/serviceStates HTTP/1.1
Accept: application/json
Authorization: CwsAuth Bearer=<token-from-call-to-trust>
```

> **Note:** Replace `acme` in the preceding GET method, with the ID of the customer you want to query.

### Response

```HTTP
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Length: 2031
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Dec 2016 22:24:00 GMT
X-Cws-TransactionId: bfc9b56c-bcd0-4cf1-9ea1-3da4d48a81c0

{
    "items": [
        {
            "serviceName": "applayering",
            "state": "Production",
            "type": "Production",
            "quantity": 1,
            "daysToExpiration": 622,
            "futureEntitlementStartDate": null
        },
        {
            "serviceName": "xendesktop",
            "state": "Production",
            "type": "Production",
            "quantity": 100,
            "daysToExpiration": 622,
            "futureEntitlementStartDate": null
        },
        ...
     ]
}
```

### Interpreting the response

The `serviceName` is the name of each product service within Citrix Cloud.

-  **applayering**: App Layering.
-  **xendesktop**: XenApp and XenDesktop service.
-  **lifecyclemanagement**: Smart Tools.
-  **sharefile**: ShareFile.
-  **xenmobile**: XenMobile service.
-  **browserservice**: Secure browser service.
-  **licensing**: License Usage Insights service.
-  **office365**: Office365 service (labs).
-  **mas**: NetScaler Management and Analytics service.
-  **netscalergateway**: NetScaler Gateway service.
-  **aggregation**: On-premises Site Aggregation service.
-  **cas**: Citrix Analytics service.
-  **waf**: Web App Security service.

The `state` can be one of:

-  **NotOnboarded**: The customer has not yet been onboarded to the service. Customers get onboarded to services when they receive an entitlement to the service.
-  **Expired**: The entitlement to the service has expired.
-  **Default**: The service has not received any entitlements.
-  **ProductionTrialDenied**: A trial request for the service has been denied.
-  **ProductionTrialPending**: A trial for the service has been requested and is awaiting approval.
-  **ProductionTrialApproved**: A trial for the service has been granted, and is being provisioned.
-  **ProductionTrial**: The service is active, within a trial period.
-  **ProductionTrialDeleted**: The service trial period was completed, and the service data was deleted.
-  **ProductionPending**: The service is being provisioned.
-  **Production**: The service is active in a production mode.
-  **PartnerProductionPending**: The service is being provisioned in a partner (for instance resellable) mode.
-  **PartnerProduction**: The service is active in a partner (for example resellable) mode.
-  **NotOnboardedTrialPending**: The customer hasn't yet been onboarded to the service but a trial has already been requested.

>**Note:**
>
> The states can be grouped into three categories:
>
>-  The customer isn't currently entitled to the service - The states can be **NotOnboarded**, **Expired**, **Default**, **ProductionTrialDenied**, **ProductionTrialPending**, or **ProductionTrialDeleted**.
>
>-  The customer is entitled to the service but the service has not yet been provisioned - The states can be **ProductionTrialApproved**, **ProductionPending**, **PartnerProductionPending**, or **NotOnboardedTrialPending**.
>
>-  The customer is entitled to the service and it is fully provisioned - The states can be **ProductionTrial**, **Production**, or **PartnerProduction**.

The `type` indicates the service mode:

-  **Production**: The service operates with full capabilities as defined by the terms of its license.
-  **ProductionTrial**: The customer has temporary access to evaluate the service. The service might also have lower availability and redundancy than the **Production** mode.
-  **PartnerProduction**: Similar to **Production** but allowing the partner to resell the service.
-  **Default**: The customer isn't entitled to the service.

The `quantity` indicates the number of licenses currently active for the service. Consult the service documentation to determine what the `quantity` metric refers to (users, devices, capacity units, and so on).

The `daysToExpiration` indicates the number of days remaining in the license term. If a customer has purchased multiple licenses for the same service, with different end dates, `daysToExpiration` reflects the longest remaining license term.

`futureEntitlementStartDate`, if present, indicates a future date at which the service entitlement takes effect.

## Get service state details using C\# code

Use the following example to count the service states of a customer using C# code:

``` csharp
public static async Task<ItemCollection<ServiceStateResponse>> GetServiceStates(string bearerToken, string customer)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
    client.DefaultRequestHeaders.Authorization =
              new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);

    var response = await client.GetAsync(
        "https://core.citrixworkspacesapi.net/" + customer + "/serviceStates"
    );

    response.EnsureSuccessStatusCode();

    var content = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<ItemCollection<ServiceStateResponse>>(content);
}

public class ItemCollection<T>
{
    public IList<T> Items { get; set; }
}

public class ServiceStateResponse
{
    public string ServiceName { get; set; }
    public string State { get; set; }
    public string Type { get; set; }
    public int? Quantity { get; set; }
    public int? DaysToExpiration { get; set; }
    public string FutureEntitlementStartDate { get; set; }
}
```

## API reference

Determine details about the services that a customer is entitled to on Citrix Cloud using [API reference](/citrix-cloud/citrix-cloud-api/docs/api-overview) section.