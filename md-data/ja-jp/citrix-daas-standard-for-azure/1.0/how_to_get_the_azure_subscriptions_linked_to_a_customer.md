# How to get details of all Azure subscriptions linked to your account using Citrix DaaS Standard for Azure

Use REST APIs to get details of all Azure subscriptions that are linked to your account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supporta invoking the REST API

## Steps to get details of all Azure subscriptions

To get details of all Azure subscriptions that are linked to your Azure account use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  Use the API in this document to get all Azure subscriptions that are linked to a customer's account.

## Get details of all Azure subscriptions linked to your account using any REST API tool

Learn from the following example on how to get details of all Azure subscriptions that are linked to your account using any REST API tool.

### Request

    GET https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/subscriptions HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 200 OK
    Content-Length: 1926
    Content-Type: application/json; charset=utf-8
    Date: Thu, 12 Aug 2021 21:01:06 GMT

    {
      "items": [
        {
          "linkedImages": 0,
          "linkedCatalogs": 1,
          "linkedAdvancedCatalogs": 0,
          "linkedCatalogsIds": [
            "9e7dd02a-668b-4152-bc94-46dac37ad3ec"
          ],
          "linkedImagesIds": [],
          "catalogVMs": 1,
          "subscriptionId": "bf8c1be6-...",
          "name": "Citrix Managed",
          "isLinked": true,
          "isValid": true,
          "citrixManaged": true,
          "disabled": false
        },
        {
          "linkedImages": 0,
          "linkedCatalogs": 1,
          "linkedAdvancedCatalogs": 0,
          "linkedCatalogsIds": [
            "68cbc78b-2fb8-4d3f-a0be-e20e233ea9d6"
          ],
          "linkedImagesIds": [],
          "catalogVMs": 1,
          "subscriptionId": "615b632a-...",
          "name": "...@citrix.com",
          "isLinked": true,
          "isValid": true,
          "citrixManaged": false,
          "disabled": false
        }
      ],
      "subscriptions": [
        {
          "linkedImages": 0,
          "linkedCatalogs": 1,
          "linkedAdvancedCatalogs": 0,
          "linkedCatalogsIds": [
            "9e7dd02a-668b-4152-bc94-46dac37ad3ec"
          ],
          "linkedImagesIds": [],
          "catalogVMs": 1,
          "subscriptionId": "bf8c1be6-...",
          "name": "Citrix Managed",
          "isLinked": true,
          "isValid": true,
          "citrixManaged": true,
          "disabled": false
        },
        {
          "linkedImages": 0,
          "linkedCatalogs": 1,
          "linkedAdvancedCatalogs": 0,
          "linkedCatalogsIds": [
            "68cbc78b-2fb8-4d3f-a0be-e20e233ea9d6"
          ],
          "linkedImagesIds": [],
          "catalogVMs": 1,
          "subscriptionId": "615b632a-...",
          "name": "...@citrix.com",
          "isLinked": true,
          "isValid": true,
          "citrixManaged": false,
          "disabled": false
        }
      ],
      "maxCitrixManagedSubscriptions": 1
    }

### Interpreting the response

The response is a JSON file with a list of all the Azure subscriptions that are linked to
a given customer.

| Propert name | Description |
| --- | --- |
| linkedImages | Number of images linked to the subscription |
| linkedCatalogs | Number of catalogs linked to the subscription |
| linkedAdvancedCatalogs | Number of advanced catalogs linked to the subscription |
| linkedCatalogsIds | The IDs of catalogs linked to the subscription |
| linkedImagesIds | The IDs of images linked to the subscription |
| catalogVMs | Number of virtual machines of the catalogs |
| subscriptionId | The Azure subscription ID |
| name | Name of the Azure subscription |
| isLinked | This field identifies whether the subscription is linked with the customer and site provided |
| isValid | This field identifies whether the subscription is valid for the customer and site provided |
| citrixManaged | This field identifies whether the subscription is managed by Citrix|
| disabled | This field identifies whether the subscription is disabled |

## Get details of all Azure subscriptions linked to your account using PowerShell

Learn from the following example on how to get details of all Azure subscriptions that are linked to your account using PowerShell code.

``` powershell
function GetAzureSubscriptions {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/subscriptions", $customerId, $siteId)
  $headers = @{"Accept"="application/json";
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method GET -Headers $headers
  return $response
}

$customerId = "customer1" #Replace with your customerId
$siteId = "15ae64f2-..." #Replace with your site ID
$bearerToken = "eyJ.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$response = GetAzureSubscriptions $customerId $siteId $bearerToken
```

## Get details of all Azure subscriptions linked to your account using C\# code

Learn from the following example on how to get details of all Azure subscriptions that are linked to your account using C\# code.

``` csharp
public static async Task<string> GetAzureSubscriptions (
    string customerId,
    string siteId,
    string bearerToken)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/subscriptions", customerId, siteId);
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
