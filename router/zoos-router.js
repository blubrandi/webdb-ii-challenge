const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  db('zoos').where({ id: req.params.id });
  then(zoo => {
    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: 'No zoo found' });
    }
  }).catch(err => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // insert into roles () values (req.body)
  db('zoos')
    .insert(req.body, 'id')
    .then(zoos => {
      res.stats(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // first filter the records then delete
  db('zoos')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? 'records' : 'record'} updated`
        });
      } else {
        res.status(404).json({ message: 'Zoo does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  db('zoos')
    .where({ id: req.params.id })
    .del(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? 'records' : 'record'} deleted`
        });
      } else {
        res.status(404).json({ message: 'Zoo does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
