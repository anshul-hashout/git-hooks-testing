# How to call a Citrix cloud services API

Simplify the delivery and management of Citrix technologies in your site by calling Citrix cloud services APIs. There are many APIs available specific to each product.

In this section, the following are described:

-  Example for calling a Citrix Cloud API
-  Example for calling a Citrix Virtual Apps and Desktops API

## Example for calling Citrix Cloud APIs

Every call to a Citrix Cloud API must include the bearer token in an HTTP `Authorization` header. Currently, Citrix Cloud does not use the standard OAuth 2.0 header format, in particular, it requires a `CwsAuth` prefix. CWS stands for Citrix Workspace services, the original name for Citrix Cloud.

### Example to call Resource locations API

The [Resource Locations API](/citrix-cloud/citrix-cloud-api/docs/resource-locations) allows you to retrieve the list of configured resource locations.

#### Resource locations {.tabnav}

##### Developer portal

To call Resource locations API manually through developer portal:

1.  Navigate to [Citrix Cloud API](/citrix-cloud/citrix-cloud-api/docs/overview) section on the developer portal.
1.  Click **API reference** tab.
1.  From the **API Exploration** tab, select **Locations** > **Locations_Get** API from the list.
1.  Click **Invoke API**. The Resource URL is automatically updated.
1.  In the **Path Parameters** > **VALUE** field, enter the customer ID generated at [Step 2](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-2-create-an-api-client-in-citrix-cloud).
1.  Click **Execute**. The Response section is updated with HTTP status code and resource location details.

##### PowerShell

1.  Enter the following to create headers hashtable with the bearer token that you received in [Step 4](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-4-authenticate-to-citrix-cloud-by-generating-a-bearer-token).

      ```powershell
      $headers = @{
        Authorization = "CwsAuth Bearer=$($token.access_token)"
      }
      ```

1.  Enter the following to retrieve the list of configured resource locations:

      ```powershell
      $customerId = $env:CUSTOMER_ID
      $resourceLocUrl = "https://registry.citrixworkspacesapi.net/$customerId/resourcelocations"
      ```

1.  Enter the following to call the API. This call is a simple HTTP GET on the URL.

      ```powershell
      $response = Invoke-WebRequest $resourceLocUrl -Headers $headers
      ```

1.  Verify the return value. You might have any number of resource locations, including zero, depending on your configuration.

1.  Enter the following to pass the response through the `ConvertFrom-Json` and `ConvertTo-Json` cmdlets.

      ```powershell
      $response | ConvertFrom-Json | ConvertTo-Json -Depth 10
      ```

    **Expected output:**

      ```json
      {
        "items": [
          {
            "id": "9e2fda49-c878-4c23-aae1-8ffcbdc2dab2",
            "name": "My Resource Location",
            "internalOnly": false,
            "timeZone": "GMT Standard Time",
            "readOnly": false
          }
        ]
      }
      ```

Pass the response through the `ConvertFrom-Json` and `ConvertTo-Json` cmdlets as this method is the most straight forward way of making JSON data readable. The `ConvertTo_Json` defaults to including only 2 levels of contained objects in the JSON representation. You'll encounter more deeply nested content in this tutorial, so use the `-Depth` parameter to ensure that you see all data.

##### Python

1.  Enter the following to create a `requests` `Session` object, and configure it with an HTTP header containing the bearer token that you received in [Step 4](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-4-authenticate-to-citrix-cloud-by-generating-a-bearer-token).

      ```python
      session = requests.Session()

      session.headers.update({
          'Authorization': f'CwsAuth Bearer={token["access_token"]}'
      })
      ```

    You can now use the `session` object to call the APIs, and the authorization header is sent with each request.

1.  Enter the following to retrieve the list of configured resource locations:

      ```python
      customer_id = os.environ['CUSTOMER_ID']
      resource_loc_url = f'https://registry.citrixworkspacesapi.net/{customer_id}/resourcelocations'
      ```

1.  Enter the following to call the API. This call is a simple HTTP GET on the URL.

      ```python
      response = session.get(resource_loc_url)
      ```

1.  Verify the return value. You might have any number of resource locations, including zero, depending on your configuration.

