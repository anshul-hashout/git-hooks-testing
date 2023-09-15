# How to get details about the resource locations

Use APIs to get details about the resource locations that a customer has created.

Applications and scripts that interface with Citrix Cloud often need to know the resource locations that a customer has created. Also, the ID of the target resource location must be passed on the command-line of the installer to install Citrix Cloud Connectors when you have more than one resource location. Although this ID is available in the Citrix Cloud user interface, it is sometimes desirable to get this information programmatically.

## Prerequisites

Read the [prerequisites](/citrix-cloud/citrix-cloud-api/docs/getting-started#prerequisites-to-use-citrix-cloud-services-apis) and ensure that you have the `customerId` and the `bearer token`.

## Get resource location details using API call

Use the following example to get details about the resource location of a customer using an API call:

### Request

```HTTP
GET https://registry.citrixworkspacesapi.net/acme/resourcelocations HTTP/1.1
Accept: application/json
Authorization: CwsAuth Bearer=<token-from-call-to-trust>
```

>**Note:** Replace `acme` in the preceding GET method, with the ID of the customer you want to query.

### Response

```HTTP
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Length: 316
Content-Type: application/json; charset=utf-8
Date: Fri, 23 Dec 2016 22:24:00 GMT
X-Cws-TransactionId: bfc9b56c-bcd0-4cf1-9ea1-3da4d48a81c0

{
  "items": [
    {
      "id": "03...",
      "name": "AWS - USA - West"
    },
    {
      "id": "23...",
      "name": "Azure  - Europe  - North"
    },
    ...
  ]
}
```

## Get resource location details using C\# code

Use the following example to count the resource locations of a customer using C# code:

``` csharp
public static async Task<ItemCollection<ResourceLocationResponse>> GetResourceLocations(string bearerToken, string customer)
{
    var client = new HttpClient();
    client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
    client.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("CwsAuth", "Bearer=" + bearerToken);

    var response = await client.GetAsync(
        "https://registry.citrixworkspacesapi.net/" + customer + "/resourcelocations"
    );

    response.EnsureSuccessStatusCode();

    var content = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<ItemCollection<ResourceLocationResponse>>(content);
}

public class ItemCollection<T>
{
    public IList<T> Items { get; set; }
}

public class ResourceLocationResponse
{
    public string Id { get; set; }
    public string Name { get; set; }
}
```

## API reference

Get details about the resource locations created within a customer environment using [API reference](/citrix-cloud/citrix-cloud-api/docs/api-overview) section.