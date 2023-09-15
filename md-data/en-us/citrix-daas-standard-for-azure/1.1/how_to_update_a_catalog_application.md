# How to update a catalog application in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to update application details for a catalog in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to update a catalog application in Azure account

To update details of an existing application for a catalog in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you do not have the `catalogId`, see [how to get details of all catalogs](./how-to-get-details-of-all-catalogs) to get the details of all your Citrix DaaS Standard for Azure catalogs.
-  If you do not have the AppId of the application to update, see [how to get details of all catalog applications](./how-to-get-details-of-all-catalog-applications) to get the details of all your Citrix DaaS Standard for Azure catalog applications.
-  Use the API listed below to update application details from a Citrix DaaS Standard for Azure catalog.

## Update a catalog application in Azure account using any REST API tool

Learn from the following example on how to update details of an existing application for a catalog in your Azure account using any REST API tool.

### Request

    PUT https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/{catalogId}/apps/{appId} HTTP/1.1
    Accept: application/json
    Content-Type: application/json; charset=utf-8
    Authorization: CwsAuth bearer=<token-from-prerequisites>
    
    {
      "name": "Google Chrome",
      "applicationPath": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "commandLineParameters": "https://developer.cloud.com",
      "workingDirectory": "%ProgramFiles(x86)%\\Google",
      "description": "Browse the Internet",
      "base64Icon": "AAABAAcAAAAAAAEAIABnYQAAdgAAADAwAAABAAgAqA4AAN1hAAAwMAAAAQA..."
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
| name | [Required] The new name of the application. Set this to the original name if you do not wish to modify it.|
| applicationPath | [Required] The new full path of the application executable on the master image. Set this to the original name if you do not wish to modify it. |
| commandLineParameters | [Optional] The new command line parameters for the app at startup. If this property is not specified, the original value will remain intact. |
| workingDirectory | [Optional] By default, this path is the same as the path in the ApplicationPath field. To run the application from a different directory, add an
absolute path to this field.|
| description | This is the description that shows in your user's workspace. |
| base64Icon | [Optional] The new base64 icon for the application. If this property is not specified, the original value will remain intact.|

### Interpreting the response

The response, in case of success, will have status code "204" without
response body.

## Update a catalog application in Azure account using PowerShell

Learn from the following example on how to update details of an existing application for a catalog in your Azure account using PowerShell code.

``` powershell
function UpdateCatalogApplication {
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
    [string] $appId,
    [Parameter(Mandatory=$true)]
    [string] $jsonBody
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/apps/{3}", $customerId, $siteId, $catalogId, $appId)
  $headers = @{"Accept"="application/json";
               "Content-Type"="application/json; charset=utf-8"
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method PUT -Headers $headers -Body $jsonBody
  return $response
}

$body = @{
  "name" = "Google Chrome";
  "applicationPath" = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
  "commandLineParameters" = "https://developer.cloud.com";
  "workingDirectory" = "%ProgramFiles(x86)%\Google";
  "description"= "Browse the Internet";
  "base64Icon"= "AAABAAcAAAAAAAEAIABnYQAAdgAAADAwAAABAAgAqA4AAN1hAAAwMAAA..."
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$catalogId = "56f1cbf3-1cc6-40cd-9c82-c95633ba88bb" #Replace with your catalog ID
$appId = "f17bbe18-83a9-461c-a890-9c424596f0f3" #Replace with your application ID
$response = UpdateCatalogApplication $customerId $siteId $bearerToken $catalogId $appId (ConvertTo-Json $body)
```

## Update a catalog application in Azure account using C\# code

Learn from the following example on how to update details of an existing application for a catalog in your Azure account using C\# code.

``` csharp
public class UpdateApplicationConfigurationModel
{
  /// <summary>
  /// Display name of application
  /// </summary>
  [Required]
  public string Name { get; set; }

  /// <summary>
  /// Path of the application on the master image
  /// </summary>
  [Required]
  public string ApplicationPath { get; set; }

  /// <summary>
  /// Working directory of the application at launch
  /// </summary>
  public string WorkingDirectory { get; set; }

  /// <summary>
  /// This is the description that shows in your user's workspace.
  /// </summary>
  [StringLength(512)]
  public string Description { get; set; }

  /// <summary>
  /// Command line parameters to pass to the application when launching
  /// </summary>
  public string CommandLineParams { get; set; }

  /// <summary>
  /// The raw application icon represented as a base64 string
  /// </summary>
  public string Base64Icon { get; set; }
}

public static async Task<string> UpdateCatalogApplication(
    string customerId,
    string siteId,
    string bearerToken,
    string catalogId,
    string appId,
    UpdateApplicationConfigurationModel model)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/apps/{3}", customerId, siteId, catalogId, appId);
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