1.  Enter the following to customize the output.

      ```python
      pprint(response.json())
      ```

    **Expected output:**

      ```python
      {'items': [{'id': '9e2fda49-c878-4c23-aae1-8ffcbdc2dab2',
                  'internalOnly': False,
                  'name': 'My Resource Location',
                  'readOnly': False,
                  'timeZone': 'GMT Standard Time'}]}
      ```

##### cURL

1.  Enter the following to create an environment variable for the HTTP header with the bearer token that you received in [Step 4](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-4-authenticate-to-citrix-cloud-by-generating-a-bearer-token).

      ```bash
      authorization="Authorization: CwsAuth Bearer=${ACCESS_TOKEN}"
      ```

    You can now use the session object to call the APIs, and the authorization header is sent with each request.

1.  Enter the following to retrieve the list of configured resource locations:

      ```bash
      resource_loc_url="https://registry.citrixworkspacesapi.net/${CUSTOMER_ID}/resourcelocations"
      ```

1.  Enter the following to call the API. This call is a simple HTTP GET on the URL.

      ```bash
      response=$(curl -s ${resource_loc_url} -H "${authorization}")

      ```

1.  Verify the return value. You might have any number of resource locations, including zero, depending on your configuration.

1.  Enter the following to customize the output.

      ```curl
      echo ${RESPONSE} | jq .
      ```

    **Expected output:**

      ```json
      {
        "items": [
          {
            "id": "9e2fda49-c878-4c23-aae1-8ffcbdc2dab2",
            "name": "My Resource Location",
            "internalOnly": false,
            "timeZone": "GMT Standard Time",
            "readOnly": false
          }
        ]
      }
      ```

##### {}

For more information on calling various Citrix Cloud APIs, see [Citrix Cloud API](/citrix-cloud/citrix-cloud-api/docs/overview) section.

### Example to call ServiceState API

The [ServiceState API](/citrix-cloud/citrix-cloud-api/docs/service-entitlement) allows you to determine details about the services that a customer is entitled to on Citrix Cloud.

#### Service state {.tabnav}

##### Developer portal

To call ServiceState API manually through developer portal:

1.  Navigate to [Citrix Cloud API](/citrix-cloud/citrox-cloud-api/docs/overview) section on the developer portal.
1.  Click **API refernece** tab.
1.  From the **API Exploration** tab, select **ServiceState** > **ServiceState_GetAll** API from the list.
1.  Click **Invoke API**. The Resource URL is automatically updated.
1.  In the **Path Parameters** > **VALUE** field, enter the customer ID generated at [Step 2](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-2-create-an-api-client-in-citrix-cloud).
1.  Click **Execute**. The Response section is updated with HTTP status code and service details.

##### PowerShell

1.  Enter the following to determine details about the services that a customer is entitled to on Citrix Cloud:

      ```powershell
      $response = Invoke-WebRequest "https://core.citrixworkspacesapi.net/$customerId/serviceStates" `
      -Headers $headers
      $serviceStates = $response | ConvertFrom-Json
      $serviceStates | ConvertTo-Json -Depth 10
      ```

    **Expected output:**

      ```txt
      ...lots of JSON data...
      ````

##### Python

1.  Enter the following to determine the service state:

      ```python
      response = session.get(f'https://core.citrixworkspacesapi.net/{customer_id}/serviceStates')
      service_states = response.json()
      pprint(service_states)
      ```

    **Expected output:**

      ```txt
      ...lots of JSON data...
      ```

##### cURL

