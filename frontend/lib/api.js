export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

// Helper to make POST requests to Strapi
export async function postAPI(path, body) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function uploadPhoto(body) {
  // const value = new FormData(body);
  const requestUrl = getStrapiURL("/upload");
  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body,
  });
  const data = await response.json();
  return data;
}
