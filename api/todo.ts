import axios from 'axios'

const headers = {
  'content-type': 'application/json',
  apikey: process.env.APIKEY,
  username: process.env.usernmae
}

export default async function (req, res) {
  const { method = 'GET', body, endpoint = '' } = req.body
  const { data } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${endpoint}`,
    method,
    headers,
    data: body
  })
  res.status(200).json(data)
}
