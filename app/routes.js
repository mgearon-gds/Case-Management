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

router.get('/case-manager', (req, res) => {
  const itemsPerPage = 10;
  const currentPage = parseInt(req.query.page) || 1;
  const searchTerm = req.query.search || '';
  const cases = req.session.cases || [];

  // Filter cases based on the search term
  const filteredCases = cases.filter((caseItem) =>
    caseItem.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredCases.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push({
      number: i,
      href: `/case-manager?page=${i}&search=${searchTerm}`,
    });
  }

  const previousUrl = currentPage > 1 ? `/case-manager?page=${currentPage - 1}&search=${searchTerm}` : null;
  const nextUrl = currentPage < totalPages ? `/case-manager?page=${currentPage + 1}&search=${searchTerm}` : null;

  const paginatedCases = filteredCases.slice(startIdx - 1, endIdx);

  res.render('case-manager', {
    cases: paginatedCases,
    previousUrl,
    nextUrl,
    paginationItems,
    searchTerm,
    startIdx,
    endIdx,
    totalItems,
  });
});