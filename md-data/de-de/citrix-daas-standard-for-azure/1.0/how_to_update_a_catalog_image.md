# How to update a catalog image in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to update an existing catalog image with a new image in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to update a catalog image in Azure accont

To update a catalog image with a new image in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you do not have the `catalogId`, see [how to get details of all catalogs](./how-to-get-details-of-all-catalogs) to get the details of all your Citrix DaaS Standard for Azure catalogs.
-  The Citrix DaaS Standard for Azure catalog must be in `InputRequired` or `Active` state.
-  If you do not have the `imageId`, see [how to get details of all images](./how-to-get-details-of-all-images) to get the image ID of all your posted images.
-  Use the API in this document to update the Citrix DaaS Standard for Azure catalog with a new master image. This is an asynchronous API, so the `async` query parameter is required to be true.
-  Check steps listed in [how to get catalog information](./how-to-get-catalog-information) or use the URL in "location" response header to monitor the update status of your Managed Desktops catalogs.
-  A state of `Processing` indicates that the Citrix DaaS Standard for Azure catalog is still being updated. Keep monitoring the state.
-  A state of `InputRequired` or `Active` indicates that the image update has completed.

## Update a catalog image in Azure account using any REST API tool

Learn from the following example to update a catalog image with a new image in your Azure account using any REST API tool.

### Request

    POST https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/{catalogId}/$updateImage?async=true HTTP/1.1
    Accept: application/json
    Content-Type: application/json; charset=utf-8
    Authorization: CwsAuth bearer=<token-from-prerequisites>
    
    {
      "TemplateId": "7388dbc7-6b69-40a0-a4c9-18efd3b7afe3",
      "CitrixPrepared": false,
      "VdaUpdateDelay": 60
    }

### Response

    HTTP/1.1 202 Accepted
    citrix-transactionId: b170d4cb-0644-47fc-a6be-8b55fbd0afec
    location: https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/cd2efc54-6918-4bf8-b469-18b62cd73bc2/updateStatus
    content-Length: 38
    content-Type: application/json; charset=utf-8
    date: Thu, 03 Aug 2017 20:56:36 GMT
    
    "cd2efc54-6918-4bf8-b469-18b62cd73bc2"

### Interpreting the request URL

### **catalogId**

The `catalogId` should be replaced with the actual ID of the Managed Desktops
catalog. You can get the `catalogId` by calling the [how to get details of all catalogs](./how-to-get-details-of-all-catalogs)  API.

### Interpreting the request

| Property name | Description |
| --- | --- |
|TemplateId |The ID of the master image you want to update the catalog with. See [how to get details of all images](./how-to-get-details-of-all-images) to get the image ID of all your posted images.
| CitrixPrepared | This should be set to false for a customer provided image. This should be set to true if you are updating the catalog with a Citrix Prepared image. |
| VdaUpdateDelay | This is the time in minutes after which active sessions are automatically logged off. |

### Interpreting the response

The response is a GUID string that represents the `catalogId` of the
Managed Desktops catalog that was just updated. You will need this `catalogId` to
query the details of the catalog.

## Update a catalog image in Azure account using PowerShell

Learn from the following example to update a catalog image with a new image in your Azure account using PowerShell code.

``` powershell
function UpdateCatalogImage {
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
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/$updateImage?async=true", $customerId, $siteId, $catalogId)
  $headers = @{"Accept"="application/json";
               "Content-Type"="application/json"
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method POST -Headers $headers -Body $jsonBody
  return $response
}

$body = @{
  "TemplateId" = "7388dbc7-6b69-40a0-a4c9-18efd3b7afe3";
  "CitrixPrepared" = $false;
  "VdaUpdateDelay" = "60"
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$catalogId = "56f1cbf3-1cc6-40cd-9c82-c95633ba88bb" #Replace with your catalog ID
$response = UpdateCatalogImage $customerId $siteId $bearerToken $catalogId (ConvertTo-Json $body)
```

## Update a catalog image in Azure account using C\# code

Learn from the following example to update a catalog image with a new image in your Azure account using C\# code.

``` csharp
public class UpdateCatalogTemplateImageModel
{
    /// <summary>
    /// ID of the master image to update the catalog with
    /// </summary>
    [Required]
    public string TemplateId { get; set; }

    /// <summary>
    /// Whether the image was prepared by Citrix, or provided by the customer
    /// </summary>
    public bool CitrixPrepared { get; set; } = false; // default to false if not specified

    /// <summary>
    /// Number of minutes to delay updating the VDAs
    /// </summary>
    public int VdaUpdateDelay { get; set; } = 0;
}

public static async Task<string> UpdateCatalogImage(
    string customerId,
    string siteId,
    string bearerToken,
    string catalogId,
    UpdateCatalogTemplateImageModel model)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/$updateImage?async=true", customerId, siteId, catalogId);
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

See [how to get catalog information](./how-to-get-catalog-information) to monitor the
update status of your Managed Desktops catalogs.
