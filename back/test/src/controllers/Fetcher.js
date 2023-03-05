const FetcherGet = async (url, method, callback) => {
  fetch(url, {
      method: method,
    }
  )
  .then((res) =>  res.json())
  .then((res) => {
    console.log(res)
    callback(res);
  }).catch((err) => {
    console.log(err)
    callback(err);
  });
};

const FetcherPost = async (url, method, headers, body, callback) => {
  console.log(url, method, headers, body)
  const a = fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
  })
  .then((res) =>  res.json())
  .then((res) => {
    console.log(res)
    callback(res);
  }).catch((err) => {
    console.log(err)
    callback(err);
  });

  console.log(a)
};

module.exports = {
  FetcherGet,
  FetcherPost
};