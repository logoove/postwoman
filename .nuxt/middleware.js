const middleware = {}

middleware['parsedefaulturl'] = require('..\\middleware\\parsedefaulturl.js')
middleware['parsedefaulturl'] = middleware['parsedefaulturl'].default || middleware['parsedefaulturl']

export default middleware
