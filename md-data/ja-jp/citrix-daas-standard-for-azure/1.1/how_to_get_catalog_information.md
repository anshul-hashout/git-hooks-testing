# How to get details of a catalog in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to get details of a catalog that was created in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API

## Steps to get details of a catalog in Azure account

To get details of a catalog that was created in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you do not have the `catalogId`, see [how to get details of all catalogs](./how-to-get-details-of-all-catalogs) to get the details of all your catalogs.
-  Use the API in this document to get catalog details.

## Get details of a catalog created in Azure account using any REST API tool

Learn from the following example to get information of a catalog that was created in your Azure account using any REST API tool.

### Request

    GET https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/managedcatalogs/{catalogId} HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 200 OK
    citrix-transactionid: 80699539-ae66-4eb7-ae67-370606d12766
    date: "Wed, 03 Apr 2019 19:42:55 GMT"
    content-length: 877
    content-type: application/json; charset=utf-8
    
    {
      "storeFrontUrl": "2990rs33f5ly.cloudburrito.com",
      "id": "75f7e612-1547-46f4-a04e-fb85e522b19c",
      "name": "Aneesh Catalog",
      "sessionSupport": "MultiSession",
      "allocationType": "Random",
      "offeringId": "44Applications",
      "offeringIdApp": "44Applications",
      "offeringIdDesktop": "44Desktop",
      "advanced": false,
      "state": "InputRequired",
      "warnings": [
        {
          "type": "AppsRequired",
          "isDismissible": false,
          "warningMessage": "You must assign at least one user and one application to your catalog to be ready",
          "isError": false
        }
      ],
      "region": "eastus",
      "domainJoined": true,
      "domainName": "xaebvt.net",
      "domainServiceAccount": "azureadmin",
      "vmTypeInstanceType": "Standard_D2_v2",
      "imageId": "ae3f634c-a8a8-4cf5-83e6-edfc6d6c670c",
      "templateImageName": "Test",
      "totalMachinesInCatalog": 2
    }

### Interpreting the request URL

### **catalogId**

The `catalogId` should be replaced with the actual catalog ID of the
catalog. You can get the `catalogId` by using steps listed in [how to get details of all catalogs](./how-to-get-details-of-all-catalogs)
section.

### Interpreting the response

| Property name | Description |
| --- | --- |
| storeFrontUrl | The Storefront or Workspace URL for the customer to access their apps. This is only available for Active catalogs. |
| id | The ID of the catalog. This is the ID to pass to any API that accepts a catalogId. |
| name | The name of the catalog. |
| sessionSupport | Indicates if the VDAs support single or multiple concurent sessions |
| allocationType | Indicates the manner in which machines are allocated to users |
| state | The current state of the catalog. A state of *Input Required* or *Active* indicates that the catalog deployment is successful. |
| warnings | Any warnings associated with the catalog. |
| region | The Azure region that VNET used by catalog resides.|
| domainJoined | The flag to indicate if the catalog is joined with customer domain |
| domainName | The name of the domain to which Cloud Connectors and VDAs are joined. |
| domainServiceAccount | The service account name used to join the Cloud Connectors and VDAs to the domain. |
| vmTypeInstanceType | Type of the VM machines used to create VDAs |
| ImageId | The ID of the master image tied to the catalog. Use [how to get an image](./how-to-get-a-master-image) to get the details of this image. |
| templateImageName | The friendly name of the master image. |
| totalMachinesInCatalog | Maximum number of machines assigned to the catalog |

## Get details of a catalog created in Azure account using PowerShell

Learn from the following example to get information of a catalog that was created in your Azure account using any PowerShell code.

``` powershell
function GetCatalog {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken,
    [Parameter(Mandatory=$true)]
    [string] $catalogId
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/managedcatalogs/{2}", $customerId, $siteId, $catalogId)
  $headers = @{"Accept"="application/json";
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method GET -Headers $headers
  return $response
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$catalogId = "56f1cbf3-1cc6-40cd-9c82-c95633ba88bb" #Replace with your catalog ID
$response = GetCatalog $customerId $siteId $bearerToken $catalogId
```

## Get details of a catalog created in Azure account using C\# code

Learn from the following example to get information of a catalog that was created in your Azure account using C\#.

``` csharp
public static async Task<string> GetCatalog(
    string customerId,
    string siteId,
    string bearerToken,
    string catalogId)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/managedcatalogs/{2}", customerId, siteId, catalogId);
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
