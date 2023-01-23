from typing import Dict

import pandas as pd
from sqlalchemy import create_engine


class DatabaseConnector:
    def __init__(self, config: Dict):
        db_engine = config.get('db_engine')
        address = config['db_host']
        port = config['port']
        username = config['username']
        password = config['password']
        database = config['db_name']
        self.engine = create_engine(f'{db_engine}://{username}:{password}@{address}:{port}/{database}')

    def select(self, table_name, columns, condition=True):
        query = f'SELECT {columns} FROM {table_name} WHERE {condition}'
        return pd.read_sql(query, self.engine)

    def insert(self, table_name, data, replace=False):
        if replace:
            return data.to_sql(table_name, self.engine, if_exists='replace', index=False)
        else:
            return data.to_sql(table_name, self.engine, if_exists='append', index=False)

