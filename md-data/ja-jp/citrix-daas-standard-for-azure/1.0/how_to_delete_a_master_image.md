# How to delete an image from Azure account using Citrix DaaS Standard for Azure

Use REST APIs to delete an image that was added to your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to delete an image from Azure account

To delete an image that was added to your Azure account , use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you do not have the `imageId`, see [how to get details of all images](./how-to-get-details-of-all-images) to get the image ID of all your master images available in your account.
-  Use the API in this document to delete the master image.

## Delete an image from Azure account using any REST API tool

Learn from the following example to delete an image that was added to your Azure account  using any REST API tool.

### Request

    DELETE https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/images/{imageId} HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 204 NoContent
    citrix-transactionid: 80699539-ae66-4eb7-ae67-370606d12766
    content-Length: 0
    content-Type: application/json; charset=utf-8
    date: Fri, 04 Aug 2017 13:43:31 GMT

### Interpreting the request URL

#### imageId

The `imageId` should be replaced with the actual image ID of the master
image. You must have obtained the `imageId` as response when invoking
APIs listed in [how to add an image](./how-to-add-a-master-image)
 or [how to get details of all images](./how-to-get-all-master-images) sections.

### Interpreting the response

The response, in case of success, will have status code "204" without
response body.

## Delete an image from Azure account using PowerShell

Learn from the following example to delete an image that was added to your Azure account using any PowerShell code.

``` powershell
function DeleteMasterImage {
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

  $response = Invoke-RestMethod -Uri $requestUri -Method DELETE -Headers $headers
  return $response
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$imageId = "56f1cbf3-1cc6-40cd-9c82-c95633ba88bb" #Replace with your master image ID
$response = DeleteMasterImage $customerId $siteId $bearerToken $imageId
```

## Delete an image from your Azure account using C\# code

LLearn from the following example to delete an image that was added to your Azure account using C\# code.

``` csharp
public static async Task<string> DeleteMasterImage(
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

See [how to get an image](./how-to-get-an-image) to
monitor the image status once it has been added.

See [how to get details of all images](./how-to-get-details-of-all-images) to
get the image ID of all your posted images.
