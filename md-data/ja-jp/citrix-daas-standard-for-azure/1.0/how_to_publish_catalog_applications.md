# How to publish applications to a catalog in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to publish applications to a catalog in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to publish applications to a catalog in Azure account

To publish applications to a catalog in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  The catalog must be in `InputRequired` or `Active` state.
-  If you do not have the `catalogId`, see [how to get details of all catalogs](./how-to-get-details-of-all-catalogs) to get the details of all your Citrix DaaS Standard for Azure catalogs.
-  Use the API listed below to publish applications to Citrix DaaS Standard for Azure catalog.

## Publish applications to a catalog in Azure account using any REST API tool

Learn from the following example on how to publish applications to a catalog in your Azure account using any REST API tool.

### Request

    POST https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/{catalogId}/apps HTTP/1.1
    Accept: application/json
    Content-Type: application/json; charset=utf-8
    Authorization: CwsAuth bearer=<token-from-prerequisites>

    {
      "applications": [
        {
          "id": "d288f8ee-538e-41ae-b79e-bd562baff78b",
          "isStartMenuDiscovered": true,
          "name": "Acrobat Reader DC",
          "path": "C:\\Program Files (x86)\\Adobe\\Acrobat Reader DC\\Reader\\AcroRd32.exe",
          "workingDirectory": "%ProgramFiles(x86)%\\Adobe",
          "description": "Read pdf documents"
        },
        {
          "id": "e8b97101-5484-40da-a863-7540f2efb4ad";
          "isStartMenuDiscovered": true,
          "name": "Notepad",
          "path": "C:\\Windows\\System32\\notepad.exe",
          "description": "Notepad application",
          "commandLineParameters": "C:\\Sample.txt"
        },
        {
          "isStartMenuDiscovered": false,
          "name": "Google Chrome",
          "Path": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          "commandLineParameters": "https://www.citrix.com",
          "base64Icon": "AAABAAcAAAAAAAEAIABnYQAAdgAAADAwAAABAAgAqA4AAN1hAAAwMAAAAQA..."
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
      "applications": [
        {
          "state": "Published",
          "id": "bfca73a0-c30a-4db5-af55-b1cc02f9b0f2",
          "name": "Acrobat Reader DC",
          "applicationPath": "C:\\Program Files (x86)\\Adobe\\Acrobat Reader DC\\Reader\\AcroRd32.exe",
          "workingDirectory": "%ProgramFiles(x86)%\\Adobe",
          "description": "Read pdf documents",
          "compressedb64Icon": "iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR..."
        },
        {
          "state": "Published",
          "id": "8bc13ade-b275-4f4b-97e9-98ccd3575b03",
          "name": "Notepad",
          "applicationPath": "C:\\Windows\\System32\\notepad.exe",
          "description": "Notepad application",
          "compressedb64Icon": "iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR...",
          "commandLineParams": "C:\\Sample.txt"
        },
        {
          "state": "Published",
          "id": "49a7181a-fee2-4a6b-ac75-ff0f2d235574",
          "name": "Google Chrome",
          "applicationPath": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          "compressedb64Icon": "iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR...",
          "commandLineParams": "https://www.citrix.com"
        }
      ]
    }

### Interpreting the request

The request is a JSON with a list of all the start menu (Publish from
start menu) and custom (Publish by path) applications that you want to
publish to the catalog.

| Property name | Description |
|---| ---|
| id | The ID of the application. See [how to get an image](./how-to-get-an-image) to get the application ID for publishing start menu apps. Leave this property empty for publishing custom (Publish by path) applications.|
|isStartMenuDiscovered|True if publishing a start menu app. False if publishing an application by path.|
|name|The name of the application. See [how to get an image](./how-to-get-an-image) to get the application name. Set this to the name of you application for publishing custom (Publish by path) application.|
|path|The full path of the application executable on the master image.|
|workingDirectory|By default, this path is the same as the path in the Path field. To run the application from a different directory, add an absolute path to this field.|
|description|This is the description that shows in your user's workspace.|
|commandLineParameters|[Optional] The command line parameters for the app at startup.|
|base64Icon| [Optional] Leave this property empty when publishing a start menu application since we already have the icon. Set this to the raw application icon in base64 format when publishing an application by path. to get this icon string in the correct format. If an icon is not specified, a default icon will be used.|

### Interpreting the response

The request is a JSON with a list of all the applications that were
successfully published as part of this request.

## Publish applications to a catalog in Azure account using PowerShell

Learn from the following example on how to publish applications to a catalog in your Azure account using PowerShell code.

``` powershell
function PublishCatalogApplications {
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
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/apps", $customerId, $siteId, $catalogId)
  $headers = @{"Accept"="application/json";
               "Content-Type"="application/json; charset=utf-8"
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method POST -Headers $headers -Body $jsonBody
  return $response
}

$body =   @{
  "applications" = @(
    @{
      "id"= "d288f8ee-538e-41ae-b79e-bd562baff78b";
      "isStartMenuDiscovered" = true;
      "name"= "Acrobat Reader DC";
      "path"= "C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe";
      "description"= "Read pdf documents";
      "workingDirectory"= "%ProgramFiles(x86)%\Adobe"
    },
    @{
      "id"= "e8b97101-5484-40da-a863-7540f2efb4ad";
      "isStartMenuDiscovered" = true;
      "name"= "Notepad";
      "path"= "C:\Windows\system32\notepad.exe";
      "description"= "Notepad application";
      "commandLineParameters" = "C:\Sample.txt"
    },
    @{
      "isStartMenuDiscovered" = false;
      "name"= "Google Chrome";
      "path"= "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
      "commandLineParameters"= "https://www.citrix.com";
      "base64Icon"= "iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c..."
    }
  )
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$catalogId = "8d352ba7-1917-41c3-95e5-50f436be8968" #Replace with your catalog ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$response = PublishCatalogApplications $customerId $siteId $catalogId $bearerToken (ConvertTo-Json $body)
```

## Publish applications to a catalog in your Azure account using C\# code

Learn from the following example on how to publish applications to a catalog in your Azure account using C\# code.

``` csharp
public class AddCatalogApplicationsModel
{
  /// <summary>
  /// List of applications to be published
  /// </summary>
  [Required]
  public IEnumerable<AddCatalogApplicationModel> Applications { get; set; }
}

public class AddCatalogApplicationModel
{
  /// <summary>
  /// The application id on the master image for the catalog. If the id is not known (for a start menu application) or for adding a custom (publish by path) application, the Id should be left null
  /// </summary>
  public string Id { get; set; }

  /// <summary>
  /// Indicates if the application was discovered via scan of start menu apps or if this is a custom (publish by path) application
  /// </summary>
  public bool IsStartMenuDiscovered { get; set; } = true;

  /// <summary>
  /// Name of the application on the master image
  /// </summary>
  [Required]
  public string Name { get; set; }

  /// <summary>
  /// Path of the application on the master image
  /// </summary>
  [Required]
  public string Path { get; set; }

  /// <summary>
  /// Command line parameters to pass to the app when launching
  /// </summary>
  public string CommandLineParameters { get; set; }

  /// <summary>
  /// The raw app icon represented as a base64 string. For start menu app this field should be left blank.
  /// </summary>
  public string Base64Icon { get; set; }
}
```

``` csharp
public static async Task<string> PublishCatalogApplications(
    string customerId,
    string siteId,
    string catalogId,
    string bearerToken,
    AddCatalogApplicationsModel model)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/{2}/apps", customerId, siteId, catalogId);
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

See [how to get an image](./how-to-get-an-image) to get
all start menu applications on your catalog master image.
