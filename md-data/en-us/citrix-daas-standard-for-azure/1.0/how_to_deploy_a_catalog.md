# How to deploy a catalog in Azure account using Citrix DaaS Standard for Azure

Use REST APIs to deploy a catalog in your Azure account in Citrix DaaS Standard for Azure (formerly Citrix Virtual Apps and Desktops Standard for Azure).

You can make API requests using the PowerShell code, C# code, or any tool that supports invoking the REST API.

## Steps to deploy a catalog in Azure account

To deploy a catalog in your Azure account, use the following procedure:

-  Read the [Get started with Citrix Cloud APIs](/getting-started) section to ensure that you have the `customerId` and `bearer token`.
-  Get the `siteid` from [How to get a site id](./how-to-get-a-site-id) API.
-  If you want to create a domain-joined Citrix DaaS Standard for Azure catalog, add a VNET peering from the Citrix DaaS Standard for Azure UI and then use it in the APIs to deploy a domain-joined catalog.
-  Use the API listed below to deploy the Citrix DaaS Standard for Azure catalog. This is an asynchronous API, so the `async` query parameter is required to be true.
-  Monitor the deployment status of your catalog using steps listed in [how to get catalog information](./how-to-get-catalog-information) or the URL in the "Location" response header.
-  A state of `Processing` indicates that the catalog is still being deployed. Keep monitoring the state.
-  A state of `InputRequired` or `Active` indicates that the catalog deployment has completed. You can now publish apps and assign subscribers to the catalog.

## Deploy a catalog in Azure account using any REST API tool

Learn from the following example to deploy a catalog in your Azure account using any REST API tool.

