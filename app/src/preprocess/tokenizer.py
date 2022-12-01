import re


def simple_word_tokenizer(text):
    """
    This function takes in a string and returns a list of tokens.
    Tokens are defined as words separated by whitespace.
    :param text:
    :return:
    """
    return re.findall(r"[\w+]*\p{L}[\w+]*", text)


class Tokenizer:
    def __init__(self, tokenizer: str):
        match tokenizer:
            case 'regex_tokenizer':
                self.tokenizer = simple_word_tokenizer
            case "spacy_tokenizer":
                from spacy.lang.en import English
                nlp = English()
                self.tokenizer = nlp.tokenizer

            case _:
                raise ValueError(f"Tokenizer {tokenizer} not supported")

    def __call__(self, text):
        return self.tokenizer(text)
