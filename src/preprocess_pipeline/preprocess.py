
class Pipeline():
    def __init__(self):
        self._steps = []
        self._data = None
        self._fit = False

    def add_step(self, step):
        self._steps.append(step)

    def fit(self, data):
        self._data = data
        for step in self._steps:
            self._data = step.fit(self._data)
        self._fit = True
        return self._data



