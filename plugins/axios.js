export default function ({ $axios, redirect }) {
  $axios.setToken('87154265fd54301fdf2c858b00e598e4306e6c2b', 'Token')
  // $axios.setToken('anonymous', 'Token')

  // $axios.onRequest(config => {
  //   console.log('Making request to ' + config.url)
  //   console.log(config)
  // })

  // $axios.onResponse(response => {
  //   console.log('Response')
  // })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log('API error ' + code)
    console.log(error)
    if (code === 400) {
      redirect('/400')
    }
  })
}
