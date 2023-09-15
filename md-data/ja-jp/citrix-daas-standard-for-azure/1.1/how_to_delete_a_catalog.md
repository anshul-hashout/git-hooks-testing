# How to delete catalog from Azure account using Citrix DaaS Standard for Azure

Use REST APIs to delete a catalog from your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to delete catalog from Azure account

To delete an existing catalog from your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you do not have the `catalogId`, see [how to get details of all catalogs](./how-to-get-details-of-all-catalogs) to get the catalog ID of all your Citrix DaaS Standard for Azure catalogs available in your account.
-  Use the API in this document to delete the Citrix DaaS Standard for Azure catalog.

## Delete a catalog from Azure account using any REST API tool

Learn from the following example on how to delete an existing catalog from your Azure account using any REST API tool.

### Request

    DELETE https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/{catalogId} HTTP/1.1
    Accept: application/json
    Content-Type: application/json; charset=utf-8
    Authorization: CwsAuth bearer=<token-from-prerequisites>
    
    {
      "serviceAccount": "admin",
      "serviceAccountPassword": "password",
      "forceDelete": false,
      "deleteResourceLocationIfUnused": false
    }

### Response

    HTTP/1.1 204 NoContent
    citrix-transactionid: 80699539-ae66-4eb7-ae67-370606d12766
    content-Length: 0
    content-Type: application/json; charset=utf-8
    date: Fri, 04 Aug 2017 13:43:31 GMT

### Interpreting the request

| Property name | Description |
| --- | --- |
| serviceAccount | [Required] Service account to perform delete with. Only required for Non-Domain joined catalogs. |
| serviceAccountPassword | [Required] The domain service account password. Only required for Non-Domain joined catalogs. |
| forceDelete | [Required] Defaults to false. Indicates that we want to bypass processing checks on deploy and force delete the catalog. |
| deleteResourceLocationIfUnused | [Required] Defaults to false. Indicates if the Resource Location associated with the catalog should be removed (along with any Catalog Service deployed connectors) if this is the last catalog to use the Resource Location. |

### Interpreting the response

The response, in case of success, will have status code "204" without response body.

## Delete a catalog from Azure account using PowerShell

Learn from the following example on how to delete an existing catalog from your Azure account using PowerShell code.

``` powershell
function DeleteCatalog {
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
    [string] $jsonBody
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}", $customerId, $siteId, $catalogId)
  $headers = @{"Accept"="application/json";
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method DELETE -Headers $headers -Body $jsonBody
  return $response
}

$body = @{
    "serviceAccount" = "admin";
    "serviceAccountPassword" = "password";
    "forceDelete" = $false;
    "deleteResourceLocationIfUnused" = $false;
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$catalogId = "56f1cbf3-1cc6-40cd-9c82-c95633ba88bb" #Replace with your master image ID
$response = DeleteCatalog $customerId $siteId $bearerToken $catalogId (ConvertTo-Json $body)
```

## Delete a catalog from Azure account using C\# code

Learn from the following example on how to delete an existing catalog from your Azure account using C\# code.

``` csharp
public class DeleteCatalogModel
{
    /// <summary>
    /// Service account to perform delete with
    /// </summary>
    [RegularExpression(ValidNameRegexes.WindowsUsername, ErrorMessageResourceType = typeof(CatalogCommonResources), ErrorMessageResourceName = "InvalidServiceAccountName")]
    [StringLength(104, MinimumLength = 1)]
    public string ServiceAccount { get; set; }

    /// <summary>
    /// Customer's domain password
    /// </summary>
    public string ServiceAccountPassword { get; set; }

    /// <summary>
    /// Indicates that we want to bypass processing checks on deploy and force delete the catalog
    /// </summary>
    public bool ForceDelete { get; set; };

    /// <summary>
    /// Indicates if the Resource Location associated with the catalog should be removed (along with any Catalog Service deployed connectors)
    /// if this is the last catalog to use the Resource Location
    /// </summary>
    public bool DeleteResourceLocationIfUnused { get; set; };
}

public static async Task<string> DeleteCatalog(
    string customerId,
    string siteId,
    string bearerToken,
    string catalogId,
    DeleteCatalogModel model)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}", customerId, siteId, imageId);
    using (var client = new HttpClient())
    {
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
        client.DefaultRequestHeaders.Authorization =
                   new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);

        var jsonBody = JsonConvert.SerializeObject(model, new JsonSerializerSettings
        {
            Converters = new JsonConverter[] { new StringEnumConverter() }
        });

        var response = await client.DeleteAsync(requestUri, new StringContent(jsonBody, Encoding.UTF8, "application/json"));

        if (response != null)
        {
            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

        return null;
    }
}
```

See [how to get catalog information](./how-to-get-catalog-information) to
monitor the catalog status once it has been added.

See [how to get details of all catalogs](./how-to-get-details-of-all-catalogs)
to get the catalog ID of all your Managed Desktops catalogs.
