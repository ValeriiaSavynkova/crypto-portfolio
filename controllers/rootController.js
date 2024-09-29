const path = require('path');

const getRootHandler = (req, res) => {
    try {
        res.render('pages/root', {
          pageTitle: 'Running Successfull'
          
        });
      } catch (error) {
        console.error('Error rendering root page:', error);
        res.status(500).send('Internal Server Error');
      }

};

module.exports = { getRootHandler };