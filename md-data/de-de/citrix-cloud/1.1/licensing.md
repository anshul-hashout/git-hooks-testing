# How to manage Citrix Cloud licensing

Use the REST APIs to create and consume reports that help you to manage licensing in the Citrix Cloud. As an IT administrator, use the Citrix Cloud licensing APIs for enterprise customers, partners with on-premises Citrix Virtual Apps and Desktops or Citrix DaaS (formerly Citrix Virtual Apps and Desktops service).

## Citrix Cloud licensing API for enterprise customers

Use Citrix Cloud licensing APIs for the following:

-  Export data about the different cloud services into Excel or Tableau. You can export data on devices, users, enrollment, license assigned date, last login time, and historical data up to 12 months.
-  Release expired cloud service licenses such as licenses Citrix DaaS, Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure), Citrix Endpoint Management, or Citrix Secure Private Access.
-  Customize and aggregate data for reporting purposes.

## Citrix Cloud licensing API for partners with on-premises Citrix Virtual Apps and Desktops

As a partner with on-premises Citrix Virtual Apps and Desktops, use Citrix Cloud licensing APIs for the following:

-  To get the number of licenses at a summary level for the following:
    -  Total users
    -  Paid users
    -  Free users
    -  License servers
    -  Customers count
-  To get the number of licenses per customer for the following:
    -  Account name
    -  Total users
    -  Paid users
    -  Free users
-  Historical data up to 12 months

## Citrix Cloud licensing API for partners with Citrix DaaS

As a partner with Citrix DaaS, use Citrix Cloud licensing APIs for the following:

-  To get the number of licenses at a summary level for the following:
    -  Total current number of customers
    -  Total current number of licenses across all customers
    -  Total current number of users across all customers
    -  Total current number of license overages across all customers
-  To get the number of licenses per customer for the following:
    -  Organization ID
    -  Current 'Total Licenses' owned
    -  Current 'Total Users' used
    -  Current 'License Overage'
-  Historical data up to 12 months

## Prerequisites

Read the [prerequisites](/citrix-cloud/citrix-cloud-api/docs/getting-started#prerequisites-to-use-citrix-cloud-services-apis)) and ensure that you have the `customerId` and the `bearer token`.

## Get current usage information for Citrix DaaS UserDevice model using any REST API tool

Learn from the following example to get current usage information for the Citrix DaaS UserDevice model:

### **Request**

```
GET https://api-us.cloud.com/licensing/license/enterprise/cloud/cvad/ud/current
HTTP/1.1
Accept: application/json
Authorization: CwsAuth Bearer=<token-from-call-to-trust>
Citrix-CustomerId: <CustomerId>
```

> **Note:**
> Replace **CustomerId** in the preceding request with the ID of the customer that you want to query.

### **Response**

```
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Length: 463
Content-Type: application/json; charset=utf-8
Date: Sun, 19 Dec 2021 02:56:21 GMT
CC-TransactionId: 9eeac547-cad7-473b-8ee4-a2560ef03f22

{
    "customerId": "xingqit48867",
    "totalUsageCount": 3,
    "userLicenseUsage": {
        "totalUsageCount": 3,
        "releasedCount": 0
    },
    "deviceLicenseUsage": {
        "totalUsageCount": 3,
        "releasedCount": 0
    },
    "totalAvailableLicenseCount": 25,
    "remainingLicenseCount": 22,
    "timeStamp": "2021-12-19T02:56:22.0215469Z",
    "productName": "XenDesktop",
    "nextExpiredLicenses": {
        "nextExpiredTime": "2023-05-10T00:00:00.0000000Z",
        "totalCount": 25,
        "daysToExpire": 507
    },
    "nextActivatingLicense": null,
    "productEdition": "XAXDFull"
}
```

## Get current usage information for Citrix DaaS UserDevice model using C\# code

Learn from the following example to get current usage information for the Citrix DaaS UserDevice model

```csharp
public static async Task<EnterpriseCloudCvadCurrentUsageModel> GetEnterpriseCloudCvadCurrentUsage(string bearerToken, 
string customer)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
    client.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);
    client.DefaultRequestHeaders.Add("Citrix-CustomerId", customer);

    var response = await client.GetAsync(
        $"https://api-us.cloud.com/licensing/license/enterprise/cloud/cvad/ud/current"
    );

    response.EnsureSuccessStatusCode();

    var content = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<EnterpriseCloudCvadCurrentUsageModel>(content);
}  

    public sealed class EnterpriseCloudCvadCurrentUsageModel
    {
        /// <summary>
        /// Customer id(concept in CC).
        /// </summary>
        public string CustomerId { get; set; }

        /// <summary>
        /// Total count of consumed license.
        /// The value will be the Min(TotalUserLicenseUsageCount, TotalDeviceLicenseUsageCount).
        /// </summary>
        public int TotalUsageCount { get; set; }

        /// <summary>
        /// User license usage.
        /// </summary>
        public LicenseUsageModel UserLicenseUsage { get; set; }

        /// <summary>
        /// Device license usage.
        /// </summary>
        public LicenseUsageModel DeviceLicenseUsage { get; set; }

        /// <summary>
        /// The license count that available at specific time point.
        /// </summary>
        public int TotalAvailableLicenseCount { get; set; }

        /// <summary>
        /// The remaining license count that not been consumed. 
        /// </summary>
        public int RemainingLicenseCount { get; set; }

        /// <summary>
        /// Time stamp(UTC, format is follow ISO 8601).
        /// </summary>
        public string TimeStamp { get; set; }

        /// <summary>
        /// Product name.
        /// </summary>
        public string ProductName { get; set; }

        /// <summary>
        /// Purchased license information.
        /// </summary>
        public NextExpiredLicensesModel NextExpiredLicenses { get; set; }

        /// <summary>
        /// License information that will first active(available).
        /// </summary>
        public ActivatingLicenseModel NextActivatingLicense { get; set; }

        /// <summary>
        /// Product edition.
        /// </summary>
        public string ProductEdition { get; set; }
        
    }

    public sealed class LicenseUsageModel
    {
        /// <summary>
        /// Total usage count.
        /// </summary>
        public int TotalUsageCount { get; set; }

        /// <summary>
        /// Released count.
        /// </summary>
        public int ReleasedCount { get; set; }
    }

    public sealed class NextExpiredLicensesModel
    {
         /// <summary>
        /// Time that the license expired(UTC, format follow ISO 8601).
        /// </summary>
        public string NextExpiredTime { get; set; }

        /// <summary>
        /// The total count that the licenses will expired.
        /// </summary>
        public int TotalCount { get; set; }

        /// <summary>
        /// Days remained that the license will expired.
        /// </summary>
        public int DaysToExpire { get; set; }
    }

    public sealed class ActivatingLicenseModel
    {
        /// <summary>
        /// Next active license time (UTC, format follow ISO 8601).
        /// </summary>
        public string ActivatingTime { get; set; }

        /// <summary>
        /// The count that the licenses will be activated at that time.
        /// </summary>
        public int ActivatingCount { get; set; }
    }
```

## API reference

Create and consume reports that help you to manage the usage of your Citrix product licenses using [API reference](/citrix-cloud/citrix-cloud-api/docs/api-overview) section.