# How to get details of all images in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to get details of all images that were added to your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to get details of all images in Azure account

To get details of all images that were added to your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  Use the API in this document to get all master images.

## Get details of all images in Azure account using any REST API tool

Learn from the following example to get details of all images that were added to your Azure account using any REST API tool.

### Request

    GET https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/images?includeCitrixPrepared=false&includeCustomerPrepared=true&azureSubscriptions=48068c14-8ac8-...&cspCustomerId=4e53dcaa-b61a-...&cspSiteId=74ea9d7f-eb00-... HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 200 OK
    citrix-transactionid: 1eb88e19-603f-4078-9eb2-7cda0af2a6d3
    content-Length: 40281
    content-Type: application/json; charset=utf-8
    date: Tue, 09 Apr 2019 17:58:52 GMT
    
    {
      "items": [
        {
          "id": "63b26cf6-311d-46a8-8ac8-48068c149231",
          "name": "0409-build -2016",
          "sessionSupport": "MultiSession",
          "state": "BuilderStopped",
          "osName": "Microsoft Windows Server 2016 Datacenter",
          "osVersion": "10.0.14393",
          "isServerOs": true,
          "vdaVersion": "1903.1.0.21161",
          "status": "",
          "extraInfo": "",
          "transactionId": "0a546155-75c8-40ab-bdef-af7ec215ac36",
          "region": "westus",
          "citrixPrepared": false,
          "isDeprecated": false,
          "linkedCatalogs": 0,
          "linkedCatalogsNames": []
        },
        {
          "id": "e4688c56-a3af-4b4d-868a-2a039b90e30a",
          "name": "Windows 10 RS4 Pro with VDA 7.18",
          "sessionSupport": "SingleSession",
          "state": "Ready",
          "isServerOs": false,
          "status": "",
          "extraInfo": "",
          "region": "",
          "citrixPrepared": true,
          "isDeprecated": true,
          "linkedCatalogs": 0,
          "linkedCatalogsNames": []
        },
        ...
      }
    }

### Interpreting the request URL

#### **includeCitrixPrepared**

Set this to true to have the Citrix prepared images included in the
response.

#### **includeCustomerPrepared**

This should always be set to true to list all master images.

#### **azureSubscriptions**

The IDs of the Azure Subcrption we want customer images from (If not
specified we get all).

#### **cspCustomerId**

Name of tenant customer ID if partner-tenant relationship exists
otherwise not null.

#### **cspSiteId**

Name of tenant site ID if partner-tenant relationship exists otherwise
not null.

### Interpreting the response

The response is a JSON with a list of all your requested images.

| Property name | Description |
| --- | --- |
| id | The ID of the master image.|
|name | The friendly name of the master image.|
| sessionSupport | Type of sessions that are supported by the OS of the master image.|
| state | The current state of the master image. A state of *Ready* indicates that the image is ready to be used by a catalog. |
| osName | Name of master image OS. |
| osVersion | Version of master image OS. |
| isServerOs | Indicates if the image is using a server based OS. |
| vdaVersion | Version of the master image Virtual Desktop Agent. Only applicable for image builder. |
| status | The friendly message describing the current state of the image when the image has not yet transitioned to *Ready* state.|
| extraInfo | Extra information about the master image. |
| transactionId | Provide this transactionId to Citrix Support if you need help with this image. |
| region | Azure region where VMs are deployed for this catalog. Only applicable for image builder. |
| citrixPrepared | Indicates if this is a Citrix prepared image or not. This will be false for all images added by the customer. |
| isDeprecated | Indicates if this is a Citrix prepared deprecated image or not. This will be false for all images added by the customer. |
| linkedCatalogs | The number of catalogs using this image. This will be 0 for an image that has just been added and has never been used by a catalog. |
| linkedCatalogsNames | List of catalogs that are using this image.|

## Get details of all images in Azure account using PowerShell

Learn from the following example to get details of all images that were added to your Azure account using any PowerShell code.

``` powershell
function GetAllMasterImages {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/images?includeCitrixPrepared=false&includeCustomerPrepared=true", $customerId, $siteId)
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

## Get details of all images in your Azure account using C\# code

Learn from the following example to get details of all images that were added to your Azure account using C\# code.

``` csharp
public static async Task<string> GetAllMasterImages(
    string customerId,
    string siteId,
    string bearerToken)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/images?includeCitrixPrepared=false&includeCustomerPrepared=true", customerId, siteId);
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
