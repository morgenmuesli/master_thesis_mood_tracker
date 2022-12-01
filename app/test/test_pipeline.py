from controller.pipeline import Pipeline

def test_pipeline():
    # Create the pipeline
    pipeline = Pipeline()
    # Add the steps
    pipeline.add_step(name="identity", function=lambda x: x)
    pipeline.add_step(name="lower", function=str.lower)
    pipeline.add_step("split", str.split, {"sep": " "})
    # Run the pipeline
    result = pipeline("Hello World")
    # Check the result
    assert result == ["hello", "world"]