1.  Enter the following to determine the details about the service state:

      ```bash
      response=$(curl -s "https://core.citrixworkspacesapi.net/${customer_id}/serviceStates" -H "${authorization}")
      echo ${response} | jq .
      ```

    **Expected output:**

      ```txt
      ...lots of JSON data...
      ````

##### {}

If you're just interested in the services that are available by default, you can iterate through the list of services, printing only those that have `ProductionTrial` status. You will see a different list of services.

#### Service Pipeline {.tabnav}

##### Developer portal

The Response section is updated with HTTP status code and notification details.

##### PowerShell

1.  Enter the following to create a pipeline to filter the desired services, and show just the service names:

      ```powershell
      $serviceStates.items | Where-Object state -eq 'ProductionTrial' | Select-Object -Property serviceName
      ```

    **Expected output:**

      ```txt
      serviceName
      -----------
      cas
      itsm
      microapps
      netscalergateway
      wem
      xendesktop
      ```

##### Python

1.  Enter the following to create an array of the names of services with the desired state, and print it with the 'splat' (`*`) operator:

      ```python
      serviceNames = [s["serviceName"] for s in service_states['items'] if s["state"] == 'ProductionTrial']
      print(*serviceNames, sep = '\n')
      ```

    **Expected output:**

      ```txt
      cas
      itsm
      microapps
      netscalergateway
      wem
      xendesktop
      ```

##### cURL

1.  Enter the following to combine `jq` filters into a pipeline:

      ``` bash
      echo ${RESPONSE} | jq -r '.items[] | select(.state == "ProductionTrial") | .serviceName'
      ```

    **Expected output:**

      ```txt
      cas
      itsm
      microapps
      netscalergateway
      wem
      xendesktop
      ```

##### {}

The Resource Location and Service Entitlement API calls *retrieved* data from Citrix Cloud; you can use the [Notifications API](/citrix-cloud/citrix-cloud-api/docs/notifications) to *send* a notificaton to administrators using the console.

### Example to call Notifications API

The [Notifications API](/citrix-cloud/citrix-cloud-api/docs/resource-locations) allows you to send notification messages to administrators of Citrix Cloud.

#### Notification request {.tabnav}

##### Developer portal

To call Notifications API manually through developer portal:

1.  Navigate to [Citrix Cloud API](/citrix-cloud/citrix-cloud-api/docs/overview) section on the developer portal.
1.  Click **Reference** tab.
1.  From the **API Exploration** tab, select **Notifications** > **Notifications_CreateItems** API from the list.
1.  Click **Invoke API**. The Resource URL is automatically updated.
1.  In the **Path Parameters** > **VALUE** field, enter the customer ID generated at [Step 2](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-2-create-an-api-client-in-citrix-cloud).
1.  Click **Execute**. The Response section is updated with HTTP status code and notification details.

##### PowerShell

1.  The notification request needs a timestamp and unique identifier. So, enter the following to set a couple of variables.

      ```powershell
      $createdDate = Get-Date -Format "o"
      $eventId = New-Guid
      ```

1.  Create a hash table with the required payload. Note that the Powershell dictionary format is quite different to JSON:

      ```powershell
      $notification = @{
        destinationAdmin = '*'
        component = 'Citrix Cloud'
        createdDate = $createdDate
        eventId = $eventId
        severity = 'Information'
        priority = 'Normal'
        content = @(@{
          languageTag = 'en-US'
          title = 'Dinner Time'
          description = 'Fish and Chips!'
        })
      }
      ```

1.  Use the `ConvertTo-Json` cmdlet to JSON to encode the data before POSTing it.

      ```powershell
      $response = Invoke-WebRequest "https://notifications.citrixworkspacesapi.net/$customerId/notifications/items" `
      -Method POST `
      -Headers $headers `
      -Body ($notification | ConvertTo-Json -Depth 10) `
      -ContentType "application/json"
      ```

##### Python

1.  The notification request needs a timestamp and unique identifier, so perform the necessary imports and set a couple of variables:

      ```python
      from datetime import datetime, timezone
      import uuid

      created_date = datetime.now(timezone.utc).astimezone().isoformat()
      event_id = str(uuid.uuid4())
      ```

1.  Create a Python dictionary with the required payload. Note that the Python dictionary format is similar, but not identical to, JSON:

      ```python
      notification = {
        'destinationAdmin': '*',
        'component': 'Citrix Cloud',
        'createdDate': created_date,
        'eventId': event_id,
        'severity': 'Information',
        'priority': 'Normal',
        'content': [{
            'languageTag': 'en-US',
            'title': 'Dinner Time',
            'description': 'Fish and Chips!'
        }]
      }
      ```

1.  Pass the notification dictionary using the `json` parameter to JSON encode the data before POSTing it.

      ```python
      response = session.post(f'https://notifications.citrixworkspacesapi.net/{customer_id}/notifications/items', json=notification)
      ```

##### cURL

1.  The notification request needs a timestamp and unique identifier, so set a couple of variables:

      ```bash
      created_date=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
      event_id=$(uuidgen)
      ```

1.  Create JSON as required:

      ```bash
      notification='{
        "destinationAdmin": "*",
        "component": "Citrix Cloud",
        "createdDate": "'${CREATED_DATE}'",
        "eventId": "'${EVENT_ID}'",
        "severity": "Information",
        "priority": "Normal",
        "content": [{
            "languageTag": "en-US",
            "title": "Dinner Time",
            "description": "Fish and Chips!"
        }]
      }'
      ```

1.  Post the payload to the Notifications API. Note that you have to explicitly specify the `Content-Type` header, since the default is a form post.

      ```bash
      response=$(curl -s https://notifications.citrixworkspacesapi.net/${CUSTOMER_ID}/notifications/items \
        -H "${authorization}" \
        -H "Content-Type: application/json" \
        -d ${notification})
      ```

##### {}

The response contains an acknowledgement that the notification was processed:

#### Notification Response {.tabnav}

##### Developer portal

The Response section is updated with HTTP status code and notification details.

##### PowerShell

1.  Enter the following:

      ```powershell
      $response.content | ConvertFrom-Json | ConvertTo-Json -Depth 10
      ```

    **Expected output:**

     ```json
      {
      "destinationAdmin": "*",
      "component": "Citrix Cloud",
      "createdDate": "2021-02-09T08:20:17.120808-08:00",
      "categories": null,
      "severity": "Information",
      "eventId": "004e6570-a0d2-4496-bb91-11e731ae457b",
      "priority": "Normal",
      "content": [
      {
      "languageTag": "en-US",
      "title": "Dinner Time",
      "description": "Fish and Chips!",
      "detailUri": null
      }
      ],
      "data": null,
      "externalId": null,
      "suppressEmail": false
      }
      ```

##### Python

1.  Enter the following:

      ```python
      pprint(response.json())
      ```

   **Expected output:**

      ```python
      {'categories': None,
      'component': 'Citrix Cloud',
      'content': [{'description': 'Fish and Chips!',
                    'detailUri': None,
                    'languageTag': 'en-US',
                    'title': 'Dinner Time'}],
      'createdDate': '2021-01-20T21:10:45.714095+00:00',
      'data': None,
      'destinationAdmin': '*',
      'eventId': '9f8a18c6-9955-4f8c-8078-76b41a762c00',
      'externalId': None,
      'priority': 'Normal',
      'severity': 'Information',
      'suppressEmail': False}
      ```

##### cURL

1.  Enter the following:

      ```bash
      echo ${response} | jq .
      ```

    **Expected output:**

      ```json
      {
      "destinationAdmin": "*",
      "component": "Citrix Cloud",
      "createdDate": "2021-02-09T17:52:40Z",
      "categories": null,
      "severity": "Information",
      "eventId": "392768A6-C531-474D-ABA9-BCC550A5E1AC",
      "priority": "Normal",
      "content": [
      {
      "languageTag": "en-US",
      "title": "Dinner Time",
      "description": "Fish and Chips!",
      "detailUri": null
      }
      ],
      "data": null,
      "externalId": null,
      "suppressEmail": false
      }
      ```

##### {}

Go to the Citrix Cloud console and click the bell icon, top right, to see a summary of the notification:

![Notification Summary](/sites/all/themes/citrix_api/images/getting-started-apis/notification1.jpg)

Click the notification title to view its detail:

![Notification Detail](/sites/all/themes/citrix_api/images/getting-started-apis/notification2.jpg)

## Example for calling a Citrix DaaS REST API

The scope of the authentication token is not limited to the Citrix Cloud Services Platform APIs; you can use the same token to call other services. For example, the Citrix DaaS (formerly Citrix Virtual Apps and Desktops service) REST APIs allows you to automate the administration of resources within a Virtual Apps and Desktops site.

The **Citrix Virtual Apps and Desktops** must be available in your Citrix Cloud services to complete this section:

![CVAD Chip](/sites/all/themes/citrix_api/images/getting-started-apis/cvadchip.png)

If you do not have access to Citrix Virtual Apps and Desktops in Citrix Cloud, then click **Request Demo**, and fill out the form.

The Citrix DaaS REST APIs expect the customer ID as an HTTP header, and also require the `Accept` HTTP header to have a value of `application/json`.

In this example, we have used the Me_GetMe API to get details about the currently logged-in admin.

### Session Headers {.tabnav}

#### Developer portal

In this example, we have used `Admin_GetAdminAdministrator` API.

To call `Admin_GetAdminAdministrator` API manually through developer portal:

1.  Navigate to [Citrix DaaS REST APIs](/citrixworkspace/citrix-daas/citrix-daas-rest-apis/docs/overview) section.
1.  From the **API Exploration** tab, select **Admin APIs** > **Admin_GetAdminAdministrator Get** API from the list.
1.  Click **Invoke API**. The Resource URL is automatically updated.
1.  In the **Path Parameters** > **VALUE** field, enter the customer ID generated at [Step 2](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-2-create-an-api-client-in-citrix-cloud).
1.  Click **Execute**. The Response section is updated with HTTP status code and details.

#### PowerShell

1.  Enter the following to update the headers accordingly with the bearer token that you received in [Step 4](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-4-authenticate-to-citrix-cloud-by-generating-a-bearer-token).

      ```powershell
      $headers += @{
        'Citrix-CustomerId' = $customerId
        Accept = 'application/json'
      }
      ```

    >**Note**
    >
    > The quotes are required around `Citrix-CustomerId`, since it contains a hyphen.

1.  Enter the following to get details about the currently logged-in admin:

      ```powershell
      $response = Invoke-WebRequest "https://api-us.cloud.com/cvadapis/me" `
      -Headers $headers
      $response | ConvertFrom-Json | ConvertTo-Json -Depth 10
      ```

    **Expected output:**

      ```json
      {
        "UserId": "f9f39ab2-7adf-44b5-b9c7-d1e1ad0079bc",
        "DisplayName": "<Name of the user>",
        "ExpiryTime": "6:50:19 PM",
        "RefreshExpirationTime": "5:50:19 AM",
        "VerifiedEmail": "<email ID of the user>",
        "Customers": [
          {
            "Id": "dvinta7755b1",
            "Name": null,
            "Sites": [
              {
                "Id": "70360961-e0f1-4ce9-9371-d590efb5c04f",
                "Name": "cloudxdsite"
              }
            ]
          }
        ]
      }
      ```

