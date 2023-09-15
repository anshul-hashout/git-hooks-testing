# How to get a site ID from Citrix DaaS Standard for Azure

Use REST APIs to get a site ID assigned to your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

>**Note:**
>
> Currently only one site is assigned to your Azure account.

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to get a site ID assigned to your Azure account

To get a site ID assigned to your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Invoke the API in this document to get the sites.

## Get a site ID assigned to your Azure account using any REST API tool

Learn from the following example to get a site ID assigned to your Azure account using any REST API tool.

### Request

    GET https://api-us.cloud.com/catalogservice/{customerId}/sites HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Authorization: CwsAuth bearer=<token-from-prerequisites>

### Response

    HTTP/1.1 200 OK
    citrix-transactionid: 522e06cf-974e-4a7a-bd26-06faa010288f
    content-Length: 132
    content-Type: application/json; charset=utf-8
    date: Fri, 18 Aug 2017 14:52:44 GMT
    
    {
      "items": [
        {
          "id": "61603f15-cdf9-4c7f-99ff-91636601a795",
          "displayName": "XenApp Essentials"
        }
      ]
    }

### Interpreting the response

The response is a JSON with a list of all your sites. Currently all
customers have only one site.

| Property name | Description |
| --- | --- |
| id | The site ID. This is the ID that needs to be passed in all the requests URLs.|
| displayName | The display name of the site. |

## Get a site ID assigned to your Azure account using PowerShell

Learn from the following example to get a site ID assigned to your Azure account using any PowerShell code.

``` powershell
function GetSites {
  param (
    [Parameter(Mandatory=$true)]
    [string] $customerId,
    [Parameter(Mandatory=$true)]
    [string] $bearerToken
  )
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/sites", $customerId)
  $headers = @{"Accept"="application/json";
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method GET -Headers $headers
  return $response
}

$customerId = "customer1" #Replace with your customerId
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$response = GetSites $customerId $bearerToken
```

## Get a site ID assigned to your Azure account using C\# code

Learn from the following example to get a site ID assigned to your Azure account using C\# code.

``` csharp
public static async Task<string> GetSites(
    string customerId,
    string bearerToken)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/sites", customerId);
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
