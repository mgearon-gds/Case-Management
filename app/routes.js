//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.get('/', function (req, res) {
    var fakeCases = require('./data/data.js')
    req.session.cases = fakeCases
    req.session.recents = []
    req.session.notifications = {}
    req.session.notifications.list = []

    res.render('index', {
        cases: req.session.cases
      })
  })
// On post
router.get('/case-manager', function (req, res) {
    res.render('case-manager', {
      cases: req.session.cases
    })
  })