#### Python

1.  Enter the following to update the session headers with the bearer token that you received in [Step 4](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-4-authenticate-to-citrix-cloud-by-generating-a-bearer-token).

      ```python
      session.headers.update({
          'Citrix-CustomerId': customer_id,
          'Accept': 'application/json'
      })
      ```

    >**Note:**
    >
    > The quotes are required around `Citrix-CustomerId`, since it includes a hyphen.

1.  Enter the following to get details about the currently logged-in admin:

      ```python
      response = session.get('https://api-us.cloud.com/cvadapis/me')
      pprint(response.json())
      ```

    **Expected output:**

      ```python
      {'Customers': [{'Id': 'dvint7b0681b',
                      'Name': None,
                      'Sites': [{'Id': 'd503b55f-5385-47f9-9849-b586e73cf72b',
                                'Name': 'cloudxdsite'}]}],
      'DisplayName': '<Name of the user>',
      'ExpiryTime': '9:35:18 PM',
      'RefreshExpirationTime': '8:35:18 AM',
      'UserId': 'f9f39ab2-7adf-44b5-b9c7-d1e1ad0079bc',
      'VerifiedEmail': 'redacted@citrix.com'}
      ```

#### cURL

1.  Enter the following to set more variables for the required headers:

      ```bash
      citrix_customer_id="Citrix-CustomerId: ${CUSTOMER_ID}"
      accept="Accept: application/json"
      ```

