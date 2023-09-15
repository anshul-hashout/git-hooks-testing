# How to get details of all published applications for a catalog in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to get details of all applications published for a catalog in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to get details of all published applications for a catalog in Azure account

To get details of all applications published for a catalog in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you do not have the `catalogId`, see [how to get details of all catalogs](./how-to-get-details-of-all-catalogs) to get the details of all your Citrix DaaS Standard for Azure catalogs.
-  Use the API in this document to get details of all applications for a Citrix DaaS Standard for Azure catalog.

## Get details of all published applications for a catalog in Azure account using any REST API tool

Learn from the following example to get details of all applications published for a catalog in your Azure account using any REST API tool.

### Request

    GET https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/{catalogId}/apps HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 200 OK
    citrix-transactionid: 80699539-ae66-4eb7-ae67-370606d12766
    content-Length: 6676
    content-Type: application/json; charset=utf-8
    date: "Tue, 26 September 2017 19:20:13 GMT"
    
    {
      "items": [
        {
          "state": "Published",
          "id": "522e06cf-974e-4a7a-bd26-06faa010288f",
          "name": "Calculator",
          "applicationPath": "C:\\Windows\\system32\\calc.exe",
          "workingDirectory": "%windir%\\system32",
          "description": "Calculator application",
          "compressedb64Icon": "iVBORw0KGgoAAA..."
        },
        {
          "state": "Published",
          "id": "73352308-ea31-41dc-ab95-9fa524e67fed",
          "name": "Command Prompt",
          "applicationPath": "C:\\Windows\\system32\\cmd.exe",
          "description": "Command prompt application",
          "compressedb64Icon": "iVBORw0KGgoAAA..."
          "commandLineParams": "start notepad"
        }
      ],
    }

### Interpreting the response

The response is a JSON with a list of all your published applications
for the catalog.

| Property name | Description |
| --- | --- |
| state | Publish state of the application. This is always set to *Published* |.
| id | The ID of the application. This is the ID to pass to any API that accepts an appId. |
| name | The name of the application. This name matches the start menu discovered applications on a master image. |
| applicationPath | The path of the application executable on the master image. |
| workingDirectory | By default, this path is the same as the path in the ApplicationPath field. To run the application from a different directory, add an
absolute path to this field.|
| description | This is the description that shows in your user's workspace.|
| compressedb64Icon | The compressed application icon in Base64 format. This is for
displaying the icon in the UI.|
| commandLineParams | The command line parameters for the app at startup.|

## Get details of all published applications for a catalog in Azure account using PowerShell

Learn from the following example to get details of all applications published for a catalog in your Azure account using PowerShell code.

``` powershell
function GetCatalogApplications {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $catalogId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/apps", $customerId, $siteId, $catalogId)
  $headers = @{"Accept"="application/json";
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method GET -Headers $headers
  return $response
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$catalogId = "8d352ba7-1917-41c3-95e5-50f436be8968" #Replace with your catalog ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$response = GetCatalogApplications $customerId $siteId $catalogId $bearerToken
```

## Get details of all published applications for a catalog in Azure account using using C\# code

Learn from the following example to get details of all applications published for a catalog in your Azure account using C\# code.

``` csharp
public static async Task<string> GetCatalogApplications(
    string customerId,
    string siteId,
    string catalogId,
    string bearerToken)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/apps", customerId, siteId, catalogId);
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
