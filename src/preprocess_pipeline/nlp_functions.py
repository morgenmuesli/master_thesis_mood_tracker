import re
from collections import Counter

import pandas as pd


def impurity(text, suspicios_regex, min_length=10):
    """
    This function takes in a dataframe and returns a dataframe with the impurity
    of each row.
    It is based from the book
    @inbook{albrecht_ramachandran_winkler_2021, place={Sebastopol, , CA}, title={Cleaning Text Data}, booktitle={Blueprints for text analysis using Python: Machine Learning-based solutions for common real world (NLP) applications}, publisher={O'Reilly}, author={Albrecht, Jens and Ramachandran, Sidharth and Winkler, Christian}, year={2021}, pages={95–95}}

    """
    if text == None or len(text) < min_length:
        return 0
    else:
        return len(suspicios_regex.findall(text)) / len(text)


def count_tokens(data: pd.DataFrame, column: str, preprocess=None, min_freq=2):
    """
    This function takes in a dataframe and returns a dataframe with the word count
    of each token.
    """
    def update(doc):
        tokens = doc if preprocess is None else preprocess(doc)
        counter.update(tokens)

    counter = Counter()
    data[column].map(update)

    freq = pd.DataFrame.from_dict(counter, orient='index', columns=['freq'])
    freq = freq[freq['freq'] >= min_freq]
    freq.index.name = 'token'

    return freq.sort_values('freq', ascending=False)


def count_words(data: pd.DataFrame, column: str, preprocess=None, inplace=False):
    """
    This function takes in a dataframe and returns a dataframe with the word count
    of each row.
    """
    def count(row):
        tokens = row[column] if preprocess is None else preprocess(row[column])
        return len(tokens)
    if inplace:
        data['word_count'] = data.apply(count, axis=1)
        return data
    else:
        df = data[['id']].copy()
        df['word_count'] = data.apply(count, axis=1)