1.  Enter the following to get details about the currently logged-in admin:

      ```bash
      response=$(curl -s https://api-us.cloud.com/cvadapis/me \
        -H ${authorization} \
        -H ${citrix_customer_id} \
        -H ${accept})
      echo ${response} | jq .
      ```

1.  Verify the output.

    **Expected output:**

      ```json
      {
        "UserId": "f9f39ab2-7adf-44b5-b9c7-d1e1ad0079bc",
        "DisplayName": "<Name of the user>",
        "ExpiryTime": "6:50:19 PM",
        "RefreshExpirationTime": "5:50:19 AM",
        "VerifiedEmail": "<Email ID of the user>",
        "Customers": [
          {
            "Id": "dvinta7755b1",
            "Name": null,
            "Sites": [
              {
                "Id": "70360961-e0f1-4ce9-9371-d590efb5c04f",
                "Name": "cloudxdsite"
              }
            ]
          }
        ]
      }
      ```

#### {}

For more information on calling various Citrix DaaS APIs, see [Citrix DaaS REST APIs](/citrixworkspace/citrix-daas/citrix-daas-rest-apis/docs/overview) section.

## Creating a Script

In this tutorial, you've explored the Citrix Cloud REST APIs interactively. You can put the knowledge you've gained to work by writing a simple script to reboot all machines in a given catalog that have no user sessions:

