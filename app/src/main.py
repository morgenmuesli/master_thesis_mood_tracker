import argparse
import json
from connector import DatabaseConnector
import re
import os

def setup_os():
    print(os.getcwd())


RE_SUSPICIOUS = re.compile(r"[&#<>\[\]{}\\]")

def config_parser(args):
    config = args.config
    f = open(config, 'r')
    config = json.load(f)
    return config


def get_database(config):
    try:
        connector = DatabaseConnector(config)
        return connector.select('appreviewssmall', '*')
    except Exception as e:
        exit(f"Config file not found: {e}")



if __name__ == '__main__':
    setup_os()
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', help='Path to config file', default='config.json')
    args = parser.parse_args()
    config = config_parser(args)
    database = get_database(config)
    print(database)






