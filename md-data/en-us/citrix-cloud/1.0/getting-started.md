# How to get started with the Citrix cloud services API

Learn how to start interacting with Citrix Cloud via its Application Programming Interfaces (APIs), using your choice of the following:

-  Python programming language
-  PowerShell task automation framework
-  cURL command line tool running in a `bash` shell

The following diagram denotes the procedure to get started with Citrix cloud services APIs:

 ![procedure](/data/images/getting-started/procedure.png)

Follow the prerequisites and procedures explained in the following section to get started with the Citrix cloud services API.

## Prerequisites to use Citrix cloud services APIs

The following prerequisites are required to call Citrix cloud services APIs:

-  Working knowledge of API: APIs allow us to automate repetitive administrative tasks, capture complex configuration as code, and create whole new applications that build on existing services. A working knowledge of APIs and how to use them is essential to call Citrix cloud services APIs. For more basic information on APIs, see the [Wikipedia](https://en.wikipedia.org/wiki/API) documentation.

-  Knowledge on REST API: Representational State Transfer (REST), is an architectural pattern for designing and implementing APIs. A RESTful API addresses the resource via URLs, such as `https://api.example.com/user/1234`, and typically implements operations via the HTTP protocol. Just as a browser might retrieve a page from a web server via an HTTP GET, then submit data to the server via a form POST, a RESTful API client might use an HTTP GET to retrieve the current state of a resource, and then send an HTTP POST to do some operation on that resource. RESTful APIs usually, but not always, represent resources using the JSON format. An API client retrieving the example user resource might receive data such as:

    ```json
    {
        "firstName": "Bob",
        "lastName": "Todd",
        "email": "bob@example.com"
    }
    ```

    For more basic information on REST APIs, see the [Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer) documentation.

-  Citrix Cloud account: To use Citrix cloud services APIs, you must have a Citrix Cloud account. For more information. see [Sign in to Citix Cloud](#step-1-sign-in-to-citrix-cloud) section.

## Step 1: Sign in to Citrix Cloud

To use Citrix cloud services APIs, you must have a Citrix Cloud account. Go to  [Citrix Cloud](https://citrix.cloud.com) site  and sign in with your existing Citrix Cloud account.

If you do not have a Citrix Cloud account, you must first create a Citrix Cloud account or join an existing account created by someone else in your organization. For detailed processes and instructions on how to proceed, see [Sign Up for Citrix Cloud](http://docs.citrix.com/en-us/citrix-cloud/overview/get-started/signing-up-for-citrix-cloud.html).

## Step 2: Create an API client in Citrix Cloud

Create an API client in Citrix Cloud to generate the client ID and secret that you want to use for accessing Citrix cloud services APIs. The client ID and secret ensures that your access to the Citrix Cloud API is secured appropriately.

API clients in Citrix Cloud are always tied to one administrator and one customer. API clients are not visible to other administrators. If you want to access to more than one customer, you must create API clients within each customer.

API clients are automatically restricted to the rights of the administrator who created it. For example, if an administrator is restricted to access only notifications, the administrator's API clients have the same restrictions. If an administrator’s access is reduced at any point, the access of all the API clients owned by that administrator is also reduced. If an administrator’s access is removed from the list of administrators within that customer, all of the administrator's API clients are also removed.

To create an API client:

1.  From the Citrix Cloud management console, click the hamburger icon and select the **Identity and Access Management** option from the menu.

    ![Drop-down menu](/data/images/getting-started/menu.png)

    ![Identity and Access management](/data/images/getting-started/identity_management.png)

    > **Note:**
    >
    > If the **Identity and Access Management** option doesn't appear, you might not have adequate permissions to create an API client. Contact your administrator to get the required permissions.

1.  Select the **API Access** tab.

  ![Customer ID](/data/images/getting-started/api_access.png)

1.  Name your Secure Client, and click **Create Client**.

  ![Create client](/data/images/getting-started/create_client.png)

  The following message appears, **ID and Secret have been created successfully**.

  ![Client ID and secret](/data/images/getting-started/clientID_secret.png)

1.  Download or copy the client ID and secret. You need both client ID and secret to access the Citrix cloud services APIs.

1.  After closing the previous dialog, take a note of the customer ID in the description above **Create Client**. You need this customer ID also to access the Citrix cloud services APIs.

  ![Customer ID](/data/images/getting-started/customer_id.png)

## Step 3: Select a tool to make your Citrix cloud services API request

Select a tool that helps you to make the API request and explore API endpoints.

Currently Citrix support the following:

-  Citrix developer portal
-  PowerShell
-  Python
-  cURL
-  Any REST API tool such as Postman

### Select a tool {.tabnav}

#### Developer portal

You can make the API request manually through the Citrix developer portal.

#### PowerShell

-  Install PowerShell - This tutorial uses PowerShell 7.1. If PowerShell is not installed, install it on your machine. For more information, see the [Microsoft](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.1) documentation.

-  Basic PowerShell knowledge - This section is not a PowerShell tutorial. For information on the basics of PowerShell, see the [PowerShell 101](https://docs.microsoft.com/en-us/powershell/scripting/learn/ps101/00-introduction?view=powershell-7.1) tutorial.

#### Python

-  Install Python - This tutorial Python 3. If Python 3 is not installed, install the current version on your machine. For more information, see [Python](https://www.python.org/downloads/) site. This tutorial uses Python 3 rather than 2.7 because [f-strings](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals) make the code more readable when calling REST APIs.

-  Basic Python knowledge - This section is not a Python tutorial, but there are many excellent tutorials available, whether you have existing programming experience. [Python For Beginners](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals) is a great place to start.

This section uses the following Python modules:

-  `os` - This module is included with Python. This module is must to read and write environment variables.

-  `pprint` - This module is included with Python. The [pprint](https://docs.python.org/3/library/pprint.html) (short for 'pretty print') module is used to format output into a customized format.

-  `requests1` - This module isn't included with Python. This module is used to make HTTP calls to the Citrix cloud services REST APIs. To install the module, use the following PIP command in the Python console:

```bash
pip3 install requests
```

You can verify which modules or packages are installed with the `pip3 list` command. If you have previously installed the `requests` module, it must be listed in the output. If you try to install the `requests` module when it is already installed, you see the message, "Requirement already satisfied".

#### cURL

-  cURL - This tutorial uses the `curl` command-line tool. If you don't already have the `curl` executable, download the file from the [`curl` Download Wizard](https://curl.se/dlwiz/) to install it on your machine.

-  jq - This tutorial uses the [`jq`](https://stedolan.github.io/jq/) tool to manipulate JSON data. For downloading jq, see [Download `jq`](https://stedolan.github.io/jq/download/) documentation.

-  Basic knowledge of the `bash` command line - This tutorial supports `bash` on macOS and Linux. It might support `bash` on the Windows Subsystem for Linux, but this combination hasn't been tested.

#### Any REST API tool

You can make the API request through any REST API tool such as Postman.

-  Install Postman - You can make REST API request using Postman. If not installed, install it from the [Postman](https://www.postman.com/downloads/) site.

-  Basic Postman knowledge - For information on the basics of Postman, see the [Postman](https://learning.postman.com/docs/getting-started/introduction/) documentation.

#### {}

To understand and compare Python and PowerShell in the context of Citrix Cloud REST APIs, watch the session recording, [Clash of the Titans in Automation: Python vs PowerShell](https://www.youtube.com/watch?v=98H6iS0EG4s), from [Citrix Converge 2020](/citrix-converge-2020/docs/event-overview).

## Step 4: Authenticate to Citrix Cloud by generating a bearer token

When calling Citrix cloud services APIs, a bearer token is used for API authentication and authorization.

You can create a bearer token using the following methods:

-  Manually through the developer portal
-  OAuth 2.0
-  Trust service (this method is deprecated)

### Developer portal

For manual API interactions, you can generate a bearer token using the developer portal UI.

To generate a bearer token manually:

1.  Navigate to any Citrix cloud services on the developer portal.

1.  From the **API Exploration** tab, select any API from the list.

1.  Click **Invoke API**.

1.  In the **Authorization** header parameter description, click **Generate here**. The **Set Authentication** window appears.

1.  Enter **Client ID** and **Secret** that were generated while creating an API client.

1.  Click **Generate**. A bearer token is generated using the Client ID and Secret and populated in the **Authorization** header field.

Note: A bearer token is valid for an hour, after which it expires. You can find it from the `expires_in`  field in the Response. If your bearer token is expired, follow the same steps to generate a new token.

### OAuth 2.0

A bearer token is one of the prerequisites to call Citrix cloud services APIs using an integration with PowerShell, Python, app, script, and so on. You can create a bearer token using a standard OAuth 2.0 Client Credential grant flow. For more information about the OAuth 2.0 Client Credential grant, see the [documentation](https://tools.ietf.org/html/rfc6749#section-4.4).

Citrix Cloud uses the [OAuth 2.0](https://oauth.net/2/) client credentials mechanism for authentication. API clients simply exchange their credentials for a short-lived token. The Citrix Cloud trust service's authentication API has a URL of the form:

```txt
https://api-us.cloud.com/cctrustoauth2/root/tokens/clients
```

**Note:**

Use one of the following endpoints based on the geographical region that you selected while creating the Citrix Cloud account:

-  api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region.
-  api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region.
-  api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
-  api.citrixcloud.jp - If your Citrix Cloud account is set to the Japan region.

#### OAuth 2.0 Tabs {.tabnav}

##### Any REST API tool such as Postman

Generate a bearer token using any REST API tool such as Postman.

To generate a bearer token:

1.  Open a tool that helps you to make the API request. For example Postman.

1.  Make the following POST call to the trust service's authentication API.

**POST** `https://api-us.cloud.com/cctrustoauth2/{customerid}/tokens/clients`

Note:

Use one of the following endpoints based on the geographical region that you selected while creating the Citrix Cloud account:

-  api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region.
-  api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region.
-  api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
-  api.citrixcloud.jp - If your Citrix Cloud account is set to the Japan region.

|Parameter|Parameter type|Value|
|---|---|---|
|Customerid| path |The customer ID generated while creating the API client.|
|Accept|header|application/json|
|Content-Type|header|application/x-www-form-urlencoded.|
|grant_type|body/form-urlencoded|Use the special value client_credentials.|
|client_id|body/form-urlencoded|The urlencoded Client ID [for the API client](#step-2-create-an-api-client-in-citrix-cloud).|
|client_secret|body/form-urlencoded|The urlencoded Client Secret [for the API client](#step-2-create-an-api-client-in-citrix-cloud).|

**Request sample:**

```HTTP
POST https://api-us.cloud.com/cctrustoauth2/root/tokens/clients HTTP/2
Accept: application/json
Content-Type: application/x-www-form-urlencoded


grant_type=client_credentials&client_id={client_id}&client_secret={client_secret}
```

**Response sample:**

```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
...


{
    "token_type": "bearer",
    "access_token": "ey1..",
    "expires_in": "3600"
}
```

The required bearer token is the value of the response parameter `access_token`. When using this parameter, prefix this value with `CwsAuth Bearer=`.

For example, `Authorization: CwsAuth Bearer=ey1.x`.

##### PowerShell

1.  Open a command prompt or terminal, depending on your operating system:

    -  Windows: From the Start menu, click **Start**, type **cmd**, and then click **Command Prompt**.
    -  Mac: Press Command+Space to open Spotlight Search, type terminal.app, and hit **Return**.

1.  Set environment variables with the API client and customer credentials:

    If you are using Windows operating system, at the command line enter the following:

     ```
      set CLIENT_ID=<YOUR_CLIENT_ID>
      set CLIENT_SECRET=<YOUR_CLIENT_SECRET>
      set CUSTOMER_ID=<YOUR_CUSTOMER_ID>
      ```

    If you are using macOS or Linux operating system, at the command line enter the following:

      ```
      export CLIENT_ID="<YOUR_CLIENT_ID>"
      export CLIENT_SECRET="<YOUR_CLIENT_SECRET>"
      export CUSTOMER_ID="<YOUR_CUSTOMER_ID>"
      ```

1.  Enter the following in the command line:

      ```cmd
      PowerShell
      ```

    The following text appears:

      ```txt
      Windows PowerShell
      Copyright (c) Microsoft Corporation. All rights reserved.

      Try the new cross-platform PowerShell https://aka.ms/pscore6.
      ```

1.  Enter the following to post the credentials to the Citrix Cloud OAuth 2.0 token endpoint:

      ```powershell
     $tokenUrl = 'https://api-us.cloud.com/cctrustoauth2/root/tokens/clients'

      $response = Invoke-WebRequest $tokenUrl -Method POST -Body @{
      grant_type = "client_credentials"
      client_id = $env:CLIENT_ID
      client_secret = $env:CLIENT_SECRET
      }
      ```

    >**Note:**
    >
    >Use one of the following endpoints based on the geographical region that you selected while creating the Citrix Cloud account:
     >
      >-  api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region.
      >-  api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region.
      >-  api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
      >-  api.citrixcloud.jp - If your Citrix Cloud account is set to the Japan region.
    >
    > If you get an error when using " $env:CLIENT_ID" and "$env:CLIENT_SECRET", replace these fields with the client ID and secret that you received in [Step 2: Create an API client in Citrix Cloud](#step-2-create-an-api-client-in-citrix-cloud).

1.  Enter the following to get the response to verify that the request was successful:

      ```powershell
      $response
      ```

1.  Get the bearer token from the response content received.

    **Expected output:**

      ```txt
      StatusCode        : 200
      StatusDescription : OK
      Content           : 
                                                  {
                                                      "token_type": "bearer",
                                                      "access_token": "<LONG_STRING_OF_ALPHANUMERICS>
      RawContent        : HTTP/1.1 200 OK
                          Cache-Control: no-store
                          Pragma: no-cache
                          X-Cws-TransactionId: 77f8e145-96d6-42d1-ae93-c467d78ef6e8
                          Access-Control-Expose-Headers: X-Cws-TransactionId
                          X-CC-LocalGeo: US
                          X-Content-Type-O…
      Headers           : {[Cache-Control, System.String[]], [Pragma, System.String[]], [X-Cws-TransactionId, System.String[]], [Access-Control-Expose-Headers, System.String[]]…}
      Images            : {}
      InputFields       : {}
      Links             : {}
      RawContentLength  : 1501
      RelationLink      : {}
      ```

    The response content is in JSON format, containing a long string of random alphanumerics, among other data.

    > **Note:**
    >
    > Use PowerShell's `Invoke-WebRequest` cmdlet, rather than `Invoke-RestMethod`, since the former gives the HTTP status code and the content of the response.

1.  Customize the response content.

    You can see the content more clearly if you use `ConvertFrom-Json` to parse the JSON, and examine the resulting object with `Format-List`. To do this procedure, enter the following:

      ```powershell
      $token = $response.Content | ConvertFrom-Json
      $token | Format-List
      ```

    The response content appears more clearly.

    **Expected Output:**

      ```txt
      token_type   : bearer
      access_token : <LONG_STRING_OF_ALPHANUMERICS>
      expires_in   : 3600
      ````

##### Python

1.  Open a command prompt or terminal, depending on your operating system:

    -  Windows: From the Start menu, click Start, type cmd, and then click Command Prompt.
    -  Mac: Press Command+Space to open Spotlight Search, type terminal.app, and hit Return.

1.  Set environment variables with the API client and customer credentials:

    If you are using Windows operating system, at the command line enter the following:

      ```
      set CLIENT_ID=<YOUR_CLIENT_ID>
      set CLIENT_SECRET=<YOUR_CLIENT_SECRET>
      set CUSTOMER_ID=<YOUR_CUSTOMER_ID>
      ```

    If you are using macOS or Linux operating system, at the command line enter the following:

      ```
      export CLIENT_ID="<YOUR_CLIENT_ID>"
      export CLIENT_SECRET="<YOUR_CLIENT_SECRET>"
      export CUSTOMER_ID="<YOUR_CUSTOMER_ID>"
      ```

1.  Open the Python. The Python version and prompt appears:

      ```
      Python 3.10.0 (tags/v3.10.0:b494f59, Oct  4 2021, 19:00:18) [MSC v.1929 64 bit (AMD64)] on win32
      Type "help", "copyright", "credits" or "license" for more information.
      ```

    >**Note:**
    >
    >Ensure that the Python version is 3 or later.

1.  Import the following Python modules that you might use:

    -  `requests` module to send HTTP requests
    -  `os` module to access environment variables
    -  `pprint` ('pretty print') function to show data more clearly

      ```python
      import requests
      import os
      from pprint import pprint
      ```

1.  Enter the following to POST the credentials to the Citrix Cloud OAuth 2.0 token endpoint:

      ```python

      TOKEN_URL = 'https://api-us.cloud.com/cctrustoauth2/root/tokens/clients'

      response = requests.post(TOKEN_URL, data={
          'grant_type': 'client_credentials',
          'client_id': os.environ['CLIENT_ID'],
          'client_secret': os.environ['CLIENT_SECRET']
      })
      ```

    **Note:**

    Use one of the following endpoints based on the geographical region that you selected while creating the Citrix Cloud account:

    -  api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region.
    -  api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region.
    -  api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
    -  api.citrixcloud.jp - If your Citrix Cloud account is set to the Japan region.

1.  Enter the following to get the response code to verify that the request was successful:

      ```python
      response.status_code
      ```

    **Expected Output:**

      ```txt
      200
      ```

1.  Enter the following to get the bearer token from the response content received.

      ```python
      response.text
      ```

    **Expected output:**

      ```txt
      '\n                        {\n                            "token_type": "bearer",\n                            "access_token": "<LONG_STRING_OF_ALPHANUMERICS>",\n                            "expires_in": "3600"\n                        }\n                        '
      ```

    The response content is in JSON format, containing a long string of random alphanumerics, among other data.

1.  Customize the response content.

    You can see the content more clearly if you have `requests` parse the JSON, and examine the resulting Python dictionary. To do this procedure, enter the following:

      ```python
      token = response.json()
      pprint(token)
      {'access_token': '<LONG_STRING_OF_ALPHANUMERICS>',
      'expires_in': '3600',
      'token_type': 'bearer'}
      ```

    The response content appears more clearly.

##### cURL

1.  Open a command prompt or terminal, depending on your operating system:

    -  Windows: From the Start menu, click Start, type cmd, and then click Command Prompt.
    -  Mac: Press Command+Space to open Spotlight Search, type terminal.app, and hit Return.

1.  Set environment variables with the API client and customer credentials:

    If you are using Windows operating system, at the command line enter the following:

     ```
      set CLIENT_ID=<YOUR_CLIENT_ID>
      set CLIENT_SECRET=<YOUR_CLIENT_SECRET>
      set CUSTOMER_ID=<YOUR_CUSTOMER_ID>
      ```

    If you are using macOS or Linux operating system, at the command line enter the following:

      ```
      export CLIENT_ID="<YOUR_CLIENT_ID>"
      export CLIENT_SECRET="<YOUR_CLIENT_SECRET>"
      export CUSTOMER_ID="<YOUR_CUSTOMER_ID>"
      ```

1.  Enter the following to POST the credentials to the Citrix Cloud OAuth 2.0 token endpoint:

      ```bash
      token_url="https://api-us.cloud.com/cctrustoauth2/root/tokens/clients"

      curl ${token_url} -d "grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}"
      ```

    **Note:**

    Use one of the following endpoints based on the geographical region that you selected while creating the Citrix Cloud account:

    -  api-ap-s.cloud.com – If your Citrix Cloud account is set to the Asia Pacific South region.
    -  api-eu.cloud.com – If your Citrix Cloud account is set to the European Union region.
    -  api-us.cloud.com – If your Citrix Cloud account is set to the United States region.
    -  api.citrixcloud.jp - If your Citrix Cloud account is set to the Japan region.

1.  Get the bearer token from the response content received.

    **Expected output:**

      ```json
      {
          "token_type": "bearer",
          "access_token": "<LONG_STRING_OF_ALPHANUMERICS>",
          "expires_in": "3600"
      }
      ```

1.  Enter the following to combine the `curl` command with the `jq` command-line tool to capture `access_token` into another environment variable to use later. Note how `jq` uses the `-r` option to output the 'raw' token, rather than a quoted string.

      ```bash
      access_token=$(curl -s ${token_url} -d "grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}" | jq -r .access_token)
      echo ${access_token}
      ```

  Expected Output:

      ```txt
      <LONG_STRING_OF_ALPHANUMERICS>
      ```

##### {}

> **Note**:
>
>-  A bearer token is valid for an hour, after which it expires. You can find it from the `expires_in`  field in the Response. If your bearer token is expired, follow the same steps to generate a new token.
>-  As you explore the APIs interactively, you will likely experience the token expiring and API calls start to fail with a `401` status code. You must repeat the authentication step, and recreate any data that contains the expired token - for example, the PowerShell `$headers` object, the Python `session` object, and the `AUTHORIZATION` environment variable used with `curl`. If any of the API calls return an error, check the status code and response text and refer to the [troubleshooting](/citrix-cloud/citrix-cloud-api/docs/troubleshooting) section.

### Generate a bearer token using Trust Service flow - deprecated method

>**Warning:**
>
>While there is no planned End Of Life, the legacy Trust Service API is deprecated  and must not be used for new applications. Instead of this method, use the OAuth 2.0 Flow to generate the bearer token.

To generate a bearer token using Trust Service flow:

1.  Open a tool that helps you to make API request. For more information on selecting a tool,  see [Step 3](/citrix-cloud/citrix-cloud-api/docs/getting-started#step-3-select-a-tool-to-make-your-citrix-cloud-services-api-request).
1.  Make the following POST call to the trust service's authentication API.

**POST** `https://trust.citrixworkspacesapi.net/{customerid}/tokens/clients`

| Parameter | Parameter Type | Value |
| --------- | :-------------| :------|
| customerid | path | Use the special value `root`, if feasible |
| Accept | header | application/json |
| Content-Type | header | application/json |

Request sample:

```HTTP
POST https://trust.citrixworkspacesapi.net/{customerid}/tokens/clients HTTP/1.1
Accept: application/json
Content-Type: application/json


{"ClientId":"<your_client_ID>", "ClientSecret": "<your_client_secret>" }
```

Response sample:

```HTTP
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
...


{
  "principal": "john.down@citrix.com",
  "subject": "16..",
  "token": "ey1..",
  "openIdToken": "ey1..",
  "expiresIn": 3600
}
```

The required token is the value of the parameter token in the response. The bearer token can now be used to authenticate calls to any Citrix Cloud API. Prefix this value with `CwsAuth Bearer=`.

For example, `Authorization: CwsAuth Bearer=ey1..`.

> **Note:**
>
> A bearer token is valid for an hour, after which it expires. You can find it from the `expires_in`  field in the Response.  If your bearer token is expired, follow the same steps to generate a new token.

## Next steps

[Browse the portal](/) to learn about all available Services and their APIs.

You can get access to additional Citrix Cloud Services using either:

-  [Trials](https://docs.citrix.com/en-us/citrix-cloud/overview/citrix-cloud-service-trials.html)
-  [Purchases](https://www.citrix.com/products/citrix-cloud/)
-  [API reference](/citrix-cloud/citrix-cloud-api/docs/api-overview) section.
-  [Troubleshooting](/citrix-cloud/citrix-cloud-api/docs/troubleshooting)
-  [Error code](/citrix-cloud/citrix-cloud-api/docs/common-citrix-cloud-api-error-codes)
-  [Glosaary](/citrix-cloud/citrix-cloud-api/docs/glossary)
