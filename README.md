# ansible
Django mock application for Ansible CD exercise

Run backend Django app (todobackend)
`python manage.py runserver`

Run database MySQL server 
`mysql.server start`

Run integration test Django Nose
`python manage.py test --settings=todobackend.settings.test`

Run acceptance test Mocha script (todotest)
`npm test`

Run client Express app (todobackend-client)
`node app.js`
