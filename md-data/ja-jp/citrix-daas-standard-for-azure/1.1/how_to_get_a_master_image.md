# How to get details of an image in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to get details of an image that was added to your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to get details of an image in your Azure account

To get details of an image that was added to your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you do not have the `imageId`, see [how to get details of all images](./how-to-get-details-of-all-images) to get the image id of all your posted images.
-  Use the API in this document to get the master image.

## Get details of an image in Azure account using any REST API tool

Learn from the following example to get details of an image that was added to your Azure account using any REST API tool.

### Request

    GET https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/images/{imageId} HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 200 OK
    citrix-transactionid: 80699539-ae66-4eb7-ae67-370606d12766
    content-Length: 1616
    content-Type: application/json; charset=utf-8
    date: Wed, 02 Aug 2017 20:35:07 GMT
    
    {
      "catalogs": [
        {
          "catalogId": "198a1538-ec7a-48db-8b38-fca55542f4f3",
          "catalogName": "Finance Catalog",
          "state": "Active",
          "azureSubscription": "xxx@citrix.com"
        },
        ...
      ],
      "applications": [
        {
          "id": "fc9d89b5-9914-4367-b32a-2a48b1db40af",
          "name": "Acrobat Reader DC",
          "applicationPath": "C:\\Program Files (x86)\\Adobe\\Acrobat Reader DC\\Reader\\AcroRd32.exe",
          "workingDirectory": "%ProgramFiles(x86)%\\Adobe",
          "description": "Read pdf documents",
          "compressedb64Icon": "..."
          "commandLineParams": "doc.pdf"
        },
        ...
      ],
      "id": "c2bc6a4c-a807-46dc-847a-4fcb4c971953",
      "name": "daas",
      "sessionSupport": "SingleSession",
      "state": "Ready",
      "osName": "Microsoft Windows 10 Pro",
      "osVersion": "10.0.17763",
      "isServerOs": false,
      "vdaVersion": "1811.1.0.20099",
      "status": "",
      "transactionId": "7cc221ad-51e0-4cce-9fe7-c47b38e5fbb2",
      "subscriptionName": "xxx@citrix.com",
      "resourceGroup": "Citrix-ImageBuilder",
      "storageAccount": "ctximagesf6hn2b0kjv9p1",
      "region": "eastus",
      "citrixPrepared": false,
      "isDeprecated": false,
      "linkedCatalogs": 1,
      "linkedCatalogsNames": [
        "Finance Catalog"
      ]
    }

### Interpreting the request URL

### **imageId**

The `imageId` should be replaced with the actual image ID of the master
image. You must have obtained the `imageId` as response when invoking
APIs listed in [how to add an image](./how-to-add-a-master-image)
 or [how to get details of all images](./how-to-get-all-master-images) sections.

### Interpreting the response

| Property name | Description |
| --- | --- |
| catalogs | The list of catalogs using this master image. |
| applications | The list of start menu applications on the master image. *id* - The ID of the application. Use this ID when publishing an application. *name* - The name of the application on the master image. Use this name when publishing an application. *applicationPath* - The application path on the master image. Use this path when publishing an application. *workingDirectory* - By default, this path is the same as the path in the ApplicationPath field. To run the application from a different directory, add an absolute path to this field. *description* - This is the description that shows in your user's workspace. *compressedb64Icon* - The compressed application icon in Base64 format. This icon is for display purpose only. Do not use this when publishing an application. *commandLineParams* - The command line parameters for the app at startup.
| id | The ID of the master image.|
| name | The friendly name if the master image. |
| sessionSupport | Type of sessions that are supported by the OS of the master image. |
| state | The current state of the master image. A state of *Ready* indicates that the image is good and ready to be used by a catalog. |
| osName | Name of master image OS.|
| osVersion | Version of master image OS.|
| isServerOs | Indicates if the image is using a server based OS.|
| vdaVersion | Version of the master image Virtual Desktop Agent. Only applicable to image builder.|
| status | If the image is not in *Ready* state, this will give a friendly message describing the current state of the image. |
| transactionId | Provide this transactionId to Citrix Support if you need help with this image. |
| subscriptionName | Name of the Subscription that image VMs are deployed. Only applicable to image builder. |
| resourceGroup | The resource group that image VMs are deployed. Only applicable to image builder. |
| storageAccount | The storage account where the master image is stored. |
| region | Azure region where image VMs are deployed. Only applicable to image builder.|
| citrixPrepared | Indicates if this is a Citrix provided image. This will be false for all images added by the customer. |
| isDeprecated | Indicates if this is a Citrix prepared deprecated image. This will be false for all images added by the customer. |
| linkedCatalogs | The number of catalogs using this image. This will be 0 for an image that has just been added and has never been used by a catalog. |
| linkedCatalogsNames | List of catalogs that are using this image.|

## Get details of an image in Azure account using PowerShell

Learn from the following example to get details of an image that was added to your Azure account using any PowerShell code.

``` powershell
function GetMasterImage {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken,
    [Parameter(Mandatory=$true)]
    [string] $imageId
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/images/{2}", $customerId, $siteId, $imageId)
  $headers = @{"Accept"="application/json";
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method GET -Headers $headers
  return $response
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$imageId = "56f1cbf3-1cc6-40cd-9c82-c95633ba88bb" #Replace with your master image ID
$response = GetMasterImage $customerId $siteId $bearerToken $imageId
```

## Get details of an image in Azure account using C\# code

Learn from the following example to get details of an image that was added to your Azure account using C\# code.

``` csharp
public static async Task<string> GetMasterImage(
    string customerId,
    string siteId,
    string bearerToken,
    string imageId)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/images/{2}", customerId, siteId, imageId);
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
