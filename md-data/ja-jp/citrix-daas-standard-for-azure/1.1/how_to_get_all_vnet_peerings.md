# How to get details of all VNet peerings in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to get details of all VNet peerings added to your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to get details of all VNet peerings in Azure account

To get details of all VNet peerings that were added to your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  Use the API in this document to get all VNet Peerings.

## Get details of all VNet peerings in Azure account using any REST API tool

Learn from the following example to get details of all VNet peerings that were added to your Azure account using any REST API tool.

### Request

    GET https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/managedCapacity/onPremConnections?cspCustomerId=4e53dcaa-b61a-...&cspSiteId=74ea9d7f-eb00-... HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 200 OK
    Content-Length: 2304
    Content-Type: application/json; charset=utf-8
    Date: Wed, 02 Aug 2017 20:35:07 GMT
    
    {
      "items": [
        {
          "state": "Complete",
          "error": "",
          "transactionId": "d3312caa-b61a-4e53-884d-e5525ed395b9",
          "region": "westus",
          "ipAddressSpace": [
            "15.10.0.0/24"
          ],
          "numberOfAddressesInUse": 1,
          "isPeeringActive": true,
          "citrixManaged": false,
          "peeredVnetId": "/subscriptions/787e4de3-0e77-.../resourceGroups/BVT4/providers/Microsoft.Network/virtualNetworks/BVT4-Vnet",
          "catalogs": [],
          "images": [],
          "id": "4f280900-8fc5-424e-80de-fd7e080c6c1c",
          "type": "VnetPeering",
          "name": "0409-bvt4-vnet"
        },
        {
          "state": "Complete",
          "error": "",
          "transactionId": "77d24d7f-eb00-4ea9-96e4-381bf4e7913e",
          "region": "westus",
          "ipAddressSpace": [
            "14.10.0.0/23"
          ],
          "numberOfAddressesInUse": 9,
          "isPeeringActive": true,
          "citrixManaged": false,
          "peeredVnetId": "/subscriptions/ebe15c11-056e-.../resourceGroups/Emily-test-new/providers/Microsoft.Network/virtualNetworks/vnet-new",
          "catalogs": [
            "0dc026d5-10f0-4457-8745-97cd57a04bc3",
            "43beff17-fe25-4bc6-9c01-e2b6f557540f"
          ],
          "images": [
            "8e9fe8de-7da5-4562-976d-fceca9905b9e"
          ],
          "id": "27c1e634-45cc-4a23-b537-ac9cff91777c",
          "type": "VnetPeering",
          "name": "0409-emily-vnet"
        },
        ....
      ]
    }

### Interpreting the request URL

#### cspCustomerId

Tenant customer ID if partner-tenant relationship exists otherwise not
null.

#### cspSiteId

Tenant customer site ID if partner-tenant relationship exists otherwise
not null.

### Interpreting the response

The response is a JSON with a list of all your requested images.

| Property name | Description |
| --- | --- |
| id | The ID of the VNet Peering. |
| name | The friendly name of the master image. |
| state | The current state of the VNet Peering. A state of *complete* indicates that the VNet Peering is ready to be used by a catalog or an image builder. |
| type | Type of the VNet, for Managed Desktops VNet Peering this will always be VnetPeering". |
| error | Error that occured while peering the vnet. |
| transactionId | ID of the transaction that performed pairing job. |
| region | Azure region the peering is located in.|
| ipAddressSpace | The IP Ranges allocated to the peering. |
| numberOfAddressesInUse | Number of IP Addresses that are currently in use in the subnet. |
| citrixManaged | Indicates if the Peering is managed by Citrix. For Managed Desktops VNet Peering this will always be true|
| peeredVnetId | Resource ID of the Peered VNet on Azure.|
| catalogs | List of catalogs that are currently using IP Addresses in the subnet.|
| images | List of image builder VMs that are currently using IP Addresses in the subnet. |

## Get details of all VNet peerings in Azure account using PowerShell

Learn from the following example to get details of all VNet peerings that were added to your Azure account using PowerShell code.

``` powershell
function GetAllVnetPeerings {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/managedCapacity/onPremConnections", $customerId, $siteId)
  $headers = @{"Accept"="application/json";
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method GET -Headers $headers
  return $response
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$response = GetAllMasterImages $customerId $siteId $bearerToken
```

## Get details of all VNet peerings in Azure account using C\# code

Learn from the following example to get details of all VNet peerings that were added to your Azure account using C\# code.

``` csharp
public static async Task<string> GetAllVnetPeerings(
    string customerId,
    string siteId,
    string bearerToken)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/managedCapacity/onPremConnections?cspCustomerId=4e53dcaa-b61a-...&cspSiteId=74ea9d7f-eb00-...", customerId, siteId);
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