### Request

    POST https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/$manageddeploy?async=true HTTP/1.1
    Accept: application/json
    Content-Type: application/json; charset=utf-8
    Authorization: CwsAuth bearer=<token-from-prerequisites>
    
    {
      "addCatalog": {
        "name": "Finance Catalog",
        "type": "MultiSession",
        "isDomainJoined": true,
        "persistStaticAllocatedVmDisks": true
      },
      "addCatalogOnPremConnectivity": {
        "vnetPeeringId": "ebe15c11-056e-..."
      },
      "addCatalogDomain": {
        "domainName": "finance.local",
        "domainOu": "",
        "serviceAccountName": "admin"
      },
      "addCatalogImage": {
        "templateId": "55cab14f-efb7-...",
        "citrixPrepared": true
      },
      "addCatalogCapacity": {
        "computeWorker": {
          "usePremiumStorage": false,
          "useAzureHUB": true,
          "maxUsersPerVM": 3,
          "instanceTypeId": "D2sv3",
          "instanceName": "Standard_D2s_v3",
          "useManagedDisks": true
        },
        "scaleSettings": {
          "minInstances": 1,
          "maxInstances": 4,
          "weekdays": {"Monday": true, "Tuesday": true, "Wednesday": true, "Thursday": true, "Friday": true, "Saturday": false, "Sunday": false},
          "peakStartTime": 8,
          "peakEndTime": 17,
          "peakTimeZone": "Eastern Standard Time",
          "peakMinInstances": 2,
          "bufferCapacity": 10,
          "offPeakBufferCapacity": 10,
          "peakDisconnectedSessionTimeout": 20,
          "offPeakDisconnectedSessionTimeout": 15,
          "powerOffDelay": 5
        },
        "sessionTimeout": 15,
        "multiSessionDisconnectedSessionTimeout": 15,
      },
      "deploySecrets": {
        "serviceAccountPassword": "password"
      },
      "cspCustomerId": "4e53dcaa-b61a-...",
      "cspSiteId": "74ea9d7f-eb00-...",
      "setDefault": true,
      "pendingCitrixManagedUsers": [
        {
          "email": "john.doe@finance.com",
          "firstName": "john",
          "lastName": "doe",
          "cspCustomerId": "4e53dcaa-b61a-...",
          "cspSiteId": "74ea9d7f-eb00-..."
        }
      ],
      "pendingUsers": {
        "identityProvider": "All",
        "users": [
          {
            "upn": "string"
          }
        ]
    }

### Response

    HTTP/1.1 202 Accepted
    citrix-transactionid: 80699539-ae66-4eb7-ae67-370606d12766
    location: https://api-us.cloud.com/catalogservice/{customerId}/{siteId}/catalogs/55cab14f-efb7-4bd6-bd9c-ebe991c9d165/deploymentStatus
    content-Length: 38
    content-Type: application/json; charset=utf-8
    date: Wed, 22 Nov 2017 15:05:23 GMT
    
    "55cab14f-efb7-4bd6-bd9c-ebe991c9d165"

### Interpreting the request

The request JSON body contains all the fields needed to deploy a new
catalog. On the Vitual Apps Essentials UI, these fields are split into
seven different steps that are described below.

Step 1: Pick a Name (AddCatalog)

| Property name | Description |
| --- | --- |
| name | [Required] The name you want to give to your new catalog. |
| type | [Optional] Defaults to MultiSession. Decide whether the catalog VDAs run a single session or multiple sessions. |
| IsDomainJoined | [Optional] Decide whether the catalog should be joined to your own domain. True by default. |
| persistStaticAllocatedVmDisks | [Optional] Defaults to true. Decide if catalogs that use statically allocated machines will have the disk contents persisted after shutdown. |

Step 2: Link your Azure Domain if you select domain join in step 1
(addCatalogOnPremConnectivity)

| Property name | Description |
| --- | --- |
| vnetPeeringId | [Required] The ID of the VNet Peering created for your own Azure Domain. |

Step 3: Provide info of the VNet Peering domain specified in step 2
(AddCatalogDomain)

| Property name | Description |
| --- | --- |
| domainName | [Required] The fully qualified domain name to be used by the catalog. The connector and VDA machines will be joined to this domain. |
| domainOu | [Optional] The Active Directory OU. The VDA machine accounts will be created in this OU. |
| serviceAccountName | [Required] The domain service account name in UPN format. Ensure that this account has permissions to join machines to the domain. |

Step 4: Choose master image (AddCatalogImage)

| Property name | Description |
| --- | --- |
| templateId | [Required] The ID of the master image you want to use for the catalog. See [how to get details of all images](./how-to-get-all-master-images) to get the *imageId* of all your posted images. |
| citrixPrepared | [Optional] This should be set to false for a customer provided image. This should be set to true if you are creating the catalog with a Citrix Prepared image. Default value if false. |

Step 5: Select capacity and manage costs (AddCatalogCapacity)

Property: ComputeWorker

| Property name | Description |
| --- | --- |
| usePremiumStorage | [Optional] Defaults to false. True if you want to use Azure Premium disks (SSD). False if you want to use Azure Standard disks (HDD). |
| useAzureHUB | [Optional] Defaults to false. True if you want to use existing on-premises Windows Server licenses to provision the VMs in this catalog at the base compute rate. |
| maxUsersPerVM | [Required] The max number of user sessions on each VDA machine. For *SingleSessionStatic* and *SingleSessionRandom* catalogs please set to 1 |
| instanceTypeId | [Optional] Internal use only. Do not set it. |
| instanceName | [Required] Azure virtual machine size to provision for the VDA. See [virtual machine size](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes) for all available azure VM sizes. |
| useManagedDisks | [Required] Use managed disks for VMs in the catalog |

Property: ScaleSettings

| Property name | Description |
| --- | --- |
| minInstances | [Required] The minimum number of VDA instances running at all times. |
| maxInstances | [Required] The maximum number of VDA instances to provision for the catalog. |
| weekdays | [Optional] Required only if setting a peak schedule. Set true for days you want the peak schedule to be enabled. Example {Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: false, Sunday: false} |
| peakStartTime | [Optional] Required only if setting a peak schedule. The hour of the day when peak schedule begins. Any integer number between 0 and 23. |
| peakEndTime | [Optional] Required only if setting a peak schedule. The hour of the day when peak schedule ends. Any integer number between 0 and 23. |
| peakTimeZone | [Optional] Required only if setting a peak schedule. The timezone name for the peak schedule. See [timezone names](https://msdn.microsoft.com/en-us/library/ms912391(v=winembedded.11).aspx) for a list of valid time zones. |
| peakTimeZoneId | [Optional] Internal use only. Do not set it. |
| peakMinInstances | [Optional] Required only if setting a peak schedule. The minimum number of VDA instances running at peak times. |
| bufferCapacity | [Optional] Defaults to 10%. To ensure that new user sessions have a smooth login experience, the capacity buffer enables extra sessions to be ready for demand spikes, as a percentage of current session demand. For example, if there are 100 active sessions and the capacity buffer is 10%, Citrix provides capacity for 110 sessions. A lower capacity buffer percentage can result in a decreased cost, but could also result in some sessions having an extended login time if several sessions start concurrently. |
| offPeakBufferCapacity | [Optional] Buffer capacity for off peak hours. |
| peakDisconnectedSessionTimeout | [Optional] Required only if setting a peak schedule. Set the time before a disconnected session is shutdown during peak hours. |
| offPeakDisconnectedSessionTimeout | [Optional] Set the time before a disconnected session is shutdown during off peak hours. |
| powerOffDelay | [Optional] Amount of time to delay powering off machines with no active sessions. |

Property: Others

| Property name | Description |
| --- | --- |
| sessionTimeout | [Required] The amount of time in minutes an idle session will be disconnected. |
| multiSessionDisconnectedSessionTimeout | [Required] Required for MultiSession catalogs only. Set the time before a disconnected session is shutdown. |

Step 6: Start Deployment (DeploySecrets)

| Property name | Description |
| --- | --- |
| ServiceAccountPassword | [Required] The domain service account password. |

Step 7 (Optional): Configure optional fields

| Property name | Description |
| --- | --- |
| cspCustomerId | [Optional] Name of tenant customer ID if partner-tenant relationship exists otherwise not null |
| cspSiteId | [Optional] site of tenant customer ID if partner-tenant relationship exists otherwise not null |

Please ignore the fields listed below:

| Property name | Description |
| --- | --- |
| pendingCitrixManagedUsers | [Ignore] Internal use only |
| pendingUsers | [Ignore] Internal use only |

### Interpreting the response

The response is a GUID string that represents the `catalogId`. You will
need this `catalogId` to query the deployment status of the catalog
using [how to get catalog information](./how-to-get-catalog-information).

## Deploy a catalog in Azure account using PowerShell

Learn from the following example to deploy a single session static and non-domain joined catalog to your Azure account using PowerShell code.

``` powershell
function DeployCatalog {
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
  $requestUri = [string]::Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/$manageddeploy?async=true", $customerId, $siteId)
  $headers = @{"Accept"="application/json";
               "Content-Type"="application/json; charset=utf-8"
               "Authorization"="CwsAuth bearer=$bearerToken"}

  $response = Invoke-RestMethod -Uri $requestUri -Method POST -Headers $headers -Body $jsonBody
  return $response
}

$body = @{
  "addCatalog" = @{
    "name" = "Finance Catalog";
    "type" = "SingleSessionStatic";
    "isDomainJoined" = false;
    "citrixManaged" = true;
  }
  "addCatalogImage" = @{
    "templateId" = "ba75cfe9-c08a-4cd6-9ac5-5cbb39a139a7";
    "citrixPrepared" = $true
  }
  "addCatalogCapacity" = @{
    "computeWorker" = @{
      "usePremiumStorage" = $false;
      "useAzureHUB" = $false;
      "maxUsersPerVM" = "16";
      "instanceName" = "Standard_D2_v2"
    }
    "scaleSettings" = @{
      "minInstances" = "1";
      "maxInstances" = "2";
      "weekdays" = @{"Monday" = $true; "Tuesday" = $true; "Wednesday" = $true; "Thursday" = $true; "Friday" = $true; "Saturday" = $false; "Sunday" = $false};
      "peakStartTime" = "9";
      "peakEndTime" = "17";
      "peakTimeZone" = "Eastern Standard Time";
      "peakMinInstances" = "2";
      "bufferCapacity" = "15";
      "offPeakBufferCapacity" = "10";
      "peakDisconnectedSessionTimeout" = "20";
      "offPeakDisconnectedSessionTimeout" = "15";
      "powerOffDelay": "5"
    }
    "sessionTimeout" = "15";
  }
  "deploySecrets" = @{
    "serviceAccountPassword" = "..."
  }
}

$customerId = "customer1" #Replace with your customerId
$siteId = "61603f15-cdf9-4c7f-99ff-91636601a795" #Replace with your site ID
$bearerToken = "ey1.." #See Prerequisites for all API calls section for a sample of how to get your bearer token
$response = DeployCatalog $customerId $siteId $bearerToken (ConvertTo-Json -Depth 3 $body)
```

## Deploy a catalog in your Azure account using C\# code

Learn from the following example to deploy a single session static and non-domain joined catalog to your Azure account using C\# code.

``` csharp
public class AddCatalogModel
{
    /// <summary>
    /// Name of the catalog
    /// </summary>
    [StringLength(38, MinimumLength = 2)]
    public string Name { get; set; }
}

public class CatalogTemplateImageModel
{
    /// <summary>
    /// ID of the Template image to configure for the catalog
    /// </summary>
    [Required]
    public string TemplateId { get; set; }

    /// <summary>
    /// Whether the image was prepared by Citrix, or provided by the customer
    /// </summary>
    public bool CitrixPrepared { get; set; } = false;
}

public class CatalogCapacitySettingsModel
{
    /// <summary>
    /// Compute settings for the catalog
    /// </summary>
    public CatalogComputeWorkerModel ComputeWorker { get; set; }

    /// <summary>
    /// Scale settings for the catalog
    /// </summary>
    public CatalogScaleSettingsModel ScaleSettings { get; set; }

    /// <summary>
    /// Idle timeout for session in the catalog (in mins)
    /// </summary>
    public int? SessionTimeout { get; set; }

    /// <summary>
    /// Minutes to wait for disconnected sessions to be logged off on multi-session VMs
    /// </summary>
    public int? MultiSessionDisconnectedSessionTimeout { get; set; }
}

public class CatalogComputeWorkerModel
{
    /// <summary>
    /// Indicates if Premium Storage will be used
    /// </summary>
    public bool UsePremiumStorage { get; set; }

    /// <summary>
    /// Indicates if the catalog VMs should be deployed with Azure HUB license
    /// </summary>
    public bool UseAzureHUB { get; set; }

    /// <summary>
    /// Number of concurrent users per VM
    /// </summary>
    public int MaxUsersPerVM { get; set; }

    /// <summary>
    /// Type of VM to create for VDA machines
    /// </summary>
    public string InstanceName { get; set; }

    /// <summary>
    /// Use managed disks for VMs in the catalog
    /// </summary>
    public bool UseManagedDisks { get; set; }
}

public class CatalogScaleSettingsModel
{
    /// <summary>
    /// Max number of concurrent settings for the catalog
    /// </summary>
    public int MaxUsers { get; set; }

    /// <summary>
    /// Min number of active vms for the catalog
    /// </summary>
    public int MinInstances { get; set; }

    /// <summary>
    /// Number of VMs that will be provisioned for  this catalog
    /// </summary>
    public int MaxInstances { get; set; }

    /// <summary>
    /// Number of VMs the admin would like the catalog changed to
    /// </summary>
    public int PendingMaxInstances { get; set; }

    /// <summary>
    /// Days of the week that are included in peek days
    /// </summary>
    public Dictionary<string, bool> Weekdays { get; set; }

    /// <summary>
    /// Hour of day when peak usage begins
    /// </summary>
    public int PeakStartTime { get; set; }

    /// <summary>
    /// Hour of day when peak usage ends
    /// </summary>
    public int PeakEndTime { get; set; }

    /// <summary>
    /// Display of the peak usage timezone
    /// </summary>
    public string PeakTimeZone { get; set; }

    /// <summary>
    /// Min number of insances that should be running durring peak hours
    /// </summary>
    public int PeakMinInstances { get; set; }

    /// <summary>
    /// Percentage of buffer capacity during peak hours
    /// </summary>
    public int? BufferCapacity { get; set; }

    /// <summary>
    /// Durring Peak Hours, the time before a disconnected session is shutdown
    /// </summary>
    public int PeakDisconnectedSessionTimeout { get; set; }

    /// <summary>
    /// Durring Off Peak Hours, the time before a disconnected session is shutdown
    /// </summary>
    public int OffPeakDisconnectedSessionTimeout { get; set; }

    /// <summary>
    /// Amount of time to delay powering off machines with no active sessions
    /// </summary>
    [Range(0, 60)]
    public int PowerOffDelay { get; set; }
}

public class DeploySecretsModel
{
    /// <summary>
    /// The client id that has administrators permissions to Citrix Cloud
    /// </summary>
    public string ClientId { get; set; }

    /// <summary>
    /// The client secret that has administrators permissions to Citrix cloud
    /// </summary>
    public string ClientSecret { get; set; }

    /// <summary>
    /// Service account password for required in domain joining. This will be stored in a azure vault.
    /// </summary>
    public string ServiceAccountPassword { get; set; }
}

public class CitrixManagedCatalogConfigDeployModel
{
    public AddCatalogModel AddCatalog { get; set; }

    public CatalogOnPremConnectivityModel AddCatalogOnPremConnectivity { get; set; }

    public CatalogDomainModel AddCatalogDomain { get; set; }

    public CatalogTemplateImageModel AddCatalogImage { get; set; }

    public CatalogCapacitySettingsModel AddCatalogCapacity { get; set; }

    /// <summary>
    /// Only needed for vnet peered/domain joined catalogs
    /// </summary>
    public DeploySecretsModel DeploySecrets { get; set; }

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
public static async Task<string> DeployCatalog(
    string customerId,
    string siteId,
    string bearerToken,
    CatalogConfigDeployModel model)
{
    var requestUri = string.Format("https://api-us.cloud.com/catalogservice/{0}/{1}/catalogs/$manageddeploy?async=true", customerId, siteId);
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

See [how to get catalog information](./how-to-get-catalog-information) or use the URL in
"location" header to monitor the deployment status of your catalog.
