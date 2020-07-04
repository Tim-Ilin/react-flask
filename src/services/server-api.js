async function getUrl(file) {
  const backendUrl = '/api/'
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(backendUrl, {method: "POST", body: formData})
  return await response.json()
}

export default getUrl