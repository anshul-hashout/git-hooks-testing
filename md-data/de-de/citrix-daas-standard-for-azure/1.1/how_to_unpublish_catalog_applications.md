# How to unpublish applications from a catalog in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to unpublish applications from a catalog in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to unpublish applications from a catalog in Azure account

To unpublish applications from a catalog in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you do not have the `catalogId`, see [how to get details of all catalogs](./how-to-get-details-of-all-catalogs) to get the details of all your Citrix DaaS Standard for Azure catalogs.
-  If you do not have the AppId of the application to un-publish, see [how to get details of all catalog applications](./how-to-get-all-managed-desktops-catalog-applications) to get the details of all your Citrix DaaS Standard for Azure catalog applications.
-  Use the API listed below to un-publish application from a Citrix DaaS Standard for Azure catalog.

## Unpublish applications from a catalog in Azure account using any REST API tool

Learn from the following example on how to unpublish an existing application from a catalog in your Azure account using any REST API tool.

### Request

    DELETE https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/{catalogId}/apps/{appId} HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 204 NoContent
    citrix-transactionid: c2bc6a4c-a807-46dc-847a-4fcb4c971953
    content-Length: 0
    content-Type: application/json; charset=utf-8
    date: "Tue, 03 Oct 2017 22:15:10 GMT"

### Interpreting the request URL

#### appId

`appId` should be replaced with the actual app ID of the application you
want to unpublish. See [how to get details of all catalog applications](./how-to-get-all-managed-desktops-catalog-applications) API to obtain
the `appId` for all your published apps.

### Interpreting the response

The response, in case of success, will have status code "204" without
response body.

## Unpublish applications from a catalog in Azure account using PowerShell

Learn from the following example on how to unpublish an existing application from a catalog in your Azure account using PowerShell code.

``` powershell
function UnPublishCatalogApplication {
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
    [string] $appId
  )

  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/apps/{3}", $customerId, $siteId, $catalogId, $appId)
  $headers = @{"Accept"="application/json";
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method DELETE -Headers $headers
  return $response
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$catalogId = "56f1cbf3-1cc6-40cd-9c82-c95633ba88bb" #Replace with your catalog ID
$appId = "50af6370-fff1-4fc9-b082-a33761fd2f20" #Replace with your app id
$response = UnPublishCatalogApplications $customerId $siteId $bearerToken $catalogId $appId
```

## Unpublish applications from a catalog in Azure account using C\# code

Learn from the following example on how to unpublish an existing application from a catalog in your Azure account using C\# code.

``` csharp
public static async Task<string> UnPublishCatalogApplication(
    string customerId,
    string siteId,
    string bearerToken,
    string catalogId,
    string appId)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/apps/{3}", customerId, siteId, catalogId, appId);
    using (var client = new HttpClient())
    {
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
        client.DefaultRequestHeaders.Authorization =
                   new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);

        var response = await client.DeleteAsync(requestUri);

        if (response != null)
        {
            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

        return null;
    }
}
```
