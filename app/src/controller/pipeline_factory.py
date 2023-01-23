from preprocess import Tokenizer
from controller.pipeline import Pipeline



def create_simple():
    # Create the pipeline
    pipeline = Pipeline()
    # Add the steps
    pipeline.add_step("Create Token from regex", Tokenizer("regex_tokenizer"))
    pipeline.add_step("Create n_grams", Tokenizer("regex_tokenizer"))
    # Return the pipeline
    return pipeline