### Reboot Script {.tabnav}

#### PowerShell

```powershell
#
# Script to iterate through the machines in a given catalog, rebooting any 
# that have zero sessions.
#
# The following environment variables MUST be set before running this script:
#
# CLIENT_ID: the API client id
# CLIENT_SECRET: the API client secret
# 

# Command-line parameters
# Note use of the Guid type - invalid GUID's will be automatically rejected
param (
  [Parameter(Mandatory=$true)][string]$customerId,
  [Parameter(Mandatory=$true)][Guid]$siteId,
  [Parameter(Mandatory=$true)][Guid]$catalogId
)

# Use endpoints based on the geographical region you selected while creating the Citrix Cloud account.
# api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region.
# api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region.
# api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
$tokenUrl = 'https://api-us.cloud.com/cctrustoauth2/root/tokens/clients'

# Obtain bearer token from authorization server
$response = Invoke-WebRequest $tokenUrl -Method POST -Body @{
  grant_type = "client_credentials"
  client_id = $env:CLIENT_ID
  client_secret = $env:CLIENT_SECRET
}
$token = $response.Content | ConvertFrom-Json

# Create our headers hash table
$headers = @{
  Authorization = "CwsAuth Bearer=$($token.access_token)"
  'Citrix-CustomerId' = $customerId
  Accept = 'application/json'
}

# Get a list of machines in the specified catalog
$response = Invoke-WebRequest "https://api-us.cloud.com/cvadapis/$siteId/MachineCatalogs/$catalogId/Machines" -Headers $Headers
$machines = $response | convertFrom-Json

foreach ($machine in $machines.Items) {
  if ($machine.SessionCount -eq 0) {
    $status = 'success'
    try {
      # Note - the $ in the URL must be escaped with a ` and the content type must be JSON
      $response = Invoke-WebRequest "https://api-us.cloud.com/cvadapis/$siteId/Machines/$($machine.Id)/`$reboot" `
        -Method POST `
        -Headers $headers `
        -ContentType "application/json"
    } catch [Microsoft.PowerShell.Commands.HttpResponseException] {
      # Catch HTTP errors from the API (400, 500 etc)
      $msg = $_.ErrorDetails.Message | ConvertFrom-Json
      $status = "failure: $($msg.ErrorMessage)"
    } catch {
      # Catch anything else
      $status = "failure: $($_.ErrorDetails.Message)"
    }

    # It's not possible to Write-Output without a new-line in PowerShell, so output the whole line at once
    Write-Output "Requesting reboot for $($machine.Name)... $status"
  } else {
    Write-Output "$($machine.SessionCount) sessions on $($machine.Name) - skipping"
  }
}
```

Save the preceding script as `reboot_idle.ps1`, and run it:

```cmd
.\reboot_idle.ps1 --customerId abcd1024xyz --siteId 12345678-1234-1234-1234-12345678abcd --catalogId 12345678-1234-1234-1234-12345678abcd
```

```txt
2 sessions on DEMOLAB\OSPREY - skipping
Requesting reboot for DEMOLAB\EAGLE... failure: Machine does not support specified power action.
Requesting reboot for DEMOLAB\KESTREL... success
```

#### Python

```python
#! /usr/bin/python3
#
# Script to iterate through the machines in a given catalog, rebooting any 
# that have zero sessions.
#
# The following environment variables MUST be set before running this script:
#
# CLIENT_ID: the API client id
# CLIENT_SECRET: the API client secret
# 

import argparse
import requests
import os
import uuid

# Use endpoints based on the geographical region you selected while creating the Citrix Cloud account.
# api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region.
# api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region.
# api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
TOKEN_URL = 'https://api-us.cloud.com/cctrustoauth2/root/tokens/clients'

# Parse id's from the command line
# Note use of the UUID type - invalid UUID's will be automatically rejected
parser = argparse.ArgumentParser()
parser.add_argument("-u", "--customerId", required=True, help="Customer ID")
parser.add_argument("-s", "--siteId", type=uuid.UUID, required=True, help="Site ID")
parser.add_argument("-a", "--catalogId", type=uuid.UUID, required=True, help="Catalog ID")
args = parser.parse_args()

# Obtain bearer token from authorization server
response = requests.post(TOKEN_URL, data={
  'grant_type': 'client_credentials',
  'client_id': os.environ['CLIENT_ID'],
  'client_secret': os.environ['CLIENT_SECRET']
})
response.raise_for_status()
token = response.json()

# Create a session object with the relevant HTTP headers
session = requests.Session()
session.headers.update({
  'Authorization': f'CwsAuth Bearer={token["access_token"]}',
  'Citrix-CustomerId': args.customerId,
  'Accept': 'application/json'
})

# Get a list of machines in the specified catalog
response = session.get(f'https://api-us.cloud.com/cvadapis/{args.siteId}/MachineCatalogs/{args.catalogId}/Machines')
response.raise_for_status()
machines = response.json()

# Loop through the returned machines
for machine in machines['Items']:
  # Are there any sessions on the machine?
  if machine['SessionCount'] == 0:
    # Try to reboot the machine!
    print(f'Requesting reboot for {machine["Name"]}... ', end='', flush=True)
    try:
      response = session.post(f'https://api-us.cloud.com/cvadapis/{args.siteId}/Machines/{machine["Id"]}/$reboot')
      response.raise_for_status()
    except requests.exceptions.HTTPError:
      # Catch HTTP errors from the API (400, 500 etc)
      error = response.json();
      print(f'failure: {error["ErrorMessage"]}')  
    except Exception as e:
      # Catch anything else
      print(f'failure: {repr(e)}')
    else:
      print('success')
  else:
    print(f'{machine["SessionCount"]} sessions on {machine["Name"]} - skipping')
```

Save the preceding script as `reboot_idle.py`, and run it:

```bash
python3 reboot_idle.py --customerId abcd1024xyz --siteId 12345678-1234-1234-1234-12345678abcd --catalogId 12345678-1234-1234-1234-12345678abcd
```

```txt
2 sessions on DEMOLAB\OSPREY - skipping
Requesting reboot for DEMOLAB\EAGLE... failure: Machine does not support specified power action.
Requesting reboot for DEMOLAB\KESTREL... success
```

Note the use of `raise_for_status()`. So far, you've been exploring the APIs interactively, and examining responses manually, taking appropriate action on encountering an error. With simple scripts, if an API call fails with an HTTP error, you can have it it with an error, rather than just continue to the next instruction. This is exactly what `raise_for_status()` does; if you set the `CLIENT_SECRET` to an invalid value and rerun the script, it halts with an exception:

```bash
export CLIENT_SECRET="GarbageValue"
python3 reboot_idle.py --customerId abcd1024xyz --siteId 12345678-1234-1234-1234-12345678abcd --catalogId 12345678-1234-1234-1234-12345678abcd
```

```txt
Traceback (most recent call last):
  File "reboot_idle.py", line 37, in <module>
    response.raise_for_status()
  File "/usr/local/lib/python3.8/site-packages/requests/models.py", line 943, in raise_for_status
    raise HTTPError(http_error_msg, response=self)
requests.exceptions.HTTPError: 400 Client Error: Invalid request for url: https://api-us.cloud.com/cctrustoauth2/root/tokens/clients
```

You can see towards the end of the script how it can catch exceptions, display meaningful error information, and carry on iterating over the list of machines.

#### cURL

