# How to publish desktops to a catalog in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to publish desktops to a catalog in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to publish desktops to a catalog in Azure account

To publish desktops to a catalog in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  The catalog must be in `InputRequired` or `Active` state.
-  If you do not have the `catalogId`, see [how to get details of all catalogs](./how-to-get-details-of-all-catalogs) to get details of all Citrix DaaS Standard for Azure catalogs.
-  Use the API listed below to publish desktop to a Citrix DaaS Standard for Azure catalog. This API is only applicable to `MultiSession` Citrix DaaS Standard for Azure catalogs.

## Publish desktops to a catalog in Azure account using any REST API tool

Learn from the following example on how to publish desktops to a catalog in your Azure account using any REST API tool.

### Request

    POST https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/{catalogId}/apps HTTP/1.1
    Accept: application/json
    Content-Type: application/json; charset=utf-8
    Authorization: CwsAuth bearer=<token-from-prerequisites>
    
    {
      "desktops": [
        {
          "name": "Finance-desktop",
          "description": "Virtual Desktop for Finance department",
          "includedUsers": [
                {
                    "directoryContext": "",
                    "fullName": "John Doe",
                    "homeZoneName": "",
                    "homeZoneUid": "",
                    "identityClaims": "",
                    "name": "John",
                    "primaryClaim": "",
                    "sid": "",
                    "upn": ""
                }
            ]
        }
      ]
    }

### Response

    HTTP/1.1 200 OK
    citrix-transactionid: 80699539-ae66-4eb7-ae67-370606d12766
    content-Length: 13455
    content-Type: application/json; charset=utf-8
    date: "Fri, 29 September 2017 20:21:09 GMT"
    
    {
      "desktops": [
        {
          "state": "Published",
          "id": "ec08dd4e-67d2-40ad-918f-2e3763a6dad9",
          "name": "zltestdesktop22"
        }
      ]
    }

### Interpreting the request

The request is a JSON with a list of all the desktops that were successfully published as part of this request.

### Interpreting the response

The request is a JSON with a list of all the start menu (Publish from
start menu) and custom (Publish by path) applications that you want to
publish to the catalog.

| Property name | Description |
| --- | --- |
| name | The name of the desktop.|
| description | This is the description that shows in the catalog details.|
| includedUsers | [Ignore] Internal use only.|

## Publish desktops to a catalog in Azure account using PowerShell

Learn from the following example on how to publish desktops to a catalog in your Azure account using PowerShell code.

``` powershell
function PublishCatalogDesktops {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $catalogId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken,
    [Parameter(Mandatory=$true)]
    [string] $jsonBody
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/desktops", $customerId, $siteId, $catalogId)
  $headers = @{"Accept"="application/json";
               "Content-Type"="application/json; charset=utf-8"
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method POST -Headers $headers -Body $jsonBody
  return $response
}

$body =   @{
  "desktops" = @(
    @{
      "name"= "Finance-desktop";
      "description"= "Virtual Desktop for Finance department";
    }
  )
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$catalogId = "8d352ba7-1917-41c3-95e5-50f436be8968" #Replace with your catalog ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$response = PublishCatalogDesktops $customerId $siteId $catalogId $bearerToken (ConvertTo-Json $body)
```

## Publish desktops to a catalog in Azure account using C\# code

Learn from the following example on how to publish desktops to a catalog in your Azure account using C\# code.

``` csharp
public class AddCatalogDesktopsModel
{
    /// <summary>
    /// Desktops to be added
    /// </summary>
    [Required]
    public IEnumerable<AddCatalogDesktopModel> Desktops { get; set; }
}

public class AddCatalogDesktopModel
  {
      /// <summary>
      /// Name of the desktop
      /// </summary>
      [Required]
      [IllegalChars(CatalogCommonConstants.BrokerObjIllegalCharsString)]
      public string Name { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringLength(512)]
      public string Description { get; set; }
  }
```

``` csharp
public static async Task<string> PublishCatalogDesktops(
    string customerId,
    string siteId,
    string catalogId,
    string bearerToken,
    AddCatalogDesktopModel model)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/desktops", customerId, siteId, catalogId);
    using (var client = new HttpClient())
    {
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
        client.DefaultRequestHeaders.Authorization =
                   new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);

        var jsonBody = JsonConvert.SerializeObject(model, new JsonSerializerSettings
        {
            Converters = new JsonConverter[] { new StringEnumConverter() }
        });

        var response = await client.PostAsync(requestUri, new StringContent(jsonBody, Encoding.UTF8, "application/json"));

        if (response != null)
        {
            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

        return null;
    }
}
```
