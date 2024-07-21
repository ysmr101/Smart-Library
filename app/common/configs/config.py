import configparser

config = configparser.ConfigParser()

config.read('./config.ini')

DATABASE_NAME = config['Database']['db_name']
DATABASE_PASSWORD = config['Database']['db_password']
DATABASE_HOST = config['Database']['db_host']
DATABASE_PORT = config['Database']['db_port']
DATABASE_USERNAME= config['Database']['db_username']