```bash
#! /bin/bash
#
# Script to iterate through the machines in a given catalog, rebooting any 
# that have zero sessions.
#
# The following environment variables MUST be set before running this script:
#
# CLIENT_ID: the API client id
# CLIENT_SECRET: the API client secret
# 

# Parse id's from the command line
while getopts u:s:a: opt
do
    case "${opt}" in
        u) customerId=${OPTARG};;
        s) siteId=${OPTARG};;
        a) catalogId=${OPTARG};;
    esac
done

if [ -z "$customerId" ] || [ -z "$siteId" ] || [ -z "$catalogId" ]; then
   echo "Usage: reboot_idle.sh -u customerId -s siteId -a catalogId"
   exit
fi

# Use endpoints based on the geographical region you selected while creating the Citrix Cloud account.
# api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region. 
# api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region. 
# api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
token_url="https://api-us.cloud.com/cctrustoauth2/root/tokens/clients"

# Obtain bearer token from authorization server
response=$(curl -s ${token_url} -d "grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}")
if [ "$?" -ne 0 ]; then
  # Curl failed
  echo "Authorization failed"
  exit
fi

# The -e option tells jq to exit with an error if there is no access_token
access_token=$(echo ${response} | jq -re .access_token)
if [ "$?" -ne 0 ]; then
  # Can't parse a bearer token out of the response
  echo "Authorization failed: ${response}"
  exit
fi

# Create the required HTTP headers
authorization="Authorization: CwsAuth Bearer=${access_token}"
citrix_customer_id="Citrix-CustomerId: ${customerId}"
accept="Accept: application/json"

# Get a list of machines in the specified catalog
response=$(curl -s "https://api-us.cloud.com/cvadapis/${siteId}/MachineCatalogs/${catalogId}/Machines" \
  -H "${authorization}" \
  -H "${citrix_customer_id}" \
  -H "${accept}")
if [ "$?" -ne 0 ]; then
  # Curl failed
  echo "Failed to get machine catalog"
  exit
fi

# Parse out machines - the -c option tells jq to emit 'compact' output - one JSON object per line
# If there is no Items array, then jq will exit with an error as it tries to iterate over the 
# non-existent data
machines=$(echo $response | jq -c '.Items[]' 2>/dev/null)
if [ "$?" -ne 0 ]; then
  # Can't parse a list of machines out of the response - it's likely an error message
  echo "Failed to get machine catalog: $(echo ${response} | jq -c .)"
  exit
fi

# Iterate through machines rebooting them
while IFS= read -r machine; do
  sessions=$(echo $machine | jq -r .SessionCount)
  name=$(echo $machine | jq -r .Name)
  id=$(echo $machine | jq -r .Id)
  if [ "$sessions" == "0" ]; then
    echo -n "Requesting reboot for ${name}... "
    response=$(curl -s "https://api-us.cloud.com/cvadapis/${siteId}/Machines/${id}/\$reboot"  \
      -X POST \
      -H "${authorization}" \
      -H "${citrix_customer_id}" \
      -H "${accept}" \
      -H "Content-Length: 0")
    if [ "$?" -ne 0 ]; then
      # Curl failed
      echo "failed"
    else
      # curl succeeded - look for machine Id in response
      echo ${response} | jq -e .Id &>/dev/null
      if [ "$?" -eq 0 ]; then
        # All is good!
        echo 'success'
      else
        # No Id - show error
        echo "failure: $(echo ${response} | jq -cr .ErrorMessage)"
      fi
    fi
  else
    echo "${sessions} sessions on ${name} - skipping"
  fi
done <<< "$machines"
```

Save the preceding script as `reboot_idle.sh`, and run it:

```bash
chmod +x .\reboot_idle.sh
.\reboot_idle.sh --customerId abcd1024xyz --siteId 12345678-1234-1234-1234-12345678abcd --catalogId 12345678-1234-1234-1234-12345678abcd
```

```text
2 sessions on DEMOLAB\OSPREY - skipping
Requesting reboot for DEMOLAB\EAGLE... failure: Machine does not support specified power action.
Requesting reboot for DEMOLAB\KESTREL... success
```

Note that `curl` exits with a zero status code, indicating success, even in the case of an HTTP failure status code, such as 400, so take care when interpreting its output. Use the `-e` option to tell `jq` to exit with an error if its output is null.

#### {}

## Next Steps

The [Citrix DaaS REST APIs learning journey](/citrixworkspace/citrix-daas/citrix-daas-rest-apis/docs/learning-journey) walks you through tasks such as publishing apps and enumerating sessions. We'll be publishing more learning journeys; let us know at developers@citrix.com which topics you would like to see us cover!
