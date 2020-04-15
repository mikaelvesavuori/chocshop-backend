/**
 * This demo shows how a simple backend could look, using Cloudflare Workers, to get product status.
 * If you're really lazy you could just export the "productStatus" array and use that locally.
 */

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond to product stock status requests
 * @param {Request} request
 */
async function handleRequest(request) {
  const HEADERS = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  // Allow only GET requests
  if (request.method !== 'GET')
    return new Response(
      JSON.stringify(`You can only use the GET method to access this endpoint!`),
      {
        status: 400,
        ...HEADERS
      }
    );

  // Check for "item" query string in the URL; if provided then send back only the requested item
  const ITEM_REQ = request.url ? request.url.split(`?item=`)[1] : null;

  // Send back all product stock statuses if not item ID provided
  if (!ITEM_REQ) return new Response(JSON.stringify(productStatus), { status: 200, ...HEADERS });

  // Check if we have that item
  const ITEM = productStatus.filter((item) => item.id === ITEM_REQ);

  // Bail out if no match is found
  if (ITEM.length === 0)
    return new Response(JSON.stringify(`Could not find that item...`), { status: 404, ...HEADERS });

  // Stock status clean-up
  const IN_STOCK = ITEM[0].inStock;

  // Send back stock status for item
  const RESPONSE = JSON.stringify(IN_STOCK);
  return new Response(RESPONSE, { status: 200, ...HEADERS });
}

// Minimal example of an inventory with stock status
const productStatus = [
  {
    id: 'bar',
    inStock: true,
    price: 7.99
  },
  {
    id: 'cake',
    inStock: true,
    price: 15.99
  },
  {
    id: 'brownie',
    inStock: false,
    price: 4.99
  },
  {
    id: 'box',
    inStock: true,
    price: 37.99
  },
  {
    id: 'icecream',
    inStock: false,
    price: 3.59
  },
  {
    id: 'pralines',
    inStock: true,
    price: 34.99
  }
];
