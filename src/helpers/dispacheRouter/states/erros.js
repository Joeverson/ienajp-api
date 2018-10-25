/**
 * 
 * define the middle for request and your erros
 * its used in response on axios
 * 
 */

export default [{
    status: 401,
    description: 'not token',
    action: () => {
      window.location.href = '/login';
      delete localStorage.token;
    }
  },
  {
    status: 400,
    description: 'bad request',
    action: () => {}
  }
];
