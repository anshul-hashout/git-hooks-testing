# How to update a catalog desktop in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to update desktop details for a catalog in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to update a catalog desktop in Azure account

To update details of an existing desktop for a catalog in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you do not have the `catalogId`, see [how to get details of all catalogs](./how-to-get-details-of-all-catalogs) to get the details of all your Citrix DaaS Standard for Azure catalogs.
-  If you do not have the DesktopId of the desktop to update, see [how to get all catalog desktops](./how-to-get-all-catalog-desktops) to get the details of all your Citrix DaaS Standard for Azure catalog desktops.
-  Use the API listed below to update application details from a Managed Desktops catalog.

## Update a catalog desktop in Azure account using any REST API tool

Learn from the following example on how to update details of an existing desktop for a catalog in your Azure account using any REST API tool.

### Request

    PUT https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/{catalogId}/desktops/{desktopId} HTTP/1.1
    Accept: application/json
    Content-Type: application/json; charset=utf-8
    Authorization: CwsAuth bearer=<token-from-prerequisites>
    
    {
      "name": "Finance-desktop",
      "description": "Virtual Desktop for Finance department."
    }

### Response

    HTTP/1.1 204 NoContent
    citrix-transactionid: c2bc6a4c-a807-46dc-847a-4fcb4c971953
    content-Length: 0
    content-Type: application/json; charset=utf-8
    date: "Fri, 06 Oct 2017 14:26:08 GMT"

### Interpreting the request

| Property name | Description |
| --- | --- |
| name | [Required] The new name of the desktop. Set this to the original name if you do not wish to modify it. |
| description | This is the description that shows in your catalog details. |

### Interpreting the response

The response, in case of success, will have status code "204" without
response body.

## Update a catalog desktop in Azure account using PowerShell

Learn from the following example on how to update details of an existing desktop for a catalog in your Azure account using PowerShell code.

``` powershell
function UpdateCatalogDesktop {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken,
    [Parameter(Mandatory=$true)]
    [string] $catalogId,
    [Parameter(Mandatory=$true)]
    [string] $desktopId,
    [Parameter(Mandatory=$true)]
    [string] $jsonBody
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/desktops/{3}", $customerId, $siteId, $catalogId, $desktopId)
  $headers = @{"Accept"="application/json";
               "Content-Type"="application/json; charset=utf-8"
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method PUT -Headers $headers -Body $jsonBody
  return $response
}

$body = @{
  "name" = "Finance-desktop";
  "description"= "Virtual Desktop for Finance department.";
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$catalogId = "56f1cbf3-1cc6-40cd-9c82-c95633ba88bb" #Replace with your catalog ID
$desktopId = "f17bbe18-83a9-461c-a890-9c424596f0f3" #Replace with your desktop ID
$response = UpdateCatalogDesktop $customerId $siteId $bearerToken $catalogId $desktopId (ConvertTo-Json $body)
```

## Update a catalog desktop in Azure account using C\# code

Learn from the following example on how to update details of an existing desktop for a catalog in your Azure account using C\# code.

``` csharp
public class UpdateDesktopConfigurationModel
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

public static async Task<string> UpdateCatalogDesktop(
    string customerId,
    string siteId,
    string bearerToken,
    string catalogId,
    string appId,
    UpdateDesktopConfigurationModel model)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/desktops/{3}", customerId, siteId, catalogId, desktopId);
    using (var client = new HttpClient())
    {
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
        client.DefaultRequestHeaders.Authorization =
                   new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);

        var jsonBody = JsonConvert.SerializeObject(model, new JsonSerializerSettings
        {
            Converters = new JsonConverter[] { new StringEnumConverter() }
        });

        var response = await client.PutAsync(requestUri, new StringContent(jsonBody, Encoding.UTF8, "application/json"));

        if (response != null)
        {
            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

        return null;
    }
}
```
