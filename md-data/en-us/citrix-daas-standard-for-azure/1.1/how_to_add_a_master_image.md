# How to add an image to Azure account using Citrix DaaS Standard for Azure

Use REST APIs to add an image to your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure). You can use this image as a template to create a catalog of machines that deliver desktops and apps to customer accounts.

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to add an image to your Azure account

To add an image to your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  Use the API listed below to add an image. This is an asynchronous API, so the `async` query parameter is required to be true.
-  Check the verification status of the image using the steps detailed in [how to get an image](./how-to-get-an-image) or the URL in the "Location" response header.
-  A state of `Enumerating` indicates that the image processing has begun. Keep monitoring until the status changes to either `Ready` or `Failed`.
-  A state of `Ready` indicates that the image has been added successfully. No further action is required.
-  A state of `Failed` indicates that adding the image has failed. Correct the error shown in the `Status` property.
-  Delete the image using [how to delete an image](./how-to-delete-an-image).
-  Add the image again.

## Add an image to Azure account using any REST API tool

Learn from the following example to add an image to your Azure account using any REST API tool.

### Request

    POST https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/images/$import?async=true HTTP/1.1
    Accept: application/json
    Content-Type: application/json; charset=utf-8
    Authorization: CwsAuth bearer=<token-from-prerequisites>
    
    {
      "name": "Finance Image",
      "vhdUrl": "https://xaensfa5edge1gu4o1.blob.core.windows.net/vhds/XAEnsfa5-Findisk0.vhd",
      "cspCustomerId": "k8dfjm...",
      "cspSiteId": "bd9cb14f-efb7-..."
    }

### Response

    HTTP/1.1 202 Accepted
    citrix-transactionid: 80699539-ae66-4eb7-ae67-370606d12766
    location: https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/images/55cab14f-efb7-4bd6-bd9c-ebe991c9d165/importStatus
    content-Length: 38
    content-Type: application/json; charset=utf-8
    date: Wed, 02 Aug 2017 15:05:23 GMT
    
    "55cab14f-efb7-4bd6-bd9c-ebe991c9d165"

### Interpreting the request

| Property name | Description |
| --- | --- |
| name | [Required] The friendly name you want to assign to the image.|
| vhdUrl | [Required] The VHD URL of the image.|
| cspCustomerId | [Optional] tenant customer ID if partner-tenant relationship exists otherwise not null.|
| cspSiteId | [Optional] tenant customer site ID if partner-tenant relationship exists otherwise not null.|

### Interpreting the response

The response is a GUID string that represents the `imageId`. You will
need this `imageId` to query the status of the image.

## Add an image to Azure account using PowerShell

Learn from the following example to add a new image to your Azure account using any PowerShell code.

``` powershell
function AddMasterImage {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $siteId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken,
    [Parameter(Mandatory=$true)]
    [string] $jsonBody
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/images/$import?async=true", $customerId, $siteId)
  $headers = @{"Accept"="application/json";
               "Content-Type"="application/json; charset=utf-8"
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method POST -Headers $headers -Body $jsonBody
  return $response
}

$body = @{
  "Name" = "Finance Image";
  "VhdUrl" = "https://xaensfa5edge1gu4o1.blob.core.windows.net/vhds/XAEnsfa5-Findisk0.vhd"
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$response = AddMasterImage $customerId $siteId $bearerToken (ConvertTo-Json $body)
```

## Add an image to Azure account using C\# code

Learn from the following example to add a new image to your Azure account using C\# code.

``` csharp
public class ImportTemplateImageModel
{
    /// <summary>
    /// Name of the image
    /// </summary>
    [Required]
    public string Name { get; set; }

    /// <summary>
    /// URI of the VHD file that will be imported
    /// </summary>
    [Required]
    public Uri VhdUri { get; set; }

    /// <summary>
    /// Name of tenant customer ID if partner-tenant relationship exists otherwise not null
    /// </summary>
    public string CSPCustomerId { get; set; } = null;

    /// <summary>
    /// Name of tenant customer ID if partner-tenant relationship exists otherwise not null
    /// </summary>
    public string CSPSiteId { get; set; } = null;
}
```

``` csharp
public static async Task<string> AddMasterImage(
    string customerId,
    string siteId,
    string bearerToken,
    AddMasterImageModel model)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/images/$import", customerId, siteId);
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

See [how to get an image](./how-to-get-an-image) to monitor the image status once it has been added.

See [how to get details of all images](./how-to-get-details-of-all-images) to
get the image ID of all your posted images.
