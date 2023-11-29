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

//Case manager page


router.get('/case-manager', function (req, res) {
  // Example pagination logic
  const itemsPerPage = 20;
  const currentPage = req.query.page || 1; // Get the page from the query parameters
  const cases = req.session.cases || [];

  const totalItems = cases.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push({
      number: i,
      href: `/case-manager?page=${i}`, // Include page number in the URL
    });
  }

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedCases = cases.slice(startIdx, endIdx);

  const previousUrl = currentPage > 1 ? `/case-manager?page=${currentPage - 1}` : null;
  const nextUrl = currentPage < totalPages ? `/case-manager?page=${parseInt(currentPage) + 1}` : null;

  res.render('case-manager', {
    cases: paginatedCases,
    info: "test",
    previousUrl,
    nextUrl,
    paginationItems,
  });
});