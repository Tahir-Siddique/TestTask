# Test Task
This task is given by Ropstam Solutions for Interview. It contains simple jwt authentication and validations for XSS.

1. Create and Activate Virtual environment

```bash
virtualenv env
source env/bin/activate
```
2. Install Dependencies

'''bash
pip install -r requirements.txt
'''

3. Start backend
To start backend you need to make and apply migrations by these commands
'''bash
python manange.py makemigrations
python manange.py migrate
'''
Then run the server by running this command

'''bash
python manange.py runserver
'''

4. Create Super User
To create super user, You may need to run this command. That will prompt you some details to create supeeruser
'''bash
python manange.py createsuperuser
'''
You can visit Django Admin by typing url in browser like
`127.0.0.1:8000/admin`
Although it's in debugging mode so you can check paths create by visiting
`127.0.0.1:8000/api`

[-] Open frontend directory to see the details

## Thanks. 