# How to get details of all catalogs in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to get details of all catalogs that were created in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to get details of all catalogs in Azure acocunt

To get details of all catalogs that were created in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  Use the API in this document to get details of all Citrix DaaS Standard for Azure catalogs in an account.

## Get details of all catalogs created in Azure account using any REST API tool

Learn from the following example to get information of all catalogs that were created in your Azure account using any REST API tool.

### Request

    GET https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/managedcatalogs HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 200 OK
    citrix-transactionid: 02624bbd-510b-4b5d-a731-3399d47fab01
    date: "Wed, 03 Apr 2019 17:09:37 GMT"
    content-length: 7046
    content-type: application/json; charset=utf-8
    
    {
      "maxCatalogVdas": 3,
      "items": [
        {
          "storeFrontUrl": "customer.cloudburrito.com",
          "id": "4e153704-4def-4a6a-a9a9-4e3f7e7a7bc2",
          "name": "Finance Catalog",
          "sessionSupport": "MultiSession",
          "allocationType": "Random",
          "offeringId": "304Applications",
          "offeringIdApp": "304Applications",
          "offeringIdDesktop": "304Desktop",
          "advanced": false,
          "state": "Unknown",
          "warnings": [],
          "statusMessage": "Unable to determine the catalog state. Please contact support",
          "region": "eastus",
          "domainJoined": true,
          "domainName": "xaebvt.net",
          "domainServiceAccount": "azureadmin",
          "vmTypeInstanceType": "Standard_D2_v2",
          "imageId": "73708a34-f524-453f-9268-1d6240575a92",
          "templateImageName": "Windows Server 2012 R2 with VDA 7.1811",
          "totalMachinesInCatalog": 2
        }
      ],
      "catalogLimit": {
        "limit": 1000,
        "existingCatalogsCount": 4,
        "serviceState": "ProductionTrial",
        "hasLimitReached": false
      }
    }

### Interpreting the response

The response is a JSON with a list of all your catalogs.

| Property name | Description |
| --- | --- |
| storeFrontUrl | The Storefront or Workspace URL for the customer to access their apps. This is only available for Active catalogs. |
| id | The ID of the catalog. This is the ID to pass to any API that accepts a catalogId. |
| name | The name of the catalog. |
| sessionSupport | Indicates if the VDAs support single or multiple concurent sessions |
| allocationType | Indicates the manner in which machines are allocated to users |
| state | The current state of the catalog. A state of *Input Required* or *Active* indicates that the catalog deployment is successful. |
| warnings | Any warnings associated with the catalog. |
| statusMessage | If the catalog is not in *Input Required* or *Active* state, this property will provide a friendly message describing the current state of the catalog.|
| region | The Azure region that VNET used by catalog resides.|
| domainJoined | The flag to indicate if the catalog is joined with customer domain |
| domainName | The name of the domain to which Cloud Connectors and VDAs are joined. |
| domainServiceAccount | The service account name used to join the Cloud Connectors and VDAs to the domain. |
| vmTypeInstanceType | Type of the VM machines used to create VDAs |
| ImageId | The ID of the master image tied to the catalog. Use [how to get an image](./how-to-get-a-master-image) to get the details of this image. |
| templateImageName | The friendly name of the master image. |
| totalMachinesInCatalog | Maximum number of machines assigned to the catalog |
| CatalogLimit | The number of catalogs the customer is allowed to have in the account. |
| maxCatalogVdas | The maximum number of VDAs for a catalog |

## Get details of all catalogs created in Azure account using PowerShell

Learn from the following example to get information of all catalogs that were created in your Azure account using any PowerShell code.

``` powershell
function GetAllCatalogs {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/managedcatalogs", $customerId, $siteId)
  $headers = @{"Accept"="application/json";
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method GET -Headers $headers
  return $response
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$response = GetAllCatalogs $customerId $siteId $bearerToken
```

## Get details of all catalogs created in Azure account using C\# code

Learn from the following example to get information of all catalogs that were created in your Azure account using C\# code.

``` csharp
public static async Task<string> GetAllCatalogs(
    string customerId,
    string siteId,
    string bearerToken)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/managedcatalogs", customerId, siteId);
    using (var client = new HttpClient())
    {
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
        client.DefaultRequestHeaders.Authorization =
                   new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);

        var response = await client.GetAsync(requestUri);

        if (response != null)
        {
            var content = await response.Content.ReadAsStringAsync();

            // Parsing the JSON content is left as an exercise to the reader.
            // Consult Json.NET documentation on newtonsoft.com for more information.

            return content;
        }

        return null;
    }
}
```

See [how to get catalog information](./how-to-get-catalog-information) to
get the details of a single Managed Desktops catalogs.
