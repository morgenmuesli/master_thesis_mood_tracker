import dataclasses
from typing import Callable, Dict, Any


class PreprocessStep:
    def __init__(self, name: str, call: Callable, kwargs: Dict[str, Any]):
        self.name = name
        self.call = call
        self.kwargs = kwargs

    def __call__(self, x):
        print(f"Running {self.name}")
        if self.kwargs is not None:
            return self.call(x, **self.kwargs)
        else:
            return self.call(x)


class Pipeline:
    def __init__(self, steps=[]):
        self._steps = steps
        self._data = None
        self._fit = False

    def add_step(self, name: str, function: Callable, args=None):
        self._steps.append(
            PreprocessStep(name, function, args)
        )

    def __call__(self, text):
        tokens = text
        for step in self._steps:
            tokens = step(tokens)
        return tokens
