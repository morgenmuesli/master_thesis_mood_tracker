import dataclasses
from typing import Callable, Dict, Any


@dataclasses
class PreprocessStep:
    name: str
    call: Callable
    kwargs: Dict[str, Any]

    def __call__(self, x):
        print(f"Running {self.name}")
        if self.args is not None:
            self.call(x, **self.kwargs)
        else:
            self.call(x)



class Pipeline():
    def __init__(self, steps=[]):
        self._steps = steps
        self._data = None
        self._fit = False

    def add_step(self,name: str, function: Callable, args = None):
        self._steps.append(
            PreprocessStep(name, function, args)
        )

    def __call__(self, text):
        tokens = text
        for step in self._steps:
            tokens = step(tokens, **step